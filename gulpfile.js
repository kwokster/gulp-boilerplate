const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

//a task to compile our sass
gulp.task('styles', () => { //you can call styles anything
	return gulp.src('./dev/styles/**/*.scss') //**/* is called globbing pattern -> finds all of the files inside styles that ends in .js
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles'))
		.pipe(reload({stream: true}));
});

//a task to compile our js
gulp.task('scripts', () => {
	return gulp.src('./dev/scripts/main.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('./public/scripts'))
	.pipe(reload({stream: true}));
});

//a task to watch all of my other tasks , ctrl + c to exit 
gulp.task('watch', () => { //you can call watch anything
	gulp.watch('./dev/styles/**/*.scss', ['styles']);
	gulp.watch('./dev/scripts/main.js', ['scripts']);
	gulp.watch('*.html', reload);
});

gulp.task('default', ['browser-sync','styles', 'scripts', 'watch']);

gulp.task('browser-sync', () => {
  browserSync.init({
    server: '.'  
  })
});