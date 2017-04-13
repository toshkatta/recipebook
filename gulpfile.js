let pug = require('gulp-pug');
let sass = require('gulp-sass');
let gulp = require('gulp');

gulp.task('build-pug', function(done){
    return gulp.src('./views/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./client/views'));

});

gulp.task('build-sass', function() {
    return gulp.src('./styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/styles'));
});

gulp.task('watch', function () {
    gulp.watch('./views/**/*.pug', ['build-pug']);
    gulp.watch('./styles/**/*.scss', ['build-sass']);
});

gulp.task('default', ['build-sass', 'build-pug', 'watch']);