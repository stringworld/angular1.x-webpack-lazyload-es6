/**
 * Webpack config for builds
 */
// module.exports = require('./webpack.make')({
//   BUILD: true,
//   TEST: false
// });


var webpack_make = require('./webpack.make');

module.exports = config_build;
var config_build = function () {
  webpack_make({
    BUILD: true,
    TEST: false,
    CDN: "cdn"
  })

}
