define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        BooksCollection = require('./collections/books'),
        BooksView = require('./views/books'),
        BookModel = require('./models/book'),
        BookDetailsView = require('./views/bookDetails'),
        BookEditView = require('./views/bookEdit');

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
            var view = new BooksView({
                collection: collection
            });

            collection.fetch({ reset: true });

            this.$main.html(view.render().el);
        },

        viewCreateNewBook: function() {
            var view = new BookEditView({ model: new BookModel() });
            this.$main.html(view.render().el);
        },

        viewEditBookDetails: function(id) {
            var model = new BookModel({ id: id });
            var view = new BookEditView({ model: model });

            model.fetch();

            this.$main.html(view.render().el);
        },

        viewBookDetails: function(id) {
            var model = new BookModel({ id: id });
            var view = new BookDetailsView({ model: model });

            model.fetch();

            this.$main.html(view.render().el);
        }
    });
});
