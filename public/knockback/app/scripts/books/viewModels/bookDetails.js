define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        BaseViewModel = require('./baseViewModel'),
        bookDetailsTemplate = require('text!./../templates/bookDetails.html');

    return BaseViewModel.extend({

        templateName: 'bookDetailsTemplate',

        template: bookDetailsTemplate,

        constructor: function(options) {
            BaseViewModel.prototype.constructor.call(this, options.model, options);
        },

        deleteBook: function() {
            this.model().destroy();
            Backbone.history.navigate('books', true);
        }
    });
});
