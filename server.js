var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var mockup = require('./mockup')

var app = new (require('express'))()
module.exports=app;
var port = 8080

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
  console.log(req,res)
})

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==>🍬🍬🍬🍬Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

mockup()
// app.route('/book')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
