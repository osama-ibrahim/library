define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        BookModel = require('../models/book');

    return Backbone.Collection.extend({

        model: BookModel,

        url: '/books',

        parse: function(resp) {
            return Object.keys(resp).map(function(key) {
                resp[key].id = resp[key].id || key;
                return resp[key];
            });
        }
    });
});
