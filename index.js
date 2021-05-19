var http = require('http'),
  connect = require('connect'),
  httpProxy = require('http-proxy'),
  harmon = require('harmon');

const target = process.argv[2];

var selects = [
  {
    query: 'head',
    func: node => {
      console.log('in head')
    }
  },
  {
    query: 'body',
    func: node => {
      console.log('in body')
    }
  },
];


var app = connect();
var proxy = httpProxy.createProxyServer({
  target,
  secure: false, // bypass SSL validation
  changeOrigin: true, // changes the host header to the target host
});

app.use(harmon([], selects));

app.use(function (req, res) {
  proxy.web(req, res);
});

http.createServer(app).listen(8000);

