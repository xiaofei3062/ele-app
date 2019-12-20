<template>
  <div>
    <van-tabs color="#009eef" sticky title-active-color="#009eef" v-model="active">
      <van-tab :key="index" :title="item.name" :to="item.url" v-for="(item,index) in titleList" />
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
    data() {
      return {
        active: 0
      };
    },
    methods: {
      titleClick(index) {
        console.log(index);
      }
    }
  };
</script>

<style scoped>

</style>
