const proxy = require('http-proxy-middleware');
// module.exports = {
//   '/api': {
//     changeOrigin: true,
//     target: 'http://localhost:8080',
//     secure: false
//   },
// }
module.exports = function (app) {
  // ...
  app.use(proxy('/api', {
    target: 'http://localhost:8080/',
    pathRewrite: { '/api': '' },
    changeOrigin: true
  }));
};
