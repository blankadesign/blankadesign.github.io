// gulpfile.js
var gulp = require("gulp")
var clean = require("gulp-clean");
var prefixer = require("gulp-autoprefixer");
var concatenate = require("gulp-concat");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
// optimizers
const imagemin = require('gulp-imagemin');
var minify = require('gulp-minifier');


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

////== optimizers== ////
// optimize images
 
gulp.task('opti', () =>
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('opti'))
);
// optimize files //
gulp.task('minify', function() {
  return gulp.src('css/style.css').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: false,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('./css'));
});













