const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  // 配置代理服务器
  devServer: {
    proxy: {
      '/request': {
        target: 'http://103.151.217.147:8080',
        pathRewrite: { '^/request': '' },
        ws: true,
        changeOrigin: true
      },
    }
  }
})