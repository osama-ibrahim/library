define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        bookDetailsTemplate = require('text!./../templates/bookDetails.html');

    return Backbone.View.extend({

        template: _.template(bookDetailsTemplate),

        events: {
            'click .js-delete-book': 'deleteBook'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        deleteBook: function() {
            this.model.destroy();
            Backbone.history.navigate('books', true);
        }
    });
});
