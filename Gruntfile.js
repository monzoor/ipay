module.exports = function(grunt) {

    // load all grunt task
    require('grunt-task-loader')(grunt, {
        mapping: {
            sass_globbing: 'grunt-sass-globbing'
        }
    });

    grunt.initConfig({

        // Package
        pkg: grunt.file.readJSON('package.json'),


        sass_globbing: {
            sb: {
                files: {
                    'assets/scss/style.scss': [
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
                    'build/css/style.css': 'assets/scss/style.scss'
                },
                options: {
                    compass: true,
                    style: 'compressed',
                    sourcemap: 'none'
                }
            }
        },

        // Clean
        clean: {
            post: ['.sass-cache']
        },

        // Watch
        watch: {
            options: {
                livereload: true,
            },
            sass: {
                files: ['assets/scss/**/*.{sass,scss}'],
                tasks: ['sass_globbing', 'sass']
            }
        },

        // live reload
        express: {
            all: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    bases: ['.'],
                    livereload: true
                }
            }
        }

    });

    // Register Grunt tasks
    grunt.registerTask('default', ['clean:pre', 'sass_globbing', 'sass', 'clean:post']);
    grunt.registerTask('server', ['express', 'watch']);

};