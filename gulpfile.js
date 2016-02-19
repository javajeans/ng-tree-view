var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var plugins = require('gulp-load-plugins')();

gulp.task('jshint', function() {
  return gulp.src('src/**/*.js')
    .pipe(plugins.jshint({
      esnext: true
    }))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['jshint'], function() {
  var sources = browserify({
    entries: 'src/index.js',
    debug: true
  })
  .transform(babelify.configure({
    presets: ["es2015"]
  }));

  return sources.bundle()
    .pipe(vinylSourceStream('ng-tree.js'))
    .pipe(vinylBuffer())
    .pipe(plugins.sourcemaps.init({
      loadMaps: true
    }))
    .pipe(plugins.ngAnnotate())
    .pipe(gulp.dest('dist'))
    .pipe(plugins.connect.reload());
});

gulp.task('min', function() {
  var sources = browserify({
    entries: 'src/index.js',
    debug: true
  })
  .transform(babelify.configure({
    presets: ["es2015"]
  }));

  return sources.bundle()
    .pipe(vinylSourceStream('ng-tree.min.js'))
    .pipe(vinylBuffer())
    .pipe(plugins.sourcemaps.init({
      loadMaps: true
    }))
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./', {
      includeContent: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['scripts']);
})

gulp.task('build', ['scripts', 'min']);
gulp.task('dev', ['scripts', 'watch']);
gulp.task('default', ['scripts']);
