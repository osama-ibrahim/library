var http = require('http');

var app = {
    method: function(method, cb) {
    },
    get: function(cb) {

    }
};

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.end(JSON.stringify({}));
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
