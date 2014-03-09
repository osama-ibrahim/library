define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        defaults: {
            id: undefined,
            title: '',
            description: '',
            author: '',
            pagesCount: 0,
            image: ''
        },

        urlRoot: '/books'
    });
});
