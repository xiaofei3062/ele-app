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
        @click="addOrder"
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
import { orderMixins } from "@/mixins";

export default {
  name: "Pay",
  data() {
    return {
      countDown: "00:15:00",
      orderInfo: {},
      totalPrice: 0,
      // 按钮禁用
      timerOut: false,
      timer: null
    };
  },
  mixins: [orderMixins],
  methods: {
    // 倒计时
    countTimeDown() {
      let minute = 15;
      let second = 0;
      this.timer = setInterval(() => {
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
          clearInterval(this.timer);
        }
      }, 1000);
    },
    // 支付并且添加订单
    addOrder() {
      const order = sessionStorage.getItem("orderList");
      if (!order) return this.$router.replace("/shop");
      const newOrder = JSON.parse(order);
      // 修改价格
      newOrder.totalPrice = this.totalPrice;
      // 增加订单时间
      newOrder.time = new Date().getTime();
      // 将临时存储的数据push到永久存储中
      const orderList = localStorage.getItem("newOrderList");
      const newOrderList = JSON.parse(orderList) || [];
      newOrderList.push(newOrder);
      localStorage.setItem("newOrderList", JSON.stringify(newOrderList));
      this.timerOut = true;
      this.$notify({
        type: "success",
        message: "支付成功,正在跳转至订单页",
        duration: 2000,
        onClose: () => {
          this.$router.push("/order");
          this.timerOut = false;
        }
      });
    }
  },
  activated() {
    // 每次进来都更新orderInfo数据
    this.setOrderInfo();
  },
  created() {
    // 调用倒计时
    this.countTimeDown();
  },
  deactivated() {
    clearInterval(this.timer);
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
