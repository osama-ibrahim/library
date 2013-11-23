define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        booksTemplate = require('text!./../templates/books.html');

    return Backbone.View.extend({

        template: _.template(booksTemplate),

        initialize: function() {
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.collection.toJSON()));
            return this;
        }
    });
});
