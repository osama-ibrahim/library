'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'public/knockback/scripts',
                    mainConfigFile: 'public/knockback/scripts/main.js',
                    out: 'public/knockback/scripts/main-built.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-requirejs');

    grunt.registerTask('default', 'bower');
};
