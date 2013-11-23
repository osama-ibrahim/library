'use strict';

var grunt = require('grunt');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-hub');

    grunt.initConfig({
        hub: {
            all: {
                src: ['public/*/Gruntfile.js'],
                tasks: ['default'],
            },
        },
    });

    grunt.registerTask('default', ['hub']);
};
