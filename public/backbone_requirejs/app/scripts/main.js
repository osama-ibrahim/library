'use strict';

require.config({
    paths: {
        text: '../bower_components/requirejs-text/text',
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore-amd/underscore',
        backbone: '../bower_components/backbone-amd/backbone',
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
    (function(oldAjax) {
        Backbone.ajax = function(options) {
            options.url = 'https://library-db.firebaseio.com' + options.url + '.json';
            options.crossDomain = true;
            oldAjax.apply(this, arguments);
        };
    })(Backbone.ajax);
    
    $(function() {
        new Router();
        Backbone.history.start();
    });
});
