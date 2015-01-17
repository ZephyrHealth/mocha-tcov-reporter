gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'

gulp.task 'coffee', ->

  coffeeStream = coffee({ bare: true })
    .on('error', gutil.log)

  gulp.src('./lib/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffeeStream)
    .pipe(sourcemaps.write '.')
    .pipe(gulp.dest './lib/')
