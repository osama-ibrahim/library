(function($, Backbone, Router) {
    'use strict';

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
})(window.jQuery, window.Backbone, window.Router);
