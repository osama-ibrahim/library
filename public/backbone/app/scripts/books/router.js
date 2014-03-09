(function($, Backbone, BooksCollection, BookModel, BooksView, BookDetailsView, BookEditView) {
    'use strict';

    window.Router = Backbone.Router.extend({

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
                this.booksCollection.fetch({ reset: true });
            }

            if (!this.booksView) {
                this.booksView = new BooksView({
                    collection: this.booksCollection
                });
            }

            this.$main.html(this.booksView.render().el);
        },

        viewEditBookDetails: function(id) {
            this._ensureBookModel(id);

            if (!this.bookEditView) {
                this.bookEditView = new BookEditView({
                    model: this.bookModel
                });
            }

            this.$main.html(this.bookEditView.render().el);
        },

        viewBookDetails: function(id) {
            this._ensureBookModel(id);

            if (!this.bookDetailsView) {
                this.bookDetailsView = new BookDetailsView({
                    model: this.bookModel
                });
            }

            this.$main.html(this.bookDetailsView.render().el);
        }
    });
})(window.jQuery, window.Backbone, window.BooksCollection, window.BookModel, window.BooksView, window.BookDetailsView, window.BookEditView);
