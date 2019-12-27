<template>
  <div class="entries">
    <van-swipe :autoplay="0" style="height: 100%;">
      <van-swipe-item :key="i" class="entry_wrap" v-for="(entry, i) in entries">
        <div :key="index" @click="foodClick(item)" class="foodentry" v-for="(item, index) in entry">
          <div class="img_wrap">
            <img :src="item.image" alt />
          </div>
          <span>{{ item.name }}</span>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Entries",
  props: {
    entries: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    foodClick(item) {
      this.$toast(item.name);
    }
  }
};
</script>

<style scoped>
.entries {
  overflow: hidden;
  height: 180px;
  text-align: center;
  background: #ffffff;
}

.entries /deep/ .van-swipe__indicator {
  width: 10px;
  height: 10px;
  background-color: #666666;
}

.entries /deep/ .van-swipe__indicator--active {
  background-color: #009eef;
}

.foodentry {
  position: relative;
  float: left;
  width: 20%;
  margin-top: 10px;
}

.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 45px;
}

.img_wrap img {
  width: 100%;
  height: 100%;
}

.foodentry span {
  font-size: 13px;
  display: block;
  margin-top: 3px;
  color: #666666;
}
</style>
