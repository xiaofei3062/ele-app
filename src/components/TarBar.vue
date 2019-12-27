<template>
  <div class="tab-bar">
    <van-tabbar :z-index="100" active-color="#009eef" route>
      <van-tabbar-item icon="wap-home" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="bill" replace to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="manager" replace to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TarBar"
};
</script>

<style scoped>
.tab-bar {
  width: 100%;
}

/deep/ .van-tabbar-item__text {
  font-size: 13px;
}

/deep/ .van-tabbar-item__icon {
  font-size: 22px;
}
</style>
