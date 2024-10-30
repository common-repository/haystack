var gulp = require('gulp'),
    gutil = require('gulp-util'),
    autoprefixer = require('autoprefixer'),
    babel = require('gulp-babel'),
    bs = require('browser-sync').create(),
    cleancss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    // webpackConfig = require('./webpack.config.js'),
    postcss = require('gulp-postcss'),
    flexibility = require('postcss-flexibility'),
    sassGlob = require('gulp-sass-glob')
    // bourbon = require("bourbon").includePaths,
    // neat = require("bourbon-neat").includePaths,
    // normalize = require('node-normalize-scss').includePaths;
    ;



// Sass
// Compatibility with Bootstrap 3.3.7 Sass
gulp.task('sass:dev', function () {
    return gulp.src('./assets/src/scss/*.scss')
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10,
            includePaths: [
                'node_modules/breakpoint-sass/stylesheets/',
            ]
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ]
        })]))
        .pipe(cleancss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./assets/dist/css'))
        .pipe(bs.stream());
});

/**
 * JS files for development - Watch
 */
gulp.task('js:dev', function (callback) {
    gulp.src('./assets/src/js/**/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/dist/js'))
});

/*------------*/
/* Watch Task */
/*------------*/
gulp.task('watch', function () {
    gulp.watch('./assets/src/scss/**/*.scss', gulp.series('sass:dev'));
    gulp.watch('./assets/src/js/**/*.js', gulp.series('js:dev'));
});

/*------------*/
/* Build task */
/*------------*/
gulp.task('build', gulp.series('sass:dev', 'js:dev'));
gulp.task('default', gulp.series('watch'));