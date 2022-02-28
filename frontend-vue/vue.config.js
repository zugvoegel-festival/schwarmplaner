// vue.config.js

module.exports = {
  publicPath: process.env.BASE_URL || '/',
  configureWebpack: {
    devtool: 'source-map',
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  }
};
