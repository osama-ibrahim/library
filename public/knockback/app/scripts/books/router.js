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
            'books/create': 'viewEditBookDetails',
            'books/:id': 'viewBookDetails',
            'books/:id/edit': 'viewEditBookDetails'
        },

        initialize: function() {
            this.$main = $('.main');
        },

        _ensureBookModel: function(id) {
            if (!this.bookModel) {
                this.bookModel = new BookModel();

                this.bookModel.on('sync', function() {
                    if (this.booksCollection) {
                        this.booksCollection.fetch({ reset: true });
                    }
                }.bind(this));
            }

            if (this.bookModel.get('id') !== id) {
                this.bookModel.set(this.bookModel.defaults);
                this.bookModel.set('id', id);

                if (!this.bookModel.isNew()) {
                    this.bookModel.fetch();
                }
            }
        },

        viewAllBooks: function() {
            if (!this.booksCollection) {
                this.booksCollection = new BooksCollection();
                this.booksCollection.fetch();
            }

            if (!this.booksViewModel) {
                this.booksViewModel = new BooksViewModel({
                    collection: this.booksCollection
                });
            }

            this.$main.html(this.booksViewModel.render().el);
        },

        viewEditBookDetails: function(id) {
            this._ensureBookModel(id);

            if (!this.bookEditViewModel) {
                this.bookEditViewModel = new BookEditViewModel({ model: this.bookModel });
            }

            this.$main.html(this.bookEditViewModel.render().el);
        },

        viewBookDetails: function(id) {
            this._ensureBookModel(id);

            if (!this.bookDetailsViewModel) {
                this.bookDetailsViewModel = new BookDetailsViewModel({ model: this.bookModel });
            }

            this.$main.html(this.bookDetailsViewModel.render().el);
        }
    });
});
