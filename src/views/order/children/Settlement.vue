<template>
  <div class="settlement">
    <my-header :is-left="true" @click="$router.go(-1)" title="确认订单" />

    <!--  -->
    <div class="view-body">
      <div>
        <div class="cart-address">
          <p class="title">
            订单配送至
            <span class="address-tag" v-if="userInfo && userInfo.tag">{{ userInfo.tag }}</span>
          </p>
          <p @click="$router.push('/myAddress')" class="address-detail" v-if="isAddress">
            <span v-if="userInfo">{{ userInfo.address }} {{ userInfo.bottom }}</span>
            <span v-else>选择收货地址</span>
            <i class="fa fa-angle-right" />
          </p>
          <p @click="$router.push('/addAddress')" class="address-detail" v-else>
            <span>新增收货地址</span>
            <i class="fa fa-angle-right" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";

export default {
  name: "Settlement",
  data() {
    return {
      isAddress: false
    };
  },
  computed: {
    userInfo() {
      const address = this.$route.query.address;
      if (address) {
        // 这边首先将字符串解码,在转换成对象
        return JSON.parse(decodeURIComponent(address));
      }
    }
  },
  methods: {
    getData() {
      axios.get(`/api/user/user_info/${localStorage.ele_login}`).then(res => {
        console.log(res);
        if (res.myAddress.length > 0) {
          return (this.isAddress = true);
        }
        return (this.isAddress = false);
      });
    }
  },
  activated() {
    this.getData();
  },
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
  font-size: 14px;
  display: flex;
  overflow: auto;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  color: #333333;
  background-image: linear-gradient(0deg, #f5f5f5, #f5f5f5 65%, hsla(0, 0%, 96%, 0.3) 75%, hsla(0, 0%, 96%, 0)),
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

/* 显示送货地址 */
.address-name {
  font-size: 14px;
  line-height: 1.21;
  margin-bottom: 1.333333vw;
}

.address-name .phone {
  margin-left: 2.133333vw;
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
