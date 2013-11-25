var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(__dirname + '/public'));

['knockback', 'knockout', 'backbone_requirejs', 'backbone', 'vanilla'].forEach(function(folder) {
    app.use('/' + folder, express.static(__dirname + '/public/' + folder + '/dist'));
    app.use('/' + folder, express.static(__dirname + '/public/' + folder + '/app'));
});

var corsOptions = {
    origin: true
};

app.use(cors(corsOptions));

app.use(app.router);

var mongoSettings = {};

if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    mongoSettings = env['mongodb-1.8'][0]['credentials'] || {};
}

var generateMongoUrl = function(obj) {
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'library');

    if (obj.username && obj.password) {
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    } else {
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
};

mongoose.connect(generateMongoUrl(mongoSettings));

app.options('*', cors(corsOptions));

app.get('/', function(req, res) {
    return res.redirect('/knockback');
});

var BookSchema = new Schema({
    title: String,
    description: String,
    author: String,
    pagesCount: Number,
    image: String
});

BookSchema.methods.toBackbone = function() {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
};

var Book = mongoose.model('Book', BookSchema);

app.get('/api/v1/books', function(req, res) {
    Book.find(function(err, books) {
        res.send(books.map(function(book) {
            return book.toBackbone();
        }));
    });
});

app.get('/api/v1/books/:id', function(req, res) {
    Book.findById(req.params.id, function(err, book) {
        res.send(err || !book ? 404 : book.toBackbone());
    });
});

app.post('/api/v1/books', function(req, res) {
    var book = new Book(req.body);

    book.save(function(err, savedBook) {
        res.send(savedBook.toBackbone());
    });
});

app.put('/api/v1/books/:id', function(req, res) {
    Book.findByIdAndUpdate(req.params.id, req.body, function(err, book) {
        res.send(err ? 404 : book.toBackbone());
    });
});

app.del('/api/v1/books/:id', function(req, res) {
    Book.findByIdAndRemove(req.params.id, function(err) {
        res.send(err ? 404 : 204);
    });
});

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);
