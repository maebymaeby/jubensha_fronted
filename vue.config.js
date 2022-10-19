const webpack = require("webpack");

module.exports = {
  // runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ],
  },
  chainWebpack(config) {
    // 修改htmlWebpackPlugin
    config.plugin('html').tap(args => {
      args[0].title = 'Jubensha_Web';
      return args;
    })
  },
  publicPath: '/',
}