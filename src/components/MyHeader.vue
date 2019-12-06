<template>
  <div class="header">
    <!-- 左侧返回 -->
    <div class="header-button is-left" v-show="isLeft">
      <i class="fa fa-chevron-left" />
      <button @click="$router.go(-1)">返回</button>
    </div>
    <!-- 中间标题 -->
    <h1 class="header-title">{{title}}</h1>
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
  .header {
    font-size: 16px;
    line-height: 1;
    position: fixed;
    z-index: 99;
    top: 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    padding: 0 10px;
    text-align: center;
    white-space: nowrap;
    color: #ffffff;
    background-color: #009eef;
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

  .header-title {
    flex: 1;
  }

  .is-left {
    text-align: left;
  }
</style>
