const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
  res.writeHead(200, {
        'Content-Type': 'text/html'
    });

  fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(3000, function() {
  console.log('server started')
});