<template>
  <div class="swiper-list">
    <van-swipe :autoplay="4000">
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
  opacity: 0.8;
  background-color: #ffffff;
}

.swiper-list /deep/ .van-swipe__indicator--active {
  background-color: #009eef;
}

.swiper-list {
  width: 100%;
  height: 130px;
}

.swiper-list img {
  width: 100%;
  height: 130px;
}
</style>
