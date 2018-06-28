var gulp = require('gulp');
var csso = require('gulp-csso');
var server = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var imagemin = require('gulp-imagemin');

gulp.task('style',function(){
	gulp.src('./less/style.less')
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		autoprefixer()
	]))
	.pipe(csso())
	.pipe(gulp.dest('./css/'))
	.pipe(server.stream());

	gulp.src('./src/images/*.{png,jpg,jpeg,svg}')
	.pipe(imagemin([
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({optimizationlevel: 3}),
		imagemin.svgo()
	]))
	.pipe(gulp.dest('./images'))
});

gulp.task('serve',['style'], function(){
	server.init({
		server:'.'
	});
	gulp.watch('./**/*.less',['style']);
	gulp.watch('*.html').on('change', server.reload);
}); 
