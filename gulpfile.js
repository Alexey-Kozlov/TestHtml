var gulp = require('gulp');
var csso = require('gulp-csso');
var server = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');

gulp.task('style',function(){
	gulp.src('./less/style.less')
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		autoprefixer()
	]))
	.pipe(gulp.dest('./css/'))
	.pipe(csso())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('./css/'))
	.pipe(server.stream());

	gulp.src('./src/images/*.{png,jpg,jpeg,svg}')
	.pipe(imagemin([
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({optimizationlevel: 3}),
		imagemin.svgo()
	]))
	.pipe(gulp.dest('./images'))

	gulp.src('./src/*.html')
	.pipe(posthtml( [include({ encoding: 'utf8' })] ))
	.pipe(gulp.dest('.'))
});

gulp.task('compile_html',function(){	
	gulp.src('./src/*.html')
	.pipe(posthtml( [include({ encoding: 'utf8' })] ))
	.pipe(gulp.dest('.'));
	server.reload();
});

gulp.task('serve',['style'], function(){
	server.init({
		server:'.',
		browser: 'chrome'
	});
	gulp.watch('./**/*.less',['style']);
	gulp.watch('./src/*.html',['compile_html'] );

}); 
