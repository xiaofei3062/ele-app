<template>
  <div class="settlement">
    <my-header :is-left="true" @click="$router.go(-1)" title="确认订单" />

    <div class="view-body" v-if="isAddress">
      <!-- 收货地址 -->
      <div class="cart-address">
        <p class="title">
          订单配送至
          <span class="address-tag" v-if="userInfo.tag">{{ userInfo.tag }}</span>
        </p>
        <p
          @click="$router.push({ path: '/myAddress', query: { num: '2' } })"
          class="address-detail"
        >
          <span v-if="userInfo.address && userInfo.bottom">
            {{ userInfo.address }} {{ userInfo.bottom }}
          </span>
          <span v-else>选择收货地址</span>
          <i class="fa fa-angle-right" />
        </p>
        <h2 class="address-name" v-if="Object.keys(userInfo).length !== 0">
          <span>{{ userInfo.name }}</span>
          <span>({{ userInfo.sex }})</span>
          <span class="phone">{{ userInfo.phone }}</span>
        </h2>
      </div>

      <!-- 送达时间 -->
      <delivery :shop-info="orderInfo.shopInfo" />

      <!-- 点餐内容 -->
      <cart-group :order-info="orderInfo" :total-price="totalPrice" />

      <!-- 备注信息 -->
      <div class="checkout-section">
        <van-cell-group>
          <van-cell
            :value="remarkInfo.tableware || '未选择'"
            @click="showMenu = true"
            is-link
            title="餐具份数"
          />
          <van-cell
            :value="remarkInfo.remark || '备注/选填'"
            @click="isAddress = false"
            is-link
            title="订单备注"
          />
          <van-cell is-link title="发票信息" value="暂不支持开发票" />
        </van-cell-group>
      </div>
    </div>

    <!-- 弹出菜单 -->
    <van-action-sheet
      :actions="actions"
      @cancel="onCancel"
      @select="onSelect"
      cancel-text="取消"
      title="请选择餐具份数"
      v-model="showMenu"
    />
    <!-- 订单备注 -->
    <keep-alive>
      <remark v-if="!isAddress" />
    </keep-alive>

    <!-- 提交订单 -->
    <van-submit-bar
      :price="totalPrice * 100"
      @submit="onSubmit"
      button-text="提交订单"
      button-type="info"
      safe-area-inset-bottom
      text-align="left"
      v-if="isAddress"
    />
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import Delivery from "./Delivery";
import CartGroup from "./CartGroup";
import Remark from "./Remark";
import { orderMixins } from "@/mixins";
import { Toast } from "vant";

export default {
  name: "Settlement",
  data() {
    return {
      orderInfo: {},
      totalPrice: 0,
      // 订单对象
      remarkInfo: {
        tableware: "",
        remark: ""
      },
      isAddress: true,
      // 菜单显示
      showMenu: false,
      // 菜单数据
      actions: [
        { name: "1份" },
        { name: "2份" },
        { name: "3份" },
        { name: "4份" },
        { name: "5份" },
        { name: "6份" }
      ]
    };
  },
  computed: {
    userInfo() {
      const address = this.$route.query.address;
      // 这边首先将字符串解码,在转换成对象
      if (address) return JSON.parse(decodeURIComponent(address));
      return {};
    }
  },
  mixins: [orderMixins],
  methods: {
    // 取消菜单
    onCancel() {
      this.showMenu = false;
    },
    // 选择菜单
    onSelect(item) {
      this.remarkInfo.tableware = item.name;
      this.showMenu = false;
    },
    // 提交订单
    onSubmit() {
      const address = this.$route.query.address;
      if (!address) return Toast("请选择收货地址");
      if (!this.remarkInfo.tableware) return Toast("请选择餐具份数");
      this.$router.push("/pay");
    }
  },
  activated() {
    // 每次进来都更新orderInfo数据
    this.setOrderInfo();
  },
  components: { Remark, CartGroup, Delivery, MyHeader }
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
  font-size: 14px;
  display: flex;
  overflow: auto;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 104px);
  padding: 0 15px;
  color: #333333;
  background-image: linear-gradient(
      0deg,
      #f5f5f5,
      #f5f5f5 65%,
      hsla(0, 0%, 96%, 0.3) 75%,
      hsla(0, 0%, 96%, 0)
    ),
    linear-gradient(270deg, #009eef, #009eef);
}

.cart-address {
  overflow: hidden;
  min-height: 90px;
  padding: 10px 15px;
  color: #ffffff;
  background-color: transparent;
}

.cart-address .title {
  font-size: 14px;
  line-height: 1.21;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: hsla(0, 0%, 100%, 0.8);
}

.cart-address .address-detail {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  overflow: hidden;
  align-items: center;
}

.address-detail > span {
  display: inline-block;
  overflow: hidden;
  max-width: 300px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.address-detail > i {
  font-size: 24px;
  display: inline-block;
  margin-left: 8px;
}

.checkout-section {
  margin-bottom: 10px;
  background: #ffffff;
}

/* 显示送货地址 */
.address-name {
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
  margin-bottom: 10px;
}

.address-name .phone {
  margin-left: 10px;
}

.address-tag {
  font-size: 12px !important;
  display: inline-block;
  margin-left: 8px;
  padding: 2px 4px;
  white-space: nowrap;
  border: 1px solid hsla(0, 0%, 100%, 0.8);
  border-radius: 3px;
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
