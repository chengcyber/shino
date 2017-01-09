var gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    // rename = require('gulp-rename'),
    // concat = require('gulp-concat'),
    // notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    // changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    ngAnnotate = require('gulp-ng-annotate'),
    stripDebug = require('gulp-strip-debug'),
    del = require('del');


// eslint
gulp.task('eslint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// clean: delete all previous generated files
gulp.task('clean', function () {
    return del(['dist']);
});

// default task: usemin, imagemin, copyfonts
gulp.task('default', ['clean'], function () {
    gulp.start('usemin',
        'imagemin',
        'copyfonts');
})

/* usemin: quick config for handling script files
 * build foo.rev.css foo.rev.js
 */
gulp.task('usemin', ['eslint'], function () {
    gulp.src('./app/views/*.html')
        .pipe(gulp.dest('dist/views'));

    /**
     * when set NODE_ENV = production
     * remove debugger & console
     * uglify js files
     */
    var useminJsArr = [];
    useminJsArr.push(ngAnnotate());
    if (process.env.NODE_ENV === 'production') {
        useminJsArr.push(stripDebug());
        useminJsArr.push(uglify());
    }
    useminJsArr.push(rev());

    return gulp.src('./app/*.html')
        .pipe(usemin({
            css: [cleanCss(), rev()],
            // js: [ngAnnotate(),
            //     // uglify(),
            //     rev()]
            js: useminJsArr
        }))
        .pipe(gulp.dest('dist/'));
});

// imagemin: optimizing image file size
gulp.task('imagemin', function () {
    return del(['dist/images']), gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
    // .pipe(notify({
    //     message: 'Images task complete'
    // }));
});

// copyfonts: copy fonts file to dist/
gulp.task('copyfonts', ['clean'], function () {
    gulp.src('app/bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src('app/bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
});

// watch: watch file changes
gulp.task('watch', ['browser-sync'], function () {
    // watch html/css/js files
    gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
    // watch image files
    gulp.watch('app/images/**/*', ['imagemin']);
});

gulp.task('browser-sync', ['default'], function () {
    var files = [
        'app/**/*.html',
        'app/styles/**/*.css',
        'app/images/**/*.png',
        'app/scripts/**/*.js',
        'dist/**/*'
    ];

    browserSync.init(files, {
        server: {
            baseDir: 'dist',
            index: 'index.html',
        },
        port: 80
    });

    gulp.watch(['dist/**']).on('change', browserSync.reload);
});