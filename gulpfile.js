var gulp = require('gulp');
var rename = require("gulp-rename");
var webpack = require('webpack-stream');
var replace = require('gulp-replace');
var del = require('del');

var cdn = 'http://cdn.example.com/';

gulp.task('clean:dist', function (cb) {
    return del([
        'dist/*'
    ], cb);
});

gulp.task('outputFile', ['clean:dist'], function () {
    return gulp.src('./src/app.js')
        .pipe(webpack(require('./webpack.build.js')(cdn)))
        .pipe(gulp.dest('dist/'));
});


gulp.task('adaptBuilding', ['outputFile'], function () {
  


    // gulp.src('./dist/common.**.js')
    //     .pipe(rename("common.js"))
    //     .pipe(gulp.dest('dist/'));

    gulp.src('./dist/index.html')
        .pipe(replace(cdn, ''))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['adaptBuilding'], function () {

});
