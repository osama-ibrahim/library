'use strict';

var grunt = require('grunt');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-hub');

    grunt.initConfig({
        hub: {
            all: {
                src: ['public/*/Gruntfile.js'],
                tasks: ['default']
            }
        },
        clean: [
            'npm-shrinkwrap.json',
            'dist',
            'public/*/dist'
        ],
        copy: {
            main: {
                files: [{
                    expand: true,
                    src: [
                        '.*',
                        '**',
                        '!public/**',
                        'public/ajax/**',
                        '!dist/**'
                    ],
                    dest: 'dist',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'public/backbone/dist',
                    src: '**',
                    dest: 'dist/public/backbone',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'public/backbone_requirejs/dist',
                    src: '**',
                    dest: 'dist/public/backbone_requirejs',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'public/knockout/dist',
                    src: '**',
                    dest: 'dist/public/knockout',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'public/knockback/dist',
                    src: '**',
                    dest: 'dist/public/knockback',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'public/vanilla/dist',
                    src: '**',
                    dest: 'dist/public/vanilla',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'public/jquery',
                    src: '**',
                    dest: 'dist/public/jquery',
                    filter: 'isFile'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('shrinkwrap', function() {
        var done = this.async();
        grunt.util.spawn({
            cmd: 'npm',
            args: ['shrinkwrap']
        }, function() {
            done();
        });
    });

    grunt.registerTask('default', ['clean', 'shrinkwrap', 'hub', 'copy']);
};
