var gulp = require('gulp');
var cfg = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy:true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('styles', function(){
	return gulp
  		.src(cfg.scss_src)
  		.pipe($.plumber())
    	.pipe($.sass.sync())
    	.pipe($.autoprefixer(cfg.browser_options))
    	.pipe(gulp.dest(cfg.scss_dest));
});

gulp.task('styles:watch', function () {
	gulp.watch(cfg.scss_src, ['styles']);
});

gulp.task('wiredep', function(){
	var wiredep = require('wiredep').stream;
	return gulp
		.src(cfg.html_src)
		.pipe(wiredep(cfg.wiredep_options))
		.pipe(gulp.dest(cfg.html_dest));
});

gulp.task('inject', ['wiredep', 'styles'], function(){
	var wiredep = require('wiredep').stream;
	return gulp
		.src(cfg.html_src)
		.pipe($.inject(cfg.inject_src, cfg.inject_options))
		.pipe(gulp.dest(cfg.html_dest));
});

gulp.task('start', ['inject'], function(){
	var browsersync = require('browser-sync');
	return $.nodemon(cfg.nodemon_options)
		.on('start', function(ev){
			if (!browsersync.active) {
				gulp.watch(cfg.scss_src, ['styles']);;
				browsersync(cfg.browsersync_options);
			}
		})
		.on('start', function(ev){
			setTimeout(function() {
				browsersync.reload({stream: false});
			}, 1000);
		});
});