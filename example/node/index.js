const http = require('http');
const sudoku = require("js-sudoku");

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  const list = sudoku.gen({ mask: false, gzip: true, level: sudoku.Level.HIGH });
  // 发送响应数据 "Hello World"
  response.end(list);
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://localhost:8888/');
