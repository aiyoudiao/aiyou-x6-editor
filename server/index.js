const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

//serve static files, 'public/index.html' will be served as '/'
app.use(express.static('public'));

// normal express.js handler for HTTP GET
// app.get('/hello', function(req, res, next){
//   res.send('hello');
// });

// websocket handler
app.ws('/websocket', function(ws, req) {
  console.log('请求成功')
  ws.send('aaa');
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});

app.listen(9999);