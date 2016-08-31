/**
 * Created by shopex on 16/4/28.
 */
var gulp = require('gulp')
var uglify = require("gulp-uglify");//压缩js
var rename = require("gulp-rename");//改名
var cssmin = require("gulp-clean-css");//压缩css
var concat = require("gulp-concat");//合并文件*/
var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache')

const paths = {
    js: './pubilc/js/',
    dest: './public/build/',
    css:'./public/css/',
    lib:'./public/lib/',
    img:'./public/images/'

};

gulp.task('medical_css',function (){

    return gulp.src([
        paths.lib+'*.css',
        paths.css+'*.css',

    ])
        .pipe(cssmin())
        .pipe(concat('medical.min.css'))
        .pipe(gulp.dest(paths.dest));

})

gulp.task('medical_js',function (){

    return gulp.src([
        paths.lib+'js/*.css',
        paths.js+'*.css',

    ])
        .pipe(cssmin())
        .pipe(concat('medical.min.js'))
        .pipe(gulp.dest(paths.dest));

})


gulp.task('testImagemin', function () {
    gulp.src(paths.img+'*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(paths.dest+'images/'));
});




gulp.task("charging",['medical_css','medical_js','testImagemin']);

