module.exports = function(grunt) {

    grunt.initConfig({

        // Package
        pkg: grunt.file.readJSON('package.json'),


        sass_globbing: {
          sb: {
            files: {
              'assets/scss/screen.scss': [
                'node_modules/jeet/scss/index.scss',
                'assets/scss/common/**/*.scss',
                'assets/scss/pages/**/*.scss'
              ]
            },
            options: {
              useSingleQuotes: false
            }
          }
        },

        sass: {
          dist: {
            files: {
              'build/css/screen.css': 'assets/scss/screen.scss'
            },
            options: {
              compass: true,
              style: 'compressed'
            }
          }
        },

        // Clean
        clean: {
            pre: ['styleguide', 'assets/css'],
            post: ['.sass-cache']
        },

        // Watch
        watch: {
            sass: {
                files: ['assets/scss/**/*.{sass,scss}'],
                tasks: ['sass_globbing','sass']
            }
        }

    });

    // Load NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass-globbing');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Register Grunt tasks
    grunt.registerTask('default', ['clean:pre', 'sass_globbing','sass', 'clean:post']);
  
};
