window.BooksView = Backbone.View.extend({

    template: _.template($('#booksTemplate').html()),

    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function() {
        this.$el.html(this.template(this.collection.toJSON()));
        return this;
    }
});
