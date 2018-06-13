var gulp = require('gulp'),
connect = require('gulp-connect'),
sass = require('gulp-sass'),
htmlmin = require('gulp-htmlmin'),
rename = require('gulp-rename'),
concat = require('gulp-concat')
autoprefixer = require('gulp-autoprefixer'),
uglify = require('gulp-terser'),
pump = require('pump')

// Local server w/ LiveReload
gulp.task('connect', function() {
  connect.server({
    port: 8080,
    root: 'dist',
    livereload: true
  });
});

// *js files concat and minify
gulp.task('js', function () {

    gulp.src(['./src/js/*.js'])
      .pipe(concat('app.min.js'))
      .pipe(uglify()
        .on('error', function(uglify) {
          console.error(uglify.message)
          this.emit('end')
        }))
      .pipe(gulp.dest('./dist/js'))
      .pipe(connect.reload())

});

// *.html minify and live reload
gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

// *.sass|*.scss to *.css + autoprefixer + minify and live reload
gulp.task('css', function () {
  return gulp.src('./src/css/*.{sass,scss,css}')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concat('app.min.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

// Watchers for files
gulp.task('watch', function () {
  gulp.watch(['./src/**/*.html'], ['html']);
  gulp.watch(['./src/css/*.{sass,scss,css}'], ['css']);
  gulp.watch(['./src/js/*.js'], ['js'])
});

gulp.task('default', ['watch','connect']);
