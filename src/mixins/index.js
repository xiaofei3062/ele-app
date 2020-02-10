import { mapActions } from "vuex";

// 定位混入
export const mapMixins = {
  created() {
    this.getLocation();
  },
  methods: {
    // 使用vuex辅助函数
    ...mapActions(["setLocation", "setAddress"]),
    getLocation() {
      const that = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // 精准定位
          console.log(data);
          // 调用vuex辅助函数
          that.setLocation(data);
          that.setAddress(data.formattedAddress);
        }

        function onError(err) {
          // 调用IP定位
          that.getLngLatLocation();
        }
      });
    },
    // IP定位
    getLngLatLocation() {
      const that = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            // console.log(result);

            // 逆向地理编码
            AMap.plugin("AMap.Geocoder", function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              });

              var lnglat = result.rectangle.split(";")[0].split(",");

              geocoder.getAddress(lnglat, function(status, data) {
                if (status === "complete" && data.info === "OK") {
                  // data为对应的地理位置详细信息
                  console.log(data);
                  // 调用vuex的辅助函数
                  that.setLocation({
                    addressComponent: {
                      city: result.city,
                      province: result.province
                    },
                    formattedAddress: data.regeocode.formattedAddress
                  });
                  that.setAddress(data.regeocode.formattedAddress);
                }
              });
            });
          }
        });
      });
    }
  }
};

// 订单混入
export const orderMixins = {
  methods: {
    // 获取缓存中的orderInfo
    setOrderInfo() {
      const orderList = sessionStorage.getItem("orderList");
      if (!orderList) return this.$router.replace("/shop/goods");
      const order = JSON.parse(orderList);
      // 给orderInfo更新数据
      this.orderInfo = order.orderInfo;
      // 获取总价 总价加上配送费
      if (this.orderInfo.shopInfo.float_delivery_fee) {
        this.totalPrice = order.totalPrice + this.orderInfo.shopInfo.float_delivery_fee;
      } else {
        // 没有配送费直接显示总价
        this.totalPrice = order.totalPrice;
      }
    }
  }
};
