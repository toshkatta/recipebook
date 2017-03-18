let pug = require('gulp-pug');
let gulp = require('gulp');

gulp.task('build', function(done){
    return gulp.src('./views/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./client/views'));

});

gulp.task('watch', function () {
    gulp.watch('./views/**/*.pug', ['build']);
})