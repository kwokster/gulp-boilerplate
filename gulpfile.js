const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

//a task to compile our sass
gulp.task('styles', () => { //you can call styles anything
	return gulp.src('./dev/styles/**/*.scss') //**/* is called globbing pattern -> finds all of the files inside styles that ends in .js
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles'))
});

//a task to compile our js
gulp.task('scripts', () => {
	return gulp.src('./dev/scripts/main.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('./public/scripts'))
});

//a task to watch all of my other tasks , ctrl + c to exit 
gulp.task('watch', () => { //you can call watch anything
	gulp.watch('./dev/styles/**/*.scss', ['styles']);
	gulp.watch('./dev/scripts/main.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);