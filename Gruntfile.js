var pkg = require('./package.json');

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function(fileTypePatterns) {
    fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
    var ignore = ['node_modules', 'bower_components', 'dist', 'temp', 'js/parallax.js'];
    var fs = require('fs');
    return fs.readdirSync(process.cwd())
        .map(function(file) {
            if (ignore.indexOf(file) !== -1 ||
                file.indexOf('.') === 0 ||
                !fs.lstatSync(file).isDirectory()) {
                return null;
            } else {
                return fileTypePatterns.map(function(pattern) {
                    return file + '/**/' + pattern;
                });
            }
        })
        .filter(function(patterns) {
            return patterns;
        })
        .concat(fileTypePatterns);
};

/*global module:false*/
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        connect: {
            main: {
                options: {
                    port: 9001
                }
            }
        },
        watch: {
            main: {
                options: {
                    reload: true,
                    livereload: true,
                    livereloadOnError: true,
                    spawn: false
                },
                files: [createFolderGlobs(['*.js', '*.less', '*.html', '*/modules/*', 'modules/**/*']), '!_SpecRunner.html', '!.grunt', 'bower_components/angular/angular.js',
                    'bower_components/angular-mocks/angular-mocks.js'
                ],
                tasks: ['jshint'] //all the tasks are run dynamically during the watch event handler
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [createFolderGlobs('*.js'),'!js/parallax.js']
            }
        },
        clean: {
            before: {
                src: ['dist']
            },
            after: {
                src: ['temp']
            }
        },
        copy: {
            main: {
                files: [
                    { src: ['bower_components/font-awesome/fonts/**'], dest: 'dist/', filter: 'isFile', expand: true },
                    { src: ['bower_components/bootstrap/fonts/**'], dest: 'dist/', filter: 'isFile', expand: true },
                    { src: ['img/*'], dest: 'dist/', filter: 'isFile', expand: true },
                    { src: ['img/**/*'], dest: 'dist/', filter: 'isFile', expand: true },
                    { src: ['*.html'], dest: 'dist/', filter: 'isFile', expand: true },
                    { src: ['*.php'], dest: 'dist/', filter: 'isFile', expand: true }
                ]
            }
        },
        dom_munger: {
            read: {
                options: {
                    read: [
                        { selector: 'script[data-concat!="false"]', attribute: 'src', writeto: 'appjs' },
                        { selector: 'link[rel="stylesheet"][data-concat!="false"]', attribute: 'href', writeto: 'appcss' }
                    ]
                },
                src: 'index.html'
            }/*,
            update: {
                options: {
                    remove: ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append: [
                        { selector: 'body', html: '<script src="app.full.min.js"></script>' },
                        { selector: 'head', html: '<link rel="stylesheet" href="app.full.min.css">' }
                    ]
                },
                src: '*.html',
                dest: 'dist/*.html'
            }*/
        },
        cssmin: {
            main: {
                src: ['<%= dom_munger.data.appcss %>'],
                dest: 'dist/app.full.min.css'
            }
        },
        concat: {
            main: {
                src: ['js/*.js'],
                dest: 'temp/app.full.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            main: {
                src: '<%= dom_munger.data.appjs %>',
                dest: 'dist/app.full.min.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/*.html': 'dist/*.html'
                }
            }
        },
        removelogging: {
            dist: {
                src: '<%= concat.main.dest %>',
                dest: 'temp/app.clean.js',
                options: {
                    // see below for options. this is optional. 
                }
            }
        },
        processhtml: {
            options: {
                data: {
                    stylesheet: 'app.full.min.css'
                }
            },
            dist: {
                options: {
                    process: true
                },
                files: {
                    //'app/dist/application/views/index.php': ['app/src/application/views/index.php'],
                    'dist/index.html': ['index.html'],
                    'dist/services.html': ['services.html'],
                    'dist/about.html': ['about.html'],
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'dom_munger', 'connect:main', 'watch']);
    grunt.registerTask('serve', ['jshint', 'dom_munger', 'connect:main', 'watch']);
    grunt.registerTask('build', ['jshint', 'clean:before', 'dom_munger:read', 'cssmin:main', 'removelogging', 'uglify', 'copy', 'processhtml', 'clean:after']);


    grunt.event.on('watch', function(action, filepath) {
        //https://github.com/gruntjs/grunt-contrib-watch/issues/156

        var tasksToRun = [];

        if (filepath.lastIndexOf('.js') !== -1 && filepath.lastIndexOf('.js') === filepath.length - 3) {

            //lint the changed js file
            grunt.config('jshint.main.src', filepath);
            tasksToRun.push('jshint');

            //find the appropriate unit test for the changed file
            var spec = filepath;
            if (filepath.lastIndexOf('-spec.js') === -1 || filepath.lastIndexOf('-spec.js') !== filepath.length - 8) {
                spec = filepath.substring(0, filepath.length - 3) + '-spec.js';
            }

            //if the spec exists then lets run it
            if (grunt.file.exists(spec)) {
                var files = [].concat(grunt.config('dom_munger.data.appjs'));
                files.push('bower_components/angular-mocks/angular-mocks.js');
                files.push(spec);
                grunt.config('karma.options.files', files);
                tasksToRun.push('karma:during_watch');
            }
        }

        //if index.html changed, we need to reread the <script> tags so our next run of karma
        //will have the correct environment
        if (filepath === 'index.html') {
            tasksToRun.push('dom_munger:read');
        }

        grunt.config('watch.main.tasks', tasksToRun);

    });

};
