var booksCollection = [];

var $booksListContainer = $('.js-books-list-container');
var $bookDetailsContainer = $('.js-book-details-container');
var $createNewBookContainer = $('.js-create-new-book-container');

var saveBook = function(event) {
    $.ajax({
        method: 'POST',
        url: 'https://library-db.firebaseio.com/books.json',
        contentType: 'application/json',
        data: JSON.stringify({
            title: $('[name=title]').val(),
            author: $('[name=author]').val(),
            pagesCount: $('[name=pagesCount]').val(),
            image: $('[name=image]').val(),
            description: $('[name=description]').val()
        })
    });

    event.preventDefault();

    viewBooksList();
};

var toArray = function(obj) {
    return Object.keys(obj).map(function(key) {
        obj[key].id = key;
        return obj[key];
    });
};

var renderBookItem = function(book) {
    $(
        '<li id="' + book.id + '" class="js-book-item">' +
            '<a href="https://library-db.firebaseio.com/books/' + book.id + '.json">' +
                book.title + ' (by ' + book.author + ')' +
            '</a>' +
        '</li>'
    )
    .on('click', onBookItemClick)
    .appendTo('.js-books-list');
};

var renderBookDetails = function(book) {
    $('.js-book-details').html(
        '<div>' +
            '<h2>' + book.title + ' (by ' + book.author + ')</h2>' +
            '<img src="' + book.image + '" alt="" /> ' +
            '<div>' + book.description + '</div>' +
        '</div>'
    );
};

var onBookItemClick = function(event) {
    var bookId = this.id;

    var filtered = booksCollection.filter(function(book) {
        return book.id === bookId;
    });

    renderBookDetails(filtered[0]);

    viewBookDetails();

    event.preventDefault();
};

var getBooks = function(books) {
    booksCollection = toArray(books);

    booksCollection.forEach(renderBookItem);
};

var viewBooksList = function() {
    $createNewBookContainer.addClass('hidden');
    $bookDetailsContainer.addClass('hidden');
    $booksListContainer.removeClass('hidden');
};

var viewBookDetails = function() {
    $createNewBookContainer.addClass('hidden');
    $bookDetailsContainer.removeClass('hidden');
    $booksListContainer.addClass('hidden');
};

var viewCreateBook = function() {
    $createNewBookContainer.removeClass('hidden');
    $bookDetailsContainer.addClass('hidden');
    $booksListContainer.addClass('hidden');
};

var init = function() {
    // Attach an event handler to the submit event of the create form.
    $('.js-save-book-form').on('submit', saveBook);

    // Attach an event handler to the click on the "Back"/"Cancel" buttons to
    // view the books list instead of the current view.
    $('.js-view-books-list').on('click', viewBooksList);

    // Attach an event handler to the click event of the "Create a new book" button to
    // view the create form instead of the current view.
    $('.js-create-new-book').on('click', viewCreateBook);

    // Make an ajax request to get all the books, and call getBooks function on success.
    $.getJSON('https://library-db.firebaseio.com/books.json', getBooks);
};

// The next line of code is to tell jQuery to run the `init` function,
// after the browser finish parsing of the page, and fires the "DOMContentLoaded" event.
// and it's equivelant to the following (without jQuery help):
// document.addEventListener('DOMContentLoaded', init);
$(init);
