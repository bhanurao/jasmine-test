module.exports = function(grunt) {
    'use strict';

    var globalConfig = {
        src: {
            js: {
                core: 'src/main/ui/core/js/',
                bootstrap: 'src/main/ui/frameworks/bootstrap-4.0.0-alpha.2/js/dist/',
            },
            sass: {
                core: 'src/main/ui/core/sass/'
            }
        },
        dest: 'dev'
    };

    // Project configuration.
    grunt.initConfig({

        globalConfig: globalConfig,

        pkg : grunt.file.readJSON('package.json'),

        jasmine : {
            coverage : {
                src : [
                       'src/main/ui/core/js/modules/**/*.js',
                       ],
                options : {
                    specs : 'src/test/ui/*.js',
                    template : require('grunt-template-jasmine-istanbul'),
                    templateOptions : {
                        coverage : 'target-grunt/reports/coverage.json',
                        report : [ {
                            type : 'lcov',
                            options : {
                                dir : 'target-grunt/reports/lcov'
                            }
                        }, {
                            type : 'text-summary'
                        } ]
                    },
                }
            },
            spec: {
                src : [
                    'src/main/ui/core/js/**/*.js'
                ],
                options : {
                    specs : 'src/test/ui/<%= globalConfig.file %>Spec.js',
                    template : require('grunt-template-jasmine-istanbul'),
                    templateOptions : {
                        coverage : 'target-grunt/reports/coverage.json',
                        report : [ {
                            type : 'lcov',
                            options : {
                                dir : 'target-grunt/reports/lcov'
                            }
                        }, {
                            type : 'text-summary'
                        } ]
                    },
                    vendor : [ 'src/main/ui/frameworks/jquery-2.2.0.min.js' ]
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, {
        pattern : [ 'grunt-*', '!grunt-template-jasmine-istanbul' ]
    });

    // Default task(s).
    grunt.registerTask('default', ['jasmine:coverage']);
    grunt.registerTask('test', 'jasmine:coverage');

};
