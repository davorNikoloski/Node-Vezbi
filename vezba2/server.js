const http = require('http');
var fs = require('fs');

const server = http.createServer(function (req, res) {
  fs.readFile('test.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);

    fs.readFile('pic.jpg', function(err, imageData) {
        if (err) throw err;
        res.write("<img src='data:image/jpeg;base64," +
        Buffer.from(imageData).toString('base64') + "'/>");

    return res.end();
    });
  });
}).listen(8080, () => {
  console.log('Server running on port 8080');
});

server.on('error', (err) => {
  console.error(`Server error: ${err}`);
});