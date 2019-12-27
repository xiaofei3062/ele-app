<template>
  <div class="area" ref="area_scroll" v-if="cityInfo">
    <div class="scroll_wrap">
      <!-- 热门城市 -->
      <div class="hot_wrap citylist">
        <div class="title">热门城市</div>
        <ul class="hot_city">
          <li :key="index" @tap="$emit('selectCity', item)" v-for="(item, index) in cityInfo.hotCities">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 所有城市 -->
      <div class="city_wrap" style="padding-bottom: 0.53333rem">
        <!-- 循环按字母排序的key -->
        <div :key="index" class="city_content citylist" v-for="(item, index) in keys">
          <div class="title">{{ item }}</div>
          <!-- 根据字母key展示城市名 -->
          <ul>
            <li :key="index" @tap="$emit('selectCity', city)" v-for="(city, index) in cityInfo[item]">
              {{ city.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="area_keys">
      <ul>
        <li @tap="selectKey(0)">#</li>
        <li :key="index" @tap="selectKey(index + 1)" v-for="(item, index) in keys">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "AlphaBet",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    cityInfo: {
      type: Object,
      defaults() {
        return {};
      }
    },
    keys: {
      type: Array,
      defaults() {
        return [];
      }
    }
  },
  methods: {
    initScroll() {
      this.scroll = new BScroll(this.$refs.area_scroll, {
        tap: true
      });
    },
    selectKey(index) {
      const citylist = this.$refs.area_scroll.getElementsByClassName("citylist");
      // 根据下标,滚动到相对应的元素上
      this.scroll.scrollToElement(citylist[index], 250);
    }
  }
};
</script>

<style scoped>
.area {
  overflow: hidden;
  box-sizing: border-box;
  height: calc(100vh - 174px);
  margin-top: 10px;
  padding: 0 16px;
  background: #ffffff;
}

.scroll_wrap {
  overflow: hidden;
  background: #ffffff;
}

.title {
  padding: 15px 0;
  color: #aaaaaa;
}

.hot_city {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 16px;
}

.hot_city li {
  box-sizing: border-box;
  width: 30%;
  margin: 0 10px 10px 0;
  padding: 10px;
  text-align: center;
  background: #f1f1f1;
}

.city_content li {
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
}

.area_keys {
  font-size: 12px;
  line-height: 1.4;
  position: fixed;
  top: 25%;
  right: 0;
  padding: 0 5px;
  text-align: center;
  color: #aaaaaa;
}
</style>
