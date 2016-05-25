var gulp = require('gulp');

module.exports = function() {
	var port = 8080;
	var config = {
		scss_src: './public/scss/*.scss',
		scss_dest: './public/css',
		scss_options: {
			errLogToConsole: true,
			outputStyle: 'expanded'
		},
		browser_options: {
			browsers: ['last 2 version', '> 5%']
		},
		html_src: ['!./public/template.html', './public/*.html'],
		wiredep_options: {
			bowerJson: require('./bower.json'),
			directory: './public/lib',
			ignorePath: '../../public'
		},
		inject_src: gulp.src([
			'./public/css/*.css',
			'./public/js/*.js'], {read: false}),
		inject_options: {
			ignorePath: '/public'
		},
		html_dest: './public',
		nodemon_options: {
			script: 'app.js',
			delayTime: 1,
			env: { PORT: port },
			watch: ['*.js', 'src/**/*.js']
		},
		browsersync_options: {
			proxy: 'localhost:' + port,
			port: 3000,
			files: [
				'./public/**/*.*',
				'!./public/scss/*.scss'
			],
			ghostMode: {
				clicks: true,
				location: false,
				forms: true,
				scroll: true
			},
			injectChanges: true,
			logFileChanges: true,
			logLevel: 'debug',
			logPrefix: 'browsersync',
			notify: true,
			reloadDelay: 1000
		}
	};
	return config;
};