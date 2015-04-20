var gulp = require('gulp');
var sass = require('gulp-sass');

var src = {
	sass: 'sass/**/*.scss'
};

gulp.task('sass', function(){

	return gulp.src(src.sass)
		.pipe(sass({
			errLogToConsole: true,
			onError: function(e){
				console.log(e);
			}
		}))
		.pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function(){
	gulp.watch(src.sass, ['sass']);
});