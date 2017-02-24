// gulpfile.js
var gulp = require("gulp")
var clean = require("gulp-clean");
var prefixer = require("gulp-autoprefixer");
var concatenate = require("gulp-concat");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
const imagemin = require('gulp-imagemin');

//compile sass
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


// optimize images
 
gulp.task('opti', () =>
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('opti'))
);