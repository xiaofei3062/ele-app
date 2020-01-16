<template>
  <div class="checkout-section">
    <div class="delivery" v-if="Object.keys(shopInfo).length !== 0">
      <div class="deliver-left">
        <span class="delivery-time">送达时间</span>
        <div class="delivery-extra">
          <span>{{ shopInfo.delivery_mode.text }}</span>
        </div>
      </div>
      <div class="delivery-right">
        <span class="delivery-select">
          尽快送达 ({{ deliveryTime(shopInfo.order_lead_time) }}) 送达
        </span>
        <i class="fa fa-angle-right" />
      </div>
    </div>
    <div class="cart-item">
      <div class="cart-item-title">支付方式</div>
      <div class="pay-text">在线支付</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Delivery",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    // 设置外卖送达时间
    deliveryTime(time) {
      const date = new Date();
      date.setMinutes(date.getMinutes() + time);
      return (
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
      );
    }
  }
};
</script>

<style scoped>
.checkout-section {
  margin-bottom: 10px;
  padding: 0 15px;
  background: #ffffff;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
}

.delivery {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dotted #cccccc;
}

.delivery-left {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.delivery-time {
  font-size: 14px;
  font-weight: 500;
}

.delivery-extra {
  font-size: 12px;
  margin-top: 6px;
}

.delivery-extra > span {
  line-height: 1;
  display: inline-block;
  padding: 3px 4px;
  word-spacing: 0.666667vw;
  color: #ffffff;
  background-image: linear-gradient(90deg, #00aaff, #0085ff);
}

.delivery-right {
  display: flex;
  align-items: center;
  text-align: right;
}

.delivery-select {
  text-align: right;
  color: #2395ff;
}

.delivery-right > i {
  font-size: 20px;
  margin-left: 5px;
  color: #2395ff;
}

.cart-item {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4.266667vw 0 5.333333vw 0;
  color: #333333;
}

.cart-item .cart-item-title {
  font-weight: 500;
}

.pay-text {
  color: #2395ff;
}
</style>
