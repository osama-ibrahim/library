require.config({
    paths: {
        text: '../bower_components/requirejs-text/text',
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore-amd/underscore',
        backbone: '../bower_components/backbone-amd/backbone',
        knockout: '../bower_components/knockout.js/knockout.debug',
        knockback: '../bower_components/knockback/knockback',
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
    'books/router',
], function($, Router) {
    $(function() {
        var router = new Router();
        Backbone.history.start();
    });
});
