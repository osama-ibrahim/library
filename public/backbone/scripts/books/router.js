window.Router = Backbone.Router.extend({

    routes: {
        '': 'viewAllBooks',
        'books': 'viewAllBooks',
        'books/create': 'viewCreateNewBook',
        'books/:id': 'viewBookDetails',
        'books/:id/edit': 'viewEditBookDetails'
    },

    initialize: function() {
        this.$main = $('.main');
    },

    viewAllBooks: function() {
        var collection = new BooksCollection();
        collection.fetch({ reset: true });

        var view = new BooksView({
            collection: collection
        });

        this.$main.html(view.render().el);
    },

    viewCreateNewBook: function() {
        var view = new BookEditView({
            model: new BookModel()
        });

        this.$main.html(view.render().el);
    },

    viewEditBookDetails: function(id) {
        var model = new BookModel({ id: id });
        model.fetch();

        var view = new BookEditView({
            model: model
        });

        this.$main.html(view.render().el);
    },

    viewBookDetails: function(id) {
        var model = new BookModel({ id: id });
        model.fetch();

        var view = new BookDetailsView({
            model: model
        });

        this.$main.html(view.render().el);
    }
});
