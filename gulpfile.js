const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

gulp.task('sass', () => gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/styles')));

gulp.task('html', () => gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build')));

gulp.task('sass:watch', function () {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('html:watch', function () {
    gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('webserver', function () {
    gulp.src('./build')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('build', ['html', 'sass']);

gulp.task('default', gulp.series('build', 'webserver', 'sass:watch', 'html:watch'));