<template>
  <div class="swiper-list">
    <van-swipe :autoplay="4000" indicator-color="#009eef">
      <van-swipe-item :key="index" v-for="(item, index) in swiperList">
        <img :src="item" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "MySwiper",
  props: {
    swiperList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.swiper-list /deep/ .van-swipe__indicator {
  width: 10px;
  height: 10px;
  opacity: 1;
  border-radius: 100%;
  background-color: #ffffff;
}

.swiper-list {
  width: 100%;
}

.swiper-list img {
  width: 100%;
}
</style>
