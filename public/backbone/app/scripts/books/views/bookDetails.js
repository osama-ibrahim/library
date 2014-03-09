(function($, _, Backbone) {
    'use strict';

    window.BookDetailsView = Backbone.View.extend({

        template: _.template($('#bookDetailsTemplate').html()),

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
})(window.jQuery, window._, window.Backbone);
