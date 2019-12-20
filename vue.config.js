module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  devServer: {
    // 配置跨域
    proxy: {
      "/api": {
        target: "https://ele-interface.herokuapp.com",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  }
};
