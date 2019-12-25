module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  devServer: {
    // 配置跨域
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  }
};
