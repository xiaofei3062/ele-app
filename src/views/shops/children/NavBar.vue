<template>
  <div class="nav-bar">
    <van-tabs color="#009eef" title-active-color="#009eef" v-model="active">
      <van-tab :key="index" :title="item.name" :to="item.url" v-for="(item, index) in titleList" />
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    titleList: {
      type: Array,
      default() {
        return [
          { name: "点餐", url: "/shop/goods" },
          { name: "评价", url: "/shop/comments" },
          { name: "商家", url: "/shop/seller" }
        ];
      }
    }
  },
  computed: {
    // 动态设置active
    active: {
      get() {
        for (let i = 0; i < this.titleList.length; i++) {
          if (this.titleList[i].url === this.$route.path) {
            return i;
          }
        }
      },
      set(val) {
        return val;
      }
    }
  }
};
</script>

<style scoped>
.nav-bar {
  width: 100%;
}
</style>
