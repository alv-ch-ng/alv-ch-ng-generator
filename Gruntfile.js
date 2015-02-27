;(function () {
  'use strict';

  module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
      // Metadata.
      pkg: grunt.file.readJSON('package.json'),
      jshint: {
        srcFiles: {
          options: {
            jshintrc: '.jshintrc'
          },
          src: [
            'Gruntfile.js',
            'app/**/*.js',
            '!app/templates/**/*'
          ]
        },
        testFiles: {
          options: {
            jshintrc: 'test/.jshintrc'
          },
          src: [
            'test/**/*.js'
          ]
        }
      }
    });

    // required modules
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // QA
    grunt.registerTask('qa', ['jshint']);

    // Default task.
    grunt.registerTask('default', ['qa']);
  };

})();
