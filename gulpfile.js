var gulp = require('gulp');
var rename = require("gulp-rename");
var webpack = require('webpack-stream');
var replace = require('gulp-replace');

gulp.task('outputFile', function () {
    var stream = gulp.src('./src/app.js')
        .pipe(webpack(require('./webpack.build.js')))
        .pipe(gulp.dest('dist/'));
    return stream;
});

gulp.task('setCommonjs', ['outputFile'], function () {
    gulp.src('./dist/common.**.js')
        .pipe(rename("common.js"))
        .pipe(gulp.dest('dist/'));

    gulp.src('./dist/index.html')
        .pipe(replace(/common(\S*).js/, 'common.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['setCommonjs'], function () {

});
