var webpack = require('webpack')
var colors = require("colors")
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var app = new (require('express'))()
var fs = require('fs');
var path = require('path');

var port = 8080


var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
  console.log(req, res)
})

app.use(function (request, response, next) {
  var API = ['/error', 'true'];
  setTimeout(function() {
     console.log( matchDataSource())
  }, 1000);

  // if(API.includes(request.url)){
  //   console.log('match success')
  // }
  
  
  if (request.url === "/error") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the homepage!\n");
  } else {
    next();
  }
});

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==>🍬🍬🍬🍬Listening on port %s. Open up http://localhost:%s/ in your browser.".green, port, port)
  }
})

function matchDataSource() {
  return fs.readdir(__dirname + '/src/mockup/', function (err, files) {
    if (err) {
      console.error(err);
      return;
    } else {
       apiMap = files.map(function (file) {
        var filePath = path.normalize(__dirname + '/src/mockup/' + file);
        var relativePath = `.${filePath.replace(__dirname, '')}`;//relative path
        var data = require(relativePath)();
        fs.stat(filePath, function (err, stat) {
          var relativePath = filePath
          if (stat.isFile()) {
            //console.log(filePath.yellow + ' is: ' + 'file');
          }
          if (stat.isDirectory()) {
            //console.log(filePath + ' is: ' + 'dir');
          }
        });
        return relativePath.replace('./src/mockup','');
      });   
      return apiMap;
    }    
  });
}


