//////////////////////////////////////////////////////////////
// plugins
//////////////////////////////////////////////////////////////
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    nunjucksRender = require('gulp-nunjucks-render');

//////////////////////////////////////////////////////////////
// sass
//////////////////////////////////////////////////////////////
gulp.task('sass', function() {
    return gulp
        .src('assets/index.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'))
});

//////////////////////////////////////////////////////////////
// minify css
//////////////////////////////////////////////////////////////
gulp.task('minify-css', function() {
    return gulp
        .src('assets/css/index.css')
        .pipe(minifyCSS({ keepBreaks: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css'))
});


//////////////////////////////////////////////////////////////
// compile html
//////////////////////////////////////////////////////////////
gulp.task('html', function() {
    return gulp
    .src('./views/*.html')
        .pipe(nunjucksRender({
            path: './views'
        }))
        .pipe(rename({ suffix: '.dist' }))
        .pipe(gulp.dest('./dist/'))
});

//////////////////////////////////////////////////////////////
// watcher
//////////////////////////////////////////////////////////////
gulp.task('watch', function() {
    //sass
    gulp.watch('assets/**/*.scss', gulp.series('sass'));
    gulp.watch('assets/css/index.css', gulp.series('minify-css'));
    gulp.watch('views/**/*.html', gulp.series('html'));
});