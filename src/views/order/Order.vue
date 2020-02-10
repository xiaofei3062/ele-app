<template>
  <div class="order">
    <div
      :key="index"
      class="order-card-body"
      v-for="(order, index) in newOrderList"
      v-if="newOrderList.length > 0"
    >
      <div class="order-card-wrap" v-if="order.orderInfo">
        <img :src="order.orderInfo.shopInfo.image_path" alt />
        <div class="order-card-content">
          <div class="order-card-head">
            <div class="title">
              <a>
                <span>{{ order.orderInfo.shopInfo.name }}</span>
                <i class="fa fa-angle-right"></i>
              </a>
              <p>订单已完成</p>
            </div>
            <p class="date-time">{{ order.time | filterTime }}</p>
          </div>
          <div
            :key="index2"
            :style="{ 'padding-top': index2 === 0 ? '10px' : '' }"
            class="order-card-detail"
            v-for="(item, index2) in order.orderInfo.selectFoods"
          >
            <p class="detail">{{ item.name }} X {{ item.count }}</p>
            <p class="price">¥{{ item.activity.fixed_price }}</p>
          </div>
          <div class="peisong-price" v-if="order.orderInfo.shopInfo.float_delivery_fee">
            配送费：¥{{ order.orderInfo.shopInfo.float_delivery_fee }}
          </div>
        </div>
      </div>
      <div class="total-price">总计：¥{{ order.totalPrice }}</div>
      <div class="order-card-bottom">
        <van-button @click="$router.push('/shop')" plain size="small" type="info">
          再来一单
        </van-button>
      </div>
    </div>
    <div class="order-empty" v-if="newOrderList.length === 0">
      <img alt="" src="../../assets/empty.png" />
      <p>暂无订单</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      newOrderList: []
    };
  },
  activated() {
    this.getOrderInfo();
  },
  filters: {
    filterTime(val) {
      const date = new Date(val);
      // 年月日
      const y = date.getFullYear();
      const m = (date.getMonth() + 1 + "").padStart(2, "0");
      const d = (date.getDate() + "").padStart(2, "0");
      // 时分秒
      const hh = (date.getHours() + "").padStart(2, "0");
      const mm = (date.getMinutes() + "").padStart(2, "0");
      const ss = (date.getSeconds() + "").padStart(2, "0");
      // 返回时间格式
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
  },
  methods: {
    getOrderInfo() {
      const orderList = localStorage.getItem("newOrderList");
      const newOrderList = JSON.parse(orderList) || [];
      console.log(newOrderList);
      this.newOrderList = newOrderList;
    }
  }
};
</script>

<style scoped>
.order {
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 20px 10px;
}

.order-card-body {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffffff;
}

.order-card-body:last-child {
  margin-bottom: 0;
}

.order-card-wrap {
  display: flex;
}

.order-card-wrap > img {
  width: 70px;
  height: 70px;
  margin-right: 10px;
  border: 1px solid #eeeeee;
}

.order-card-content {
  flex: 1;
}

.peisong-price {
  padding-bottom: 10px;
}

.order-card-head {
  padding-right: 3px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
}

.order-card-head .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
}

.order-card-head .title > a {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333333;
}

.order-card-head .title > a > span {
  display: inline-block;
  overflow: hidden;
  max-width: 160px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.order-card-head .title > a > i {
  font-size: 22px;
  color: #333333;
}

.order-card-head .title > p {
  font-size: 14px;
  overflow: hidden;
  max-width: 14em;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333333;
}

.date-time {
  font-size: 14px;
  color: #999999;
}

.order-card-detail {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}

.order-card-detail .detail {
  display: flex;
  align-items: center;
  color: #666666;
}

.order-card-detail .price {
  text-align: right;
  color: #333333;
}

.total-price {
  font-size: 15px;
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: right;
  color: #333333;
  border-top: 1px solid #eeeeee;
}

.order-card-bottom {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid #eeeeee;
}

/* 暂无订单 */
.order-empty {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.order-empty img {
  display: block;
  width: 300px;
}

.order-empty p {
  font-size: 30px;
  font-weight: 600;
  margin-top: 30px;
  color: #00aaff;
}
</style>
