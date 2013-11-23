define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        BookModel = require('../models/book');

    // require('localStorage');

    return Backbone.Collection.extend({

        model: BookModel,

        url: '/api/v1/books'//,

        // localStorage: new Backbone.LocalStorage('books')
    });
});
