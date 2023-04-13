const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {

  fs.readFile('test.html', function(err, data) {
    if (err) throw err;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html><head><style>h1, p {font-family: Montserrat; text-align: center;}</style></head><body>');
    res.write('<h1 style="text-align: center; font-family: Montserrat;">My Motorcycle gallery </h1>');
    res.write('<p style="text-align: center; font-family: Montserrat;">Here are some pictures of my favorite motorcycles!</p>');
    res.write('<div style="display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 10px;">');

    let count = 0;
    for (let i = 1; i <= 4; i++) {
      fs.readFile(`pic${i}.jpg`, function(err, imageData) {
        if (err) throw err;
        if (i === 1) {
          res.write(`<img src='data:image/jpeg;base64,${Buffer.from(imageData).toString('base64')}' style='width: 100%; height: auto; object-fit: cover; margin-bottom: 10px;'/>`);
        } else {
          res.write(`<img src='data:image/jpeg;base64,${Buffer.from(imageData).toString('base64')}' style='width: 100%; height: auto; object-fit: cover;'/>`);
        }
        count++;
        if (count === 4) {
          res.write('</div>');
          res.end();
        }
      });
    }
  });
}).listen(8080, () => {
  console.log('Server running on port 8080');
});

server.on('error', (err) => {
  console.error(`Server error: ${err}`);
});