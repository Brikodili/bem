const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

gulp.task('sass', () => gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/styles')));

gulp.task('html', () => gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build')));

gulp.task('images', () => gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./build/images')));

gulp.task('sass:watch', () => {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('html:watch', () => {
    gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('images:watch', () => {
    gulp.watch('./src/images/**/*', ['images']);
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

gulp.task('build', ['html', 'sass', 'images']);

gulp.task('watch', ['html:watch', 'sass:watch', 'images:watch']);

gulp.task('default', ['build', 'webserver', 'watch']);