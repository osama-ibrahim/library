window.BookModel = Backbone.Model.extend({

    defaults: {
        title: '',
        description: '',
        author: '',
        pagesCount: 0,
        image: ''
    },

    urlRoot: '/api/v1/books'
});
