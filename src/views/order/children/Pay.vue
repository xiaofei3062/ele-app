<template>
  <div class="pay">
    <!-- 头部 -->
    <my-header :is-left="true" @click="$router.go(-1)" title="在线支付" />

    <div class="main">
      <div class="tip">
        <p class="countdown-title">支付剩余时间</p>
        <h3 class="countdown-text">{{ countDown }}</h3>
      </div>
      <section class="home">
        <ul class="list info-list">
          <li>
            <span class="order-name" v-if="Object.keys(orderInfo).length !== 0">
              {{ orderInfo.shopInfo.name }}
            </span>
            <span class="text-highlight">¥{{ totalPrice }}</span>
          </li>
        </ul>
        <div class="title">在线支付</div>
        <ul class="list payment-list">
          <li class="payment-list-item">
            <div class="icon">
              <img alt src="@/assets/wechart.jpg" />
              <span>微信</span>
            </div>
            <i class="fa fa-check-circle selected" />
          </li>
        </ul>
      </section>
      <van-button
        :disabled="timerOut"
        @click="pay"
        class="pay-btn"
        round
        size="large"
        type="primary"
      >
        确认支付
      </van-button>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";

export default {
  name: "Pay",
  data() {
    return {
      countDown: "00:15:00",
      orderInfo: {},
      totalPrice: 0,
      // 按钮禁用
      timerOut: false
    };
  },
  methods: {
    // 获取缓存中的orderInfo
    setOrderInfo() {
      const orderInfo = sessionStorage.getItem("orderInfo");
      if (orderInfo) {
        // 给orderInfo更新数据
        this.orderInfo = JSON.parse(orderInfo);
        // 获取总价 总价加上配送费
        if (this.orderInfo.shopInfo.float_delivery_fee) {
          this.totalPrice = this.orderInfo.totalPrice + this.orderInfo.shopInfo.float_delivery_fee;
        } else {
          // 没有配送费直接显示总价
          this.totalPrice = this.orderInfo.totalPrice;
        }
      } else {
        this.$router.replace("/shop/goods");
      }
    },
    // 倒计时
    countTimeDown() {
      let minute = 15;
      let second = 0;
      let timer = setInterval(() => {
        second--;
        if (second < 0) {
          second = 59;
          minute--;
          if (minute < 10) {
            minute = "0" + minute;
          }
        }

        if (second < 10) {
          second = "0" + second;
        }

        this.countDown = "00" + ":" + minute + ":" + second;

        if (second <= 0 && minute <= 0) {
          this.countDown = "订单已超时";
          this.timerOut = true;
          clearInterval(timer);
        }
      }, 1000);
    },
    // 点击支付
    pay() {
      const data = {
        body: "米修在线",
        out_trade_no: new Date().getTime().toString(),
        total_fee: 1
      };
      alert("进入到pay方法中");
      // 请求 http://www.thenewstep.cn/wxzf/example/jsapi.php
      fetch("http://127.0.0.1/example/jsapi.php", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          this.onBridgeReady(data);
        })
        .catch(err => err);
    },
    onBridgeReady(data) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, res => {
        if (res.err_msg === "get_brand_wcpay_request:ok") {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          alert("支付成功");
          // 生成订单
          this.addOrder();
        }
      });
    },
    addOrder() {
      let orderlist = {
        orderInfo: this.orderInfo,
        userInfo: this.userInfo,
        totalPrice: this.totalPrice,
        remarkInfo: this.remarkInfo
      };
      // console.log(orderlist);
      axios.post(`/api/user/add_order/${localStorage.ele_login}`, orderlist).then(res => {
        console.log(res.data);
        this.$router.replace("/order");
      });
    }
  },
  activated() {
    // 每次进来都更新orderInfo数据
    this.setOrderInfo();
    // 调用倒计时
    this.countTimeDown();
  },
  components: { MyHeader }
};
</script>

<style scoped>
.pay {
  width: 100%;
  height: 100%;
  padding-top: 54px;
}

.main {
  overflow: auto;
  width: 100%;
  height: 100%;
}

.tip {
  display: block;
  padding: 15px;
  text-align: center;
  color: #333333;
  border-bottom: 1px solid #cccccc;
  background-color: #ffffff;
}

.countdown-title {
  font-size: 18px;
  margin-bottom: 15px;
  color: #666666;
}

.countdown-text {
  font-size: 30px;
  height: 30px;
  color: #333333;
}

.list {
  border-bottom: 1px solid #cccccc;
  background: #ffffff;
}

.info-list {
  padding: 0 20px;
}

.info-list li {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
}

.info-list li .order-name {
  display: inline-block;
  overflow: hidden;
  max-width: 60%;
  margin-right: 16px;
  vertical-align: bottom;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333333;
}

.text-highlight {
  color: #ff6000;
}

.title {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  color: #999999;
  background-color: #f5f5f5;
}

.payment-list-item {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #cccccc;
}

.icon {
  display: flex;
  align-items: center;
}

.payment-list-item img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

.payment-list-item > i {
  font-size: 20px;
  color: #eeeeee;
}

.selected {
  color: #4cd964 !important;
}

.pay-btn {
  display: block;
  width: 90%;
  margin: 30px auto;
}
</style>
