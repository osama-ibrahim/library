'use strict';

require.config({
    paths: {
        text: '../bower_components/requirejs-text/text',
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore-amd/underscore',
        backbone: '../bower_components/backbone-amd/backbone',
        localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require(['bootstrap']);

require([
    'jquery',
    'backbone',
    'books/router',
], function($, Backbone, Router) {
    $(function() {
        new Router();
        Backbone.history.start();
    });
});
