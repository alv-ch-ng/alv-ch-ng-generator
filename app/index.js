'use strict';
var yeoman = require('yeoman-generator');

var AlvChNgGenerator = yeoman.generators.Base.extend({

  init: function () {

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install'],
        callback: function () {
          this.spawnCommand('grunt', ['default']);
        }.bind(this)
      });
    });
  },

  askFor: function () {
    var done = this.async();

    this.prompt([
      {
        type: 'input',
        name: 'name',
        required: true,
        message: 'What\'s the name of the module?'
      },
      {
        type: 'input',
        name: 'version',
        message: 'What\'s the version of the module?',
        default: '0.2.0'
      },
      {
        type: 'confirm',
        name: 'addLess',
        message: 'Shall I add less?',
        default: function () {
          return false;
        }
      },
      {
        type: 'confirm',
        name: 'addExample',
        message: 'Shall I add an example?',
        default: function () {
          return true;
        }
      }
    ], function (props) {
      this.answers = props;
      this.answers.moduleName = this._.camelize(props.name);
      done();
    }.bind(this));
  },

  app: function () {

    this.mkdir('src');
    this.mkdir('src/js');
    this.mkdir('src/templates');
    this.mkdir('test');
    this.mkdir('test/unit');

    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.template('_README.md', 'README.md');
    this.template('src/js/_ng-file.js', 'src/js/' + this.answers.moduleName + '.js');

    this.bulkCopy('_LICENSE', 'LICENSE');
    this.bulkCopy('test/_.jshintrc', 'test/.jshintrc');
    this.bulkCopy('_.alvchngrc', '.alvchngrc');
    this.bulkCopy('_.bowerrc', '.bowerrc');
    this.bulkCopy('_.csslintrc', '.csslintrc');
    this.bulkCopy('_.gitignore', '.gitignore');
    this.bulkCopy('_.htmlhintrc', '.htmlhintrc');
    this.bulkCopy('_.jshintignore', '.jshintignore');
    this.bulkCopy('_.jshintrc', '.jshintrc');
    this.bulkCopy('_.travis.yml', '.travis.yml');

    if (this.answers.addLess) {
      this.mkdir('src/less');
      this.copy('src/less/_less-file.less', 'src/less/' + this.answers.moduleName+'.less');
      this.copy('src/less/_variables.less', 'src/less/variables.less');
    }

    if (this.answers.addExample) {
      this.mkdir('src/example');
      this.mkdir('src/example/locales');
      this.mkdir('src/example/pages');
      this.copy('src/example/index.html');
      this.copy('src/example/locales/messages_de.json');
      this.copy('src/example/locales/messages_en.json');
      this.copy('src/example/example.app.js');
      this.copy('src/example/pages/_example.html','src/example/pages/'+this.answers.moduleName+'.html');
    }

  },

  runNpm: function () {
        var done = this.async();
     this.npmInstall('', function () {
     console.log('\nModule setup successfully done !!!\n');
     done();
     });
  }
});

module.exports = AlvChNgGenerator;
