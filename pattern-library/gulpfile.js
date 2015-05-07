var gulp = require('gulp');
var sass = require('gulp-sass');
var notifier = require('node-notifier');

var src = {
	sass: 'sass/**/*.scss'
};

gulp.task('sass', function(){

	return gulp.src(src.sass)
		.pipe(sass({
			// Error handler for SASS compiling
			onError: function(error){
				console.log("SASS Error on line " + error.line + ":" + error.column + "\n" + error.message);

				notifier.notify({
					title: "SASS Compile",
					subtitle: "Error on line: " + error.line + ":" + error.column,
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
		.pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function(){
	gulp.watch(src.sass, ['sass']);
});

