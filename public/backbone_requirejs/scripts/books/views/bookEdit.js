define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        bookEditTemplate = require('text!./../templates/bookEdit.html');

    return Backbone.View.extend({

        template: _.template(bookEditTemplate),

        events: {
            'submit .js-book-form': 'save',
            'click .js-save-book': 'save'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        save: function() {
            this.model.set({
                title: this.$('[name=title]').val(),
                author: this.$('[name=author]').val(),
                description: this.$('[name=description]').val(),
                pagesCount: this.$('[name=pagesCount]').val(),
                image: this.$('[name=image]').val()
            });

            this.model.save();

            Backbone.history.navigate('books', true);

            return false;
        }
    });
});
