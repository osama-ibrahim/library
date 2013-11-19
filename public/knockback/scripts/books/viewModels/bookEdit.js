define(function(require) {
    'use strict';

    var kb = require('knockback'),
        BaseViewModel = require('./baseViewModel'),
        bookEditTemplate = require('text!./../templates/bookEdit.html');

    return BaseViewModel.extend({

        templateName: 'bookEditTemplate',

        template: bookEditTemplate,

        constructor: function(options) {
            BaseViewModel.prototype.constructor.call(this, options.model, options);
        },

        save: function() {
            this.model().save();

            Backbone.history.navigate('books', true);

            return false;
        }
    });
});
