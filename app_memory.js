var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

var books = [];

app.get('/api/v1/books', function(req, res) {
    res.send(books);
});

app.get('/api/v1/books/:id', function(req, res) {
    var book = books.filter(function(book) {
        return book.id === req.params.id;
    })[0];

    res.send(book || 404);
});

app.post('/api/v1/books', function(req, res) {
    req.body.id = Date.now().toString();
    books.push(req.body);
    res.send(204);
});

app.put('/api/v1/books/:id', function(req, res) {
    var i = books.map(function(book) { return book.id; }).indexOf(req.params.id);
    books[i] = req.body;
    res.send(204);
});

app.del('/api/v1/books/:id', function(req, res) {
    var i = books.map(function(book) { return book.id; }).indexOf(req.params.id);
    books.splice(i, 1);
    res.send(204);
});

app.listen(3000);
console.log('Listening on port 3000');
