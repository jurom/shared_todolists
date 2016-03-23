import gulp from 'gulp'
import eslint from 'gulp-eslint'
import nodemon from 'gulp-nodemon'
import env from 'gulp-env'
import {webpackDevServer} from './webpack/server/main'
import makeWebpackConfig from './webpack/makeConfig'
import runSequence from 'run-sequence'
import clean from 'gulp-clean'
import webpackBuild from './webpack/build'
import yargs from 'yargs'
import config from './src/server/config'
import Firebase from 'firebase'
import {rand, repeatAsync} from './src/common/useful'
import {createUser, read, set, removeUser} from './src/common/firebase_actions'
import {storeUser} from './src/common/auth_actions'
import {fromJS} from 'immutable'

/*eslint-disable no-console */

gulp.task('default', ['hot'])

gulp.task('hot', ['disable-babel-cache'], (done) =>
  runSequence(['server-hot', 'dev-nodemon'], done)
)

gulp.task('eslint', () => {
  return gulp.src([
    'gulpfile_babel.js',
    'src/**/*.js',
    'webpack/**/*.js',
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

gulp.task('dev-nodemon', () => {
  return nodemon({
    script: 'src/server',
    ext: 'js',
    ignore: ['src/client'],
  }).on('restart', () => {
    console.log('Server restarted !')
  })
})

gulp.task('disable-babel-cache', () => {
  env({vars: {BABEL_DISABLE_CACHE: 1}})
})

gulp.task('server-hot', webpackDevServer(makeWebpackConfig(true)))

gulp.task('build', ['clean'], webpackBuild(makeWebpackConfig(false)))

gulp.task('clean', function() {
  return gulp.src('./build')
    .pipe(clean({force: true}))
})

function getFirebase() {
  return new Firebase(config.firebase.url)
}

const firstNames = ['Alan', 'Bob', 'Bart', 'Martin', 'Sid', 'Harry', 'Herbert', 'Kurt']
const lastNames = ['Marley', 'Delon', 'Simpson', 'Newsborne', 'Hedgehog', 'Neverliving', 'Newhouse', 'Oldarry']

function getRandomProfile(id = '') {
  const firstName = firstNames[rand(firstNames.length)]
  const lastName = lastNames[rand(lastNames.length)]
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@todoshare.com`
  return {firstName, lastName, email}
}

gulp.task('init-users', () => {
  const firebase = new Firebase(config.firebase.url)
  return repeatAsync(yargs.argv.n || 10, (i) => {
    const profile = getRandomProfile(i)
    const {email} = profile
    return createUser(firebase, {email, password: 'password'})
      .then(({uid}) => storeUser(firebase, {uid, email, profile}))
  })
})

gulp.task('delete-users', () => {
  const firebase = getFirebase()
  return read(firebase.child(`user/profile`))
    .then((profiles) => profiles && fromJS(profiles)
      .valueSeq()
      .map(({email}) => email)
      .filter((email) => email.endsWith('@todoshare.com'))
      .toJS()
    )
    .then((emails) => emails && repeatAsync(emails.length, (i) =>
      removeUser(firebase, {email: emails[i], password: 'password'})))
})

gulp.task('delete-db', () => {
  const firebase = getFirebase()
  return set(firebase, null)
})

gulp.task('reset-db', (done) => {
  runSequence('delete-users', 'delete-db', 'init-users', done)
})
