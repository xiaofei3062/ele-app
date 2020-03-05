<template>
  <div class="index-container">
    <div @click="$router.push('/shop')" class="index-shopInfo">
      <!-- 左侧图片 -->
      <div class="logo_container">
        <img :src="restaurant.image_path" alt="" />
      </div>
      <!-- 右侧内容 -->
      <div class="index_main">
        <!-- 第一行 品牌 -->
        <div class="index_shopname">
          <i v-if="restaurant.is_premium">品牌</i>
          <span>{{ restaurant.name }}</span>
        </div>
        <!-- 第二行 星级 -->
        <div class="index-rateWrap">
          <div>
            <rating :rating="restaurant.rating" />
            <span class="rate">{{ restaurant.rating }}</span>
            <span>月售{{ restaurant.recent_order_num }}单</span>
          </div>
          <div class="delivery" v-if="restaurant.delivery_mode">
            <span class="icon-hollow">{{ restaurant.delivery_mode.text }}</span>
          </div>
        </div>
        <!-- 第三行 配送 -->
        <div class="index-moneylimit">
          <div>
            <span>¥{{ restaurant.float_minimum_order_amount }}起送</span>
            |
            <span>配送费¥{{ restaurant.float_delivery_fee }}</span>
          </div>
          <div class="index-distanceWrap">
            <span>{{ (restaurant.distance / 1000).toFixed(2) }}km</span>
            |
            <span>{{ restaurant.order_lead_time }}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from "@/components/Rating";

export default {
  name: "IndexShop",
  components: { Rating },
  props: {
    restaurant: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.index-container {
  font-size: 14px;
  padding: 4vw 0;
  color: #666666;
  border-bottom: 1px solid #eeeeee;
  background: #ffffff;
}

.index-shopInfo {
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  padding: 0 2.666667vw;
}

.logo_container {
  width: 17.333333vw;
  height: 17.333333vw;
}

.logo_container img {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #dddddd;
}

.index_main {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10px;
}

.index_shopname {
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #333333;
}

.index_shopname i {
  font-size: 12px;
  font-style: normal;
  display: inline-block;
  margin-right: 1.333333vw;
  padding: 3px 4px;
  text-align: center;
  white-space: nowrap;
  background: #ffe800;
}

.index_shopname span {
  display: inline-block;
  overflow: hidden;
  max-width: 240px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.index-rateWrap {
  font-size: 12px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
}

.index-rateWrap .rate {
  margin-right: 8px;
}

.index-moneylimit {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.index-moneylimit .index-distanceWrap {
  color: #999999;
}

.delivery {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-left: 1.066667vw;
}

.delivery .icon-hollow {
  font-size: 11px;
  box-sizing: border-box;
  padding: 3px 4px;
  color: #ffffff;
  background-color: #2395ff;
}
</style>
