var gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    // changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    ngAnnotate = require('gulp-ng-annotate'),
    del = require('del');


// eslint
gulp.task('eslint', () => {
    return gulp.src('app/scripts/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// clean: delete all previous generated files
gulp.task('clean', () => {
    return del(['dist']);
});

// default task: usemin, imagemin, copyfonts
gulp.task('default', ['clean'], () => {
    gulp.start('usemin', 'imagemin', 'copyfonts');
});