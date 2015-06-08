var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notifier = require('node-notifier');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var src = {
	sass: 'sass/**/*.scss'
};

gulp.task('sass', function(){

	return gulp.src(src.sass)
		.pipe(sass({
			// Sass error handler
			onError: function(error){

				console.log("SASS Error: " + error.file + " " + error.line + ":" + error.column + "\n" + error.message);

				notifier.notify({
					title: "SASS Error",
					subtitle: error.file + " " + error.line + ":" + error.column,
					message: error.message,
					sound: "Hero"
				});

			},

			// Sass success message
			onSuccess: function(css){

				notifier.notify({
					title: "SASS Compile",
					message: "Success",
					sound: false
				});

			},
			outputStyle: 'nested',
			sourceComments: true
		}))

		// Autoprefixer
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))

		// Normal output
		.pipe(gulp.dest('css'))

		// Minified output
		.pipe(rename('minified.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('css'))

		// Reload Browser Sync
		.pipe(reload({stream: true}));
});

// Browser Sync serve task
gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: "./"
	});

	gulp.watch(src.sass, ['sass']);
	gulp.watch("./*.html").on('change', reload);
});

// Watch task
gulp.task('watch', ['sass'], function(){
	gulp.watch(src.sass, ['sass']);
});

// Default task (serve up Browser Sync)
gulp.task('default', ['serve']);

