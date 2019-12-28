<template>
  <div class="settlement">
    <my-header @click="$router.go(-1)" :is-left="true" title="确认订单" />
    确认订单
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";

export default {
  name: "Settlement",
  components: { MyHeader }
};
</script>

<style scoped>
.settlement {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 54px;
}

.view-body {
  font-size: 0.9rem;
  display: flex;
  overflow: auto;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-right: 1.6vw;
  padding-bottom: 14.133333vw;
  padding-left: 1.6vw;
  color: #333333;
  background-image: linear-gradient(0deg, #f5f5f5, #f5f5f5 65%, hsla(0, 0%, 96%, 0.3) 75%, hsla(0, 0%, 96%, 0)),
    linear-gradient(270deg, #009eef, #009eef);
}

.cart-address {
  overflow: hidden;
  min-height: 22.133333vw;
  padding: 4.266667vw 2.133333vw 2.933333vw 2.133333vw;
  color: #ffffff;
  background-color: transparent;
}

.cart-address .title {
  font-size: 0.9rem;
  line-height: 1.21;
  color: hsla(0, 0%, 100%, 0.8);
}

.cart-address .address-detail {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.88;
  display: flex;
  overflow: hidden;
  align-items: center;
}

.address-detail > span {
  display: inline-block;
  overflow: hidden;
  max-width: calc(100% - 4vw);
  white-space: nowrap;
  text-overflow: ellipsis;
}

.address-detail > i {
  margin-left: 2.133333vw;
}

/* 显示送货地址 */
.address-name {
  font-size: 0.86rem;
  line-height: 1.21;
  margin-bottom: 1.333333vw;
}

.address-name .phone {
  margin-left: 2.133333vw;
}

.address-tag {
  font-size: 0.6rem !important;
  line-height: 2.666667vw;
  display: inline-block;
  margin-left: 1.6vw;
  padding: 0.533333vw;
  white-space: nowrap;
  border: 0.133334vw solid hsla(0, 0%, 100%, 0.8);
  border-radius: 0.133333vw;
}

.checkout-section {
  margin-bottom: 2.133333vw;
  padding: 0 5.333333vw;
  background: #ffffff;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
}

/* 底部支付样式 */
.action-bar {
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 11.733333vw;
  background: #3c3c3c;
}

.action-bar > span {
  font-size: 1.2rem;
  line-height: 11.733333vw;
  padding-left: 2.666667vw;
  vertical-align: middle;
  color: #ffffff;
}

.action-bar > button {
  font-size: 1.2rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  min-width: 28vw;
  padding: 0 1.333333vw;
  color: #ffffff;
  border: none;
  background: #00e067;
}
</style>
