<template>
  <div class="myAddress">
    <my-header :is-left="true" @click="$router.go(-1)" title="我的地址" />

    <!-- 显示收货地址 -->
    <div class="address-view">
      <div :key="index" class="address-card" v-for="(address, index) in addressList">
        <div class="address-card-select">
          <i class="fa fa-check-circle" v-if="selectIndex === index" />
        </div>
        <div @click="selectAddress(address, index)" class="address-card-body">
          <p class="address-card-title">
            <span class="username">{{ address.name }}</span>
            <span class="gender" v-if="address.sex">{{ address.sex }}</span>
            <span class="phone">{{ address.phone }}</span>
          </p>
          <p class="address-card-address">
            <span class="address-text">{{ address.address }} {{ address.bottom }}</span>
          </p>
        </div>
        <div class="address-card-edit">
          <i @click="editAddress(address)" class="fa fa-edit" />
          <i @click="deleteAddress(address, index)" class="fa fa-close" />
        </div>
      </div>
    </div>

    <!-- 新增收货地址 -->
    <div @click="addAddress" class="address-view-bottom">
      <i class="fa fa-plus-circle" />
      <span>新增收货地址</span>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";

export default {
  name: "MyAddress",
  data() {
    return {
      addressList: [],
      isGetData: true,
      selectIndex: 0
    };
  },
  methods: {
    // 添加地址并清空传参数据
    addAddress() {
      this.$router.replace("/addAddress");
    },
    // 请求地址数据
    getAddressData() {
      this.$toast.loading({
        forbidClick: true,
        message: "加载中..."
      });
      axios
        .get("/api/user/user_info/" + localStorage.getItem("ele_login"))
        .then(res => {
          this.$toast.clear();
          this.addressList = res.myAddress;
        })
        .catch(err => err);
    },
    // 编辑地址
    editAddress(address) {
      this.$router.replace({
        path: "/addAddress",
        // 这边首先将对象转换成字符串,然后进行字符串编码
        query: { title: "修改地址", address: encodeURIComponent(JSON.stringify(address)) }
      });
    },
    // 删除地址
    deleteAddress(address, index) {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "您确定要删除该地址吗？"
        })
        .then(() => {
          axios
            .delete(`/api/user/address/${localStorage.ele_login}/${address._id}`)
            .then(res => {
              console.log(res);
              this.$toast({
                message: "删除地址成功",
                onClose: () => {
                  this.addressList.splice(index, 1);
                }
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          return false;
        });
    },
    // 选择地址
    selectAddress(addressObj, index) {
      this.selectIndex = index;
      const num = this.$route.query.num;
      // 只有从订单页跳过来,才可以跳转
      if (num) {
        this.$router.replace({
          path: "/settlement",
          // 这边首先将对象转换成字符串,然后进行字符串编码
          query: { address: encodeURIComponent(JSON.stringify(addressObj)) }
        });
      }
    }
  },
  components: { MyHeader },
  activated() {
    this.getAddressData();
  }
};
</script>

<style scoped>
.myAddress {
  width: 100%;
  height: 100%;
  padding-top: 54px;
}

.address-view-bottom {
  font-size: 16px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  color: #3190e8;
  border-top: 1px solid #dddddd;
  background: #ffffff;
}

.address-view-bottom > i {
  font-size: 30px;
  margin-right: 8px;
}

.address-view {
  overflow-y: auto;
  height: 100%;
  padding-bottom: 60px;
}

.address-card {
  display: flex;
  min-height: 60px;
  padding: 20px 15px;
  border-bottom: 1px solid #dddddd;
  background-color: #ffffff;
}

.address-card-body {
  overflow: hidden;
  flex: 1;
}

.address-card-title {
  font-size: 16px;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #666666;
}

.address-card-title .username {
  font-weight: 700;
  color: #333333;
}

.address-card-title .gender {
  font-size: 14px;
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
  padding: 4px;
  white-space: nowrap;
  color: #ff5722;
  border: 1px solid #ff5722;
  border-radius: 3px;
}

.address-card-address {
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #666666;
}

.address-text {
  line-height: 20px;
  max-width: 220px;
}

/* 编辑和删除 */
.address-card-edit {
  display: flex;
  align-items: center;
  flex-basis: 50px;
  justify-content: space-between;
}

.address-card-edit > i:first-child {
  font-size: 20px;
  display: inline-block;
  color: #aaaaaa;
}

.address-card-edit > i:last-child {
  font-size: 22px;
  display: inline-block;
  padding-bottom: 3px;
  color: #aaaaaa;
}

/* 选中图标 */
.address-card-select {
  display: flex;
  align-items: center;
  width: 30px;
}

.address-card-select > i {
  font-size: 20px;
  color: #4cd964;
}
</style>
