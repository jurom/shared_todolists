import gulp from 'gulp'
import eslint from 'gulp-eslint'
import nodemon from 'gulp-nodemon'
import env from 'gulp-env'
import {webpackDevServer} from './webpack/server/main'
import makeWebpackConfig from './webpack/makeConfig'
import runSequence from 'run-sequence'


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
