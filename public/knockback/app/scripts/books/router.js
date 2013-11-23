define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        BookModel = require('./models/book'),
        BooksCollection = require('./collections/books'),
        BooksViewModel = require('./viewModels/books'),
        BookDetailsViewModel = require('./viewModels/bookDetails'),
        BookEditViewModel = require('./viewModels/bookEdit');

    return Backbone.Router.extend({

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
            var view = new BooksViewModel({
                collection: collection
            });

            collection.fetch();

            this.$main.html(view.render().el);
        },

        viewCreateNewBook: function() {
            var view = new BookEditViewModel({ model: new BookModel() });
            this.$main.html(view.render().el);
        },

        viewEditBookDetails: function(id) {
            var model = new BookModel({ id: id });
            var view = new BookEditViewModel({ model: model });

            model.fetch();

            this.$main.html(view.render().el);
        },

        viewBookDetails: function(id) {
            var model = new BookModel({ id: id });
            var view = new BookDetailsViewModel({ model: model });

            model.fetch();

            this.$main.html(view.render().el);
        }
    });
});
