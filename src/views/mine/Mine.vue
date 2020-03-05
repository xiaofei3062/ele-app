<template>
  <div class="me">
    <!-- 登录信息 -->
    <div class="headInfo">
      <div class="head-img"></div>
      <div class="head-profile">
        <p class="user-id" v-if="userInfo._id">
          {{ userInfo._id ? "尤万三" : "未登录" }}
        </p>
        <p @click="handleLogin" class="user-id" v-else>登录/注册</p>
        <p class="user-phone">
          <i class="fa fa-mobile" />
          <span v-if="userInfo.phone">{{ userInfo.phone | filterPhone }}</span>
          <span @click="handleLogin" v-else>登录后享受更多特权</span>
        </p>
      </div>
      <i class="fa fa-angle-right" />
    </div>

    <!-- 退出登录 -->
    <template v-if="userInfo">
      <div @click="handleAddress" class="address-cell">
        <i class="fa fa-map-marker" />
        <span>我的地址</span>
        <i class="fa fa-angle-right" />
      </div>
      <van-button @click="handleOut" size="large">退出登录</van-button>
    </template>
  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.getData();
  },
  filters: {
    // 隐藏手机号中间四位
    filterPhone(phone) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
  },
  methods: {
    // 跳转到登录页
    handleLogin() {
      this.$router.replace("/login");
    },
    // 退出登录
    handleOut() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "您确定要退出登陆吗？"
        })
        .then(() => {
          localStorage.removeItem("ele_login");
          this.$notify({
            message: "退出登录成功",
            type: "success",
            duration: 2000,
            onClose: () => {
              this.$router.replace("/login");
            }
          });
        })
        .catch(err => err);
    },
    // 跳转至我的地址
    handleAddress() {
      this.$router.push("/myAddress");
    },
    getData() {
      this.$toast.loading({
        forbidClick: true,
        message: "加载中..."
      });
      const userId = localStorage.getItem("ele_login");
      axios
        .get("/api/user/user_info/" + userId)
        .then(res => {
          // console.log(res);
          this.$toast.clear();
          this.userInfo = res;
        })
        .catch(err => err);
    }
  }
};
</script>

<style scoped>
.me {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

.headInfo {
  display: flex;
  align-items: center;
  padding: 20px 15px;
  color: #ffffff;
  background-image: linear-gradient(90deg, #00aaff, #0085ff);
}

.head-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: url("~assets/user.png");
  background-position: 0 0;
  background-size: 60px;
}

.head-profile {
  overflow: hidden;
  flex-grow: 1;
  margin-left: 20px;
}

.head-profile .user-id {
  font-size: 18px;
  font-weight: 700;
  display: flex;
  overflow: hidden;
  align-items: center;
  max-width: 220px;
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.head-profile .user-phone {
  font-size: 16px;
  display: flex;
  align-items: center;
}

.user-phone > i {
  font-size: 24px;
  display: inline-block;
  margin-right: 6px;
}

.headInfo > i {
  font-size: 30px;
}

.address-cell {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  padding-right: 15px;
  padding-left: 15px;
  color: #666666;
  border-bottom: 1px solid #eeeeee;
  background: #ffffff;
}

.address-cell i:first-child {
  font-size: 24px;
  display: inline-block;
  margin-right: 6px;
  color: rgb(74, 165, 240);
}

.address-cell span {
  font-size: 16px;
  display: inline-block;
}

.address-cell i:last-child {
  font-size: 30px;
  position: absolute;
  right: 15px;
  display: inline-block;
  color: #999999;
}

/deep/ .van-button__text {
  color: red;
}
</style>
