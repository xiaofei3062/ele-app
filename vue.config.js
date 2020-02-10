module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  // devServer: {
  //   proxy: {
  //     // 配置跨域
  //     "/api": {
  //       target: "http://127.0.0.1:5000",
  //       ws: true,
  //       changOrigin: true,
  //       pathRewrite: {
  //         "^/api": "/api"
  //       }
  //     }
  //   }
  // },
  chainWebpack: config => {
    // 发布阶段打包入口
    config.when(process.env.NODE_ENV === "production", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-prod.js");

      // 配置cdn依赖
      config.set("externals", {
        vue: "Vue",
        "mint-ui": "MINT",
        "better-scroll": "BScroll",
        vant: "vant"
      });

      // 是否发布模式,是
      config.plugin("html").tap(args => {
        args[0].isProd = true;
        return args;
      });
    });
    // 开发阶段打包入口
    config.when(process.env.NODE_ENV === "development", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-dev.js");
      // 是否发布模式,否
      config.plugin("html").tap(args => {
        args[0].isProd = false;
        return args;
      });
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
