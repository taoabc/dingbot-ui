const exp = require('./exp');

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? `/${exp.staticRrefix()}/` : '/',
  pwa: {
    manifestOptions: {
      icons: []
    },
    name: 'Dingbot',
    iconPaths: {
      favicon32: '',
      favicon16: '',
      appleTouchIcon: '',
      maskIcon: '',
      msTileImage: ''
    }
  }
};
