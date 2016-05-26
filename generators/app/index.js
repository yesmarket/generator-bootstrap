'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({

	prompting: function() {
		return this.prompt([{
			type: 'input',
			name: 'name',
			message: 'Your project name',
			default: this.appname
		},{
			type: 'input',
			name: 'version',
			message: 'Your project version',
			default: '0.0.1'
		},{
			type: 'input',
			name: 'author',
			message: 'Your project author'
		},{
			type: 'input',
			name: 'license',
			message: 'Your project license',
			default: 'MIT'
		}]).then(function(answers) {
			this.props = answers
			this.log(answers.name);
		}.bind(this));
	},

  	//Copy the configuration files
	writing: {
	  	config: function () {
			this.fs.copyTpl(
				this.templatePath('package.json'),
				this.destinationPath('package.json'), {
                  name: this.props.name,
                  version: this.props.version,
                  author: this.props.author,
                  license: this.props.license,
              });
			this.fs.copy(
				this.templatePath('.bowerrc'),
				this.destinationPath('.bowerrc'));
			this.fs.copyTpl(
				this.templatePath('bower.json'),
				this.destinationPath('bower.json'), {
                  name: this.props.name,
                  version: this.props.version,
                  author: this.props.author,
                  license: this.props.license,
              });
	  	},

	  	//Copy application files
		app: function () {
			this.fs.copy(
				this.templatePath('app.js'),
				this.destinationPath('app.js'));
			this.fs.copy(
				this.templatePath('gulpfile.js'),
				this.destinationPath('gulpfile.js'));
			this.fs.copy(
				this.templatePath('gulp.config.js'),
				this.destinationPath('gulp.config.js'));
			this.directory('public', 'public');
			mkdirp('public/css');
			mkdirp('public/img');
	  	},

	  	//Install Dependencies
		install: function() {
			this.installDependencies();
		}
	}
});