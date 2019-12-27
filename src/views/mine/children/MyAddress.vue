<template>
  <div class="myAddress">
    <my-header :is-left="true" title="我的地址" />
    <!-- 新增收货地址 -->
    <div class="address-view-bottom" @click="addAddress">
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
    return {};
  },
  methods: {
    addAddress() {
      this.$router.push("/addAddress");
    }
  },
  components: { MyHeader }
};
</script>

<style scoped>
.myAddress {
  width: 100%;
  height: 100%;
  padding-top: 54px;
}

.address-view-bottom {
  position: fixed;
  height: 50px;
  bottom: 0;
  width: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #dddddd;
  color: #3190e8;
  font-size: 16px;
}

.address-view-bottom > i {
  font-size: 30px;
  margin-right: 8px;
}

.address-view {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 13.866667vw;
}

.address-card {
  background-color: #ffffff;
  padding: 4vw;
  border-bottom: 1px solid #dddddd;
  display: flex;
  min-height: 18.133333vw;
}

.address-card-body {
  flex: 1;
  overflow: hidden;
}

.address-card-title {
  font-size: 1rem;
  color: #666666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 1.066667vw;
}

.address-card-title .username {
  color: #333333;
  font-weight: 700;
}

.address-card-title .gender {
  padding: 0 1.6vw 0 0.8vw;
}

.address-card-address {
  color: #666666;
  font-size: 0.84rem;
  display: flex;
  align-items: center;
}

.address-card-address .tag {
  display: inline-block;
  position: relative;
  margin-right: 0.8vw;
  padding: 0.533333vw;
  color: #ff5722;
  white-space: nowrap;
  border: 1px solid #ff5722;
  border-radius: 0.133333vw;
  font-size: 0.6rem !important;
  line-height: 2.666667vw;
}

.address-text {
  line-height: 4.533333vw;
}

/* 编辑和删除 */
.address-card-edit {
  flex-basis: 13.066667vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.address-card-edit > i {
  color: #aaaaaa;
  font-size: 1.2rem;
}

/* 选中图标 */
.address-card-select {
  flex-basis: 7.333333vw;
  min-width: 7.333333vw;
  display: flex;
  align-items: center;
}

.address-card-select > i {
  font-size: 1.5rem;
  color: #4cd964;
}
</style>
