(function(Backbone) {
    'use strict';

    window.BookModel = Backbone.Model.extend({

        defaults: {
            title: '',
            description: '',
            author: '',
            pagesCount: 0,
            image: ''
        },

        urlRoot: '/books'
    });
})(window.Backbone);
