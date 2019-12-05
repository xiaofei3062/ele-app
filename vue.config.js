module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  devServer: {
    // 配置跨域
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "https://ele-interface.herokuapp.com/api/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
