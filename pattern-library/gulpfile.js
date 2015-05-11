var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notifier = require('node-notifier');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var src = {
	sass: 'sass/**/*.scss'
};

gulp.task('sass', function(){

	return gulp.src(src.sass)
		.pipe(sass({
			// Error handler for SASS compiling
			onError: function(error){

				console.log("SASS Error: " + error.file + " " + error.line + ":" + error.column + "\n" + error.message);

				notifier.notify({
					title: "SASS Error",
					subtitle: error.file + " " + error.line + ":" + error.column,
					message: error.message,
					sound: "Hero"
				});

			},

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
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('css'))
		.pipe(reload({stream: true}));
});

// Browser Sync serve task
gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: "./"
	});

	gulp.watch(src.sass, ['sass']);
});

gulp.task('watch', ['sass'], function(){
	gulp.watch(src.sass, ['sass']);
});

gulp.task('default', ['serve']);

