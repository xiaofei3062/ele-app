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
  },
  // 打包后生成html的引号
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].minify = false;
      return args;
    });
  },
  configureWebpack: {
    // 配置路径别名
    resolve: {
      alias: {
        assets: "@/assets"
      }
    }
  }
};
