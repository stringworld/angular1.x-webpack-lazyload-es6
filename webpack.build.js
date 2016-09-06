/**
 * Webpack config for builds
 */
// module.exports = require('./webpack.make')({
//   BUILD: true,
//   TEST: false
// });
var webpack_make = require('./webpack.make');
var config_build=function(cdn){
 return webpack_make({
    BUILD: true,
    TEST: false,
    CDN:cdn
  });
}
module.exports = config_build;


