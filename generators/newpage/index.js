'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

	prompting: function() {
		return this.prompt([{
			type: 'input',
			name: 'name',
			message: 'The name of the new page',
			default: this.appname
		}]).then(function(answers) {
			this.props = answers
			this.log(answers.name);
		}.bind(this));
	},

  	//Copy the configuration files
	writing: {
	  	config: function () {
			this.fs.copyTpl(
				this.templatePath('template.html'),
				this.destinationPath('public/' + this.props.name + '.html'), {
                  name: this.props.name
              });
	  	}
  	}
});