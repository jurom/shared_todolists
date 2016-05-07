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
import {transactorOps} from './src/client/helpers/transactor_useful'
import {fromJS} from 'immutable'
import {generateMasterToken} from './src/server/generate_token'

/*eslint-disable no-console */

gulp.task('default', ['hot'])

gulp.task('hot', ['disable-babel-cache'], (done) =>
  runSequence(['server-hot', 'dev-nodemon'], done)
)

gulp.task('eslint', () => {
  return gulp.src([
    'gulpfile_babel.js',
    'src/**/*.js',
    '!src/firebase-transactions/**',
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

let firebaseSingleton = null

function getFirebase() {
  if (firebaseSingleton != null) return Promise.resolve(firebaseSingleton)
  const ref = new Firebase(config.firebase.url)
  return new Promise((resolve, reject) => ref.authWithCustomToken(generateMasterToken(config.firebase.secret),
    (error, authData) => {
      if (error) {
        console.log('Error authenticating with custom token')
      } else {
        firebaseSingleton = ref
        resolve(ref)
      }
    }))
}

const firstNames = ['Alan', 'Bob', 'Bart', 'Martin', 'Sid', 'Harry', 'Herbert', 'Kurt', 'Jason',
  'Stuart', 'Jack', 'James', 'Rick', 'Tom', 'Matthew', 'Arya', 'Sansa', 'Ned', 'Marc']
const lastNames = ['Marley', 'Delon', 'Simpson', 'Newsborne', 'Hedgehog', 'Neverliving',
  'Newhouse', 'Oldarry', 'Cobain', 'Russel', 'Pitt', 'Jolie', 'Bourne', 'Carter', 'McDonald',
  'Hayek', 'Deschanel', 'Moore', 'Astley', 'Stark', 'Stirling']

function getRandomProfile(id = '') {
  const firstName = firstNames[rand(firstNames.length)]
  const lastName = lastNames[rand(lastNames.length)]
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@todoshare.com`
  return {firstName, lastName, email}
}

gulp.task('init-users', () => {
  return getFirebase()
    .then((firebase) => repeatAsync(yargs.argv.n || 10, (i) => {
      const profile = getRandomProfile(i)
      const {email} = profile
      return createUser(firebase, {email, password: 'password'})
        .then(({uid}) => storeUser(transactorOps(firebase), {uid, email, profile}))
        .catch((e) => console.log('Error, skipping: ', email, 'error: ', e))
    })
  )
})

gulp.task('delete-users', () => {
  return getFirebase()
    .then((firebase) =>
      read(firebase.child(`user/profile`))
        .then((profiles) => profiles && fromJS(profiles)
          .valueSeq()
          .map(({email}) => email)
          .filter((email) => email.endsWith('@todoshare.com'))
          .toJS()
        )
        .then((emails) => emails && repeatAsync(emails.length, (i) =>
          removeUser(firebase, {email: emails[i], password: 'password'})))
    )
})

gulp.task('delete-db', () => {
  return getFirebase().then((firebase) => set(firebase, null))
})

gulp.task('reset-db', (done) => {
  runSequence('delete-users', 'delete-db', 'init-users', done)
})
