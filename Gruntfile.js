'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks 
  require('load-grunt-tasks')(grunt);
  require: './base64-encode.rb';

  var reloadPort = 35729,
      files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'index.js'
      }
    },

    sass: {
      dev: {
        options: {
          lineNumbers: true,
          compass: true,
          sourcemap: 'none'
        },
        files: {
          'dist/css/all.css': 'scss/style.scss'
        }
      }
    },

    copy: {
      css: {
        flatten: true,
        expand: true,
        src: [
          'node_modules/bootstrap/dist/**/*.css',
          'node_modules/bootstrap-select/dist/**/*.css'
        ],
        dest: 'dist/css/',
        options: {
          process: function (content, srcpath) {
            return content.replace(/\/\*# sourceMappingURL=.*map \*\//g, '');
          }
        }
      },

      fonts: {
        flatten: true,
        expand: true,
        src: [
          'fonts/**'
        ],
        dest: 'dist/fonts/'
      }

    },

    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },

      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['scss/*.scss'],
        tasks: ['sass', 'copy:css']
      },

      server: {
        files: [
          'index.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },

      js: {
        files: ['public/scripts/*'],
        options: {
          livereload: reloadPort
        }
      },

      css: {
        files: ['../dist/css/*.css'],
        options: {
          livereload: reloadPort
        }
      },

      static: {
        files: ['static-html/*.html'],
        options: {
          livereload: reloadPort
        }
      }
    },

    release: {
      options: {
        push: false,
        pushTags: false
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://' + document.location.hostname + ':' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
        var reloaded = !err && res.statusCode === 200;
        if (reloaded) {
          grunt.log.ok('Delayed live reload successful.');
        } else {
          grunt.log.error('Unable to make a delayed live reload.');
        }
        done(reloaded);
      });
    }, 500);
  });

  //add css convention/lint and jslint
  grunt.registerTask('default', ['develop','watch']);

  grunt.registerTask('ci', function(type) {
    grunt.task.run('build');
    grunt.task.run('bump-only:' + (type || 'patch')); // Bump up the version
    grunt.task.run('bump-commit');                    // Commit & tag the release & push to origin
    grunt.task.run('shell:npmpub');                         // Publish to NPM
  });
};

