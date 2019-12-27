<template>
  <div class="my-header">
    <!-- 左侧返回 -->
    <div class="header-button" v-show="isLeft">
      <i class="fa fa-chevron-left" />
      <button @click="$router.go(-1)">返回</button>
    </div>
    <!-- 中间标题 -->
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  props: {
    title: String,
    isLeft: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.my-header {
  font-size: 16px;
  line-height: 1;
  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 54px;
  padding: 0 10px;
  color: #ffffff;
  background-color: #009eef;
}

.header-button {
  position: absolute;
  left: 10px;
}

.header-button button {
  font-size: inherit;
  display: inline-block;
  margin-left: 3px;
  padding: 0;
  color: inherit;
  border: 0;
  outline: none;
  background-color: transparent;
  box-shadow: none;
}
</style>
