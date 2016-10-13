var gulp = require('gulp');
var rename = require("gulp-rename");
var webpack = require('webpack-stream');
var replace = require('gulp-replace');
var del = require('del');
var inject = require('gulp-inject-string');


var cdn = '';


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
    var now = new Date;
    var version = now.getTime();
    //remove CDN and add version
    gulp.src('./dist/index.html')
        //.pipe(replace(cdn, ''))
        .pipe(inject.after('<head>', '\n<info '
            + 'version='+'"'+version+'"'+' '
            + 'updata="['+cdn+'app.js,'+cdn+'app.css]"'
            + ' />')
        )
        .pipe(gulp.dest('dist/'));


});

gulp.task('default', ['adaptBuilding'], function () {



});
