<template>
  <section class="checkout-section cart-group" v-if="Object.keys(orderInfo).length !== 0">
    <h3>{{ orderInfo.shopInfo.name }}</h3>
    <ul>
      <li :key="index" v-for="(food, index) in orderInfo.selectFoods">
        <img :src="food.image_path" alt />
        <div class="cart-group-info">
          <span>{{ food.name }}</span>
          <span>x{{ food.count }}</span>
          <span>¥{{ food.activity.fixed_price }}</span>
        </div>
      </li>
      <li class="cart-group-total" v-if="orderInfo.shopInfo.float_delivery_fee">
        <div>配送费</div>
        <div>¥{{ orderInfo.shopInfo.float_delivery_fee }}</div>
      </li>
      <li class="cart-group-total">
        <div class="discounts"></div>
        <div class="subtotal">
          <span>小计：</span>
          <span class="price">¥{{ totalPrice.toFixed(2) }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "CartGroup",
  props: {
    orderInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    totalPrice: {
      type: Number,
      default: 0
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

.cart-group > h3 {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  overflow: hidden;
  max-width: 290px;
  padding: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333333;
}

.cart-group > ul {
  font-size: 14px;
  margin-top: 10px;
  color: #333333;
}

.cart-group > ul > li {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  color: inherit;
  border-bottom: 1px dotted #cccccc;
}

.cart-group > ul > li > img {
  width: 38px;
  height: 38px;
}

.cart-group-info {
  display: flex;
  overflow: hidden;
  align-items: center;
  flex: 9;
  justify-content: space-between;
  margin-left: 10px;
}

.cart-group-info span:first-child {
  overflow: hidden;
  max-width: 150px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cart-group-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0 !important;
}

.discounts {
  color: #bbbbbb;
}

.subtotal .price {
  font-size: 18px;
  font-weight: 600;
  display: inline-block;
  color: #009eef;
}
</style>
