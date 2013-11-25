var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(app.router);

['knockback', 'knockout', 'backbone_requirejs', 'backbone', 'vanilla'].forEach(function(folder) {
    app.use('/' + folder, express.static(__dirname + '/public/' + folder + '/dist'));
    app.use('/' + folder, express.static(__dirname + '/public/' + folder + '/app'));
});

app.get('/', function(req, res) {
    return res.redirect('/knockback');
});

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

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);
