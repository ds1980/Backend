'use strict';

// Gulp Task dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var filters = require('gulp-filter');
var prettify = require('gulp-prettify');
var gulpIgnore = require('gulp-ignore');
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var rtlcss = require("gulp-rtlcss");

// Compile SASS to CSS
gulp.task('sass', function () {
	/* Global SCSS Compile */
	gulp.src('./sass/global/**/*.scss').pipe(sass()).pipe(gulp.dest('./assets/global/'));
	gulp.src('./sass/pages/**/*.scss').pipe(sass()).pipe(gulp.dest('./assets/pages/'));
	/* Layout SCSS Compile */
	gulp.src('./sass/layouts/**/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/'));
});

//*** SASS watch(realtime) compiler task
gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});

//*** Minify CSS & JS
gulp.task('minify', function () {
	// css minify
	gulp.src(['./assets/global/css/**/*.css','!./assets/global/css/**/*.min.css'])
		.pipe(rename({suffix: '.min'}))
		.pipe(minifyCss())
		.pipe(gulp.dest('./assets/global/css'));
	gulp.src(['./assets/layouts/**/*.css','!./assets/layouts/**/*.min.css'])
		.pipe(rename({suffix: '.min'}))
		.pipe(minifyCss())
		.pipe(gulp.dest('./assets/layouts'));
	gulp.src(['./assets/pages/**/*.css','!./assets/pages/**/*.min.css'])
		.pipe(rename({suffix: '.min'}))
		.pipe(minifyCss())
		.pipe(gulp.dest('./assets/pages'));
	//js

	gulp.src(['./assets/global/js/**/*.js','!./assets/global/js/**/*.min.js'])
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/global/js'));
	gulp.src(['./assets/layouts/**/*.js','!./assets/layouts/**/*.min.js'])
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/layouts'));
	gulp.src(['./assets/pages/**/*.js','!./assets/pages/**/*.min.js'])
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/pages'));
});

//*** RTL convertor task
gulp.task('rtlcss', function () {

	// gulp
	// .src(['./assets/layouts/**/css/*.css', '!./assets/layouts/**/css/*-rtl.css', '!./assets/layouts/**/css/*-rtl.min.css', '!./assets/layouts/**/css/*.min.css'])
	// .pipe(rtlcss())
	// .pipe(rename({suffix: '-rtl'}))
	// .pipe(gulp.dest('./assets/layouts'));

});

//*** HTML formatter task
gulp.task('prettify', function() {

	gulp.src('./**/*.html').
	pipe(prettify({
		indent_size: 4,
		indent_inner_html: true,
		unformatted: ['pre', 'code']
	})).
	pipe(gulp.dest('./'));
});
