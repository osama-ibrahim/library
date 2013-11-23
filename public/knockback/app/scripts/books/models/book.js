define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    require('localStorage');

    return Backbone.Model.extend({

        defaults: {
            id: undefined,
            title: '',
            description: '',
            author: '',
            pagesCount: 0,
            image: ''
        },

        urlRoot: '/api/v1/books',

        localStorage: new Backbone.LocalStorage('books')
    });
});
