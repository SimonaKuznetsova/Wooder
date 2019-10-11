var gulp = require("gulp");
//var less = require("gulp-less");
var sass = require('gulp-sass');
var browserSync = require("browser-sync").create();

const compileSass = () =>
  gulp
    //.src("app/less/main.less")
    .src('app/sass/main.scss')
    //.pipe(less())
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );

const watchHtml = () =>
  gulp.src("app/**/*.html").pipe(
    browserSync.reload({
      stream: true
    })
  );

const init = () => {
  // Server initialization
  browserSync.init({
    server: {
      baseDir: "./app"
    },
    notify: false
  });

  // Watches changes in HTML files and refreshes
  // them with BrowserSync if something was changed
  gulp.watch("app/**/*.html", watchHtml);

  // Watches Less => compiles Less to CSS => Refreshes changes in browser
  //gulp.watch("app/less/**/*.less", compileLess);

  gulp.watch("app/sass/**/*.scss", compileSass);
};

// Default(initital) task for Gulp
exports.default = gulp.series(compileSass, init);
