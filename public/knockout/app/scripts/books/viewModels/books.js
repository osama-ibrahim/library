define(function(require) {
    'use strict';

    var kb = require('./knockback'),
        BaseViewModel = require('./baseViewModel'),
        booksTemplate = require('text!./../templates/books.html');

    return BaseViewModel.extend({

        templateName: 'bookTemplate',

        template: booksTemplate,

        constructor: function(options) {
            BaseViewModel.prototype.constructor.call(this);
            this.books = kb.collectionObservable(options.collection);
        }
    });
});
