;(function () {
    'use strict';

    module.exports = function (grunt) {
        require('load-grunt-tasks')(grunt, {
            pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
        });
        require('time-grunt')(grunt);

        // Project configuration.
        grunt.initConfig({

            // Metadata.
            pkg: grunt.file.readJSON('package.json'),
            alvchng: grunt.file.readJSON('.alvchngrc'),
             // Task configurations.
            clean: {
                all: ['dist', 'build'],
                dist: ['dist'],
                build: ['build']
            },
            ngtemplates:  {
              'templates':  {
                cwd:      'src/js/',
                src:      'template/**.html',
                dest:     'src/js/alv-ch-ng.<%= answers.moduleName %>.templates.js'
              }
            },
            uglify: {
                options: {
                    banner: '<%%= alvchng.banner %>'
                },
                prod: {
                    files: {
                        'dist/alv-ch-ng.<%= answers.moduleName %>.min.js': ['dist/alv-ch-ng.<%= answers.moduleName %>.js'],
                        'dist/alv-ch-ng.<%= answers.moduleName %>.templates.min.js': ['dist/alv-ch-ng.<%= answers.moduleName %>.templates.js']
                    }
                },
                demo: {
                  options: {
                    'mangle': false
                  },
                  files: {
                    'src/demo/lib.min.js': [
                      'lib/jquery/dist/jquery.js',
                      'lib/bootstrap/dist/js/bootstrap.js',
                      'lib/angular/angular.js',
                      'lib/angular-cookies/angular-cookies.js',
                      'lib/angular-route/angular-route.js',
                      'lib/angular-sanitize/angular-sanitize.js',
                      'lib/angular-scroll/angular-scroll.js',
                      'lib/ng-lodash/build/ng-lodash.js',
                      'lib/alv-ch-ng.core/dist/alv-ch-ng.core.js',
                      'lib/alv-ch-ng.core/dist/alv-ch-ng.core.templates.js'
                    ]
                  }
                }
            },
            <% if (answers.addLess == true) { %>less: {
                prod: {
                    options: {
                        paths: ['src/less'],
                        compress: false,
                        cleancss: true,
                        ieCompat: true
                    },
                    files: {
                        'dist/css/<%= answers.moduleName %>.css': ['src/less/<%= answers.moduleName %>.less']
                    }
                }
            },<% } %>
            copy: {
              demo: {
                files: [
                  {
                    expand: true,
                    cwd: 'lib/bootstrap/',
                    src: 'fonts/*',
                    dest: 'src/demo/fonts'
                  },
                  {
                    expand: true,
                    cwd: 'lib/bootstrap/dist/css/',
                    src: 'bootstrap.css',
                    dest: 'src/demo'
                  }
                ]
              }
            },
            cssbeautifier: {
                options: {
                    banner: '<%%= alvchng.banner %>'
                },
                prod: {
                    files: {
                        'dist/css/<%= answers.moduleName %>.css': ['dist/css/<%= answers.moduleName %>.css']
                    }
                }
            },
            cssmin: {
                options: {
                    banner: '<%%= alvchng.banner %>'
                },
                prod: {
                    files: {
                        'dist/css/<%= answers.moduleName %>.min.css': ['dist/css/<%= answers.moduleName %>.css']
                    }
                }
            },
            compress: {
                main: {
                    options: {
                        mode: 'gzip'
                    },
                    files: [
                        { src: ['dist/css/<%= answers.moduleName %>.min.css'], dest: 'dist/css/<%= answers.moduleName %>.min.css' }
                    ]
                }
            },
            jasmine: {
                unit: {
                    src: [
                        'src/js/*.js'
                    ],
                    options: {
                        specs: ['test/unit/**/*.unit.spec.js'],
                        helpers: 'test/unit/helpers/*.helper.js',
                        vendor: [
                            'lib/jquery/dist/jquery.js',
                            'lib/jasmine-jquery/lib/jasmine-jquery.js',
                            'lib/angular/angular.js',
                            'lib/angular-mocks/angular-mocks.js',
                            'lib/angular-translate/angular-translate.js',
                            'lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                            'lib/angular-translate-storage-local/angular-translate-storage-local.js',
                            'lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                            'lib/ng-lodash/build/ng-lodash.js',
                            'lib/alv-ch-ng-core/dist/alv-ch-ng.core.js',
                            'lib/alv-ch-ng-core/dist/alv-ch-ng.core.templates.js',
                            'node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.0/jasmine.js'
                        ],
                        version: '2.0.0',
                        template: require('grunt-template-jasmine-istanbul'),
                        templateOptions: {
                            coverage: 'build/coverage/coverage.json',
                            report: [
                                {
                                    type: 'html',
                                    options: {
                                        dir: 'build/coverage/reports/html'
                                    }
                                },
                                {
                                    type: 'lcov',
                                    options: {
                                        dir: 'build/coverage/reports/lcov'
                                    }
                                },
                                {
                                    type: 'text-summary'
                                }
                            ]
                        }
                    }
                }
            },
            coveralls: {
                options: {
                    force: false
                },
                all: {
                    src: 'build/coverage/reports/lcov/lcov.info'
                }
            },
            push: {
                options: {
                    files: ['package.json'],
                    updateConfigs: [],
                    releaseBranch: 'master',
                    add: true,
                    addFiles: ['*.*', 'dist/**', 'src/**', 'test/**'], // '.' for all files except ignored files in .gitignore
                    commit: true,
                    commitMessage: 'Release v%VERSION%',
                    commitFiles: ['*.*', 'dist/**', 'src/**', 'test/**'], // '-a' for all files
                    createTag: true,
                    tagName: 'v%VERSION%',
                    tagMessage: 'Version %VERSION%',
                    push: false,
                    npm: false,
                    gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
                }
            },
            jshint: {
                gruntfile: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    src: 'Gruntfile.js'
                },
                src: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    src: ['src/**/*.js']
                },
                test: {
                    options: {
                        jshintrc: 'test/.jshintrc'
                    },
                    src: ['test/**/*.js', '!test/dev/*.js', '!test/**/helpers/*.helper.js', '!test/e2e/**']
                }
            },
            lesslint: {
                options: {
                    csslint: {
                        csslintrc: '.csslintrc'
                    },
                    imports: ['src/less/**/*.less']
                },
                src: ['src/less/<%= answers.moduleName %>.less']
            },
            watch: {
              templates: {
                files: 'src/template/**/*.html',
                  tasks: ['templates']
              },
              less: {
                files: 'src/less/**/*.less',
                  tasks: ['less:prod']
              },
              jshint: {
                files: 'src/js/*.js',
                  tasks: ['jshint-test']
              },
              test: {
                  files: 'src/js/**/*.js',
                  tasks: ['unit-test']
              }
            },
            browserSync: {
              dev: {
                bsFiles: {
                  src : 'src/**/*'
                },
                options: {
                  server: {
                    baseDir: './src',
                    directory: false
                  },
                  watchTask: true
                }
              }
            }
        });

        // Tests
        grunt.registerTask('unit-test', ['jasmine']);
        grunt.registerTask('jshint-test', ['jshint']);
        <% if (answers.addLess == true) { %>
        grunt.registerTask('lesslint-test', ['lesslint']);
        <% } %>
        grunt.registerTask('all-test', [<% if (answers.addLess == true) { %>'lesslint-test',<% } %> 'htmlhint:templates', 'jshint-test', 'unit-test']);
        // CI
        grunt.registerTask('travis', ['jshint', 'clean:build', 'unit-test', 'coveralls']);

        // Templates
        grunt.registerTask('templates', ['ngtemplates:templates']);

        // DEV
        grunt.registerTask('build', ['templates',<% if (answers.addLess == true) { %>'less:prod',<% } %>'all-test','copy:demo','uglify:demo']);
        grunt.registerTask('dev', ['build', 'browserSync:dev', 'watch']);

        // Default task.
        grunt.registerTask('default', ['clean:all','templates','all-test',<% if (answers.addLess == true) { %>'less:prod','cssbeautifier','cssmin',<% } %> 'concat','uglify:prod']);
    };


})();
