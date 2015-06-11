var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notifier = require('node-notifier');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var cmq = require('gulp-combine-media-queries');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var src = {
	sass: 'sass/**/*.scss',
	svg: 'svg-sprites/svgs/**/*.svg',
	js: [
		'js/plugins/svg-polyfill.js',
		'js/plugins/svg4everybody.js',
		'js/main.js'
	]
};

gulp.task('sass', function(){

	return gulp.src(['sass/styles.scss','sass/frontend.scss'])
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

		// Combine media queries
		.pipe(cmq())

		// Normal output
		.pipe(gulp.dest('css'))

		// Reload Browser Sync
		.pipe(reload({stream: true}))

		// Rename file
		.pipe(rename(function(path){
			path.basename += ".min";
		}))

		// // Minified output
		.pipe(minifyCss())
		.pipe(gulp.dest('css'));

});

// Minify and concatenate JavaScript
gulp.task('js', function(){
	gulp.src(src.js)
		.pipe(concat('frontend.js'))
		.pipe(gulp.dest('js'))
		.pipe(reload({stream: true}))
		.pipe(uglify())
		.pipe(rename('frontend.min.js'))
		.pipe(gulp.dest('js'));
});

// Combine and Minify SVGs
gulp.task('svg', function(){
	gulp.src(src.svg)
		.pipe(svgmin())
		.pipe(svgstore())
		.pipe(rename('lifeproof-svg-sprites.svg'))
		.pipe(gulp.dest('images'))
		.pipe(reload({stream: true}));
});

// Browser Sync serve task
gulp.task('serve', ['sass', 'svg', 'js'], function(){
	browserSync.init({
		server: "./"
	});

	gulp.watch(src.sass, ['sass']);
	gulp.watch(src.svg, ['svg']);
	gulp.watch(src.js, ['js']);
	gulp.watch("./*.html").on('change', reload);
});

// Default task (serve up Browser Sync)
gulp.task('default', ['serve']);

