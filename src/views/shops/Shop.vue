<template>
  <div class="shop" v-if="Object.keys(shopInfo).length!==0">

    <!-- 头部 -->
    <div class="header-nav">
      <div class="nav_bg">
        <img :src="shopInfo.rst.scheme" alt="">
      </div>
      <div @click="$router.push('/home')" class="nav_back">
        <i class="fa fa-chevron-left" />
        <span>返回</span>
      </div>
      <div class="shop_image">
        <img :src="shopInfo.rst.image_path" alt>
      </div>
    </div>

    <!-- 商家信息 -->
    <div class="index-rst">
      <div @click="showInfoModel = true" class="rst-name">
        <span>{{shopInfo.rst.name}}</span>
        <i class="fa fa-caret-right" />
      </div>
      <!-- 弹窗信息 -->
      <info-model :rst="shopInfo.rst" :show-info-model="showInfoModel" @modelClose="showInfoModel = false" />
      <!-- 评分月售 -->
      <div class="rst-order">
        <span>评分{{shopInfo.rst.rating}}</span>
        <span>月售{{shopInfo.rst.recent_order_num}}单</span>
        <span>蜂鸟专送约{{shopInfo.rst.order_lead_time}}分钟</span>
      </div>
      <!-- 优惠信息 -->
      <activity :activities="shopInfo.rst.activities" />
      <!-- 公告 -->
      <p class="rst-promotion">公告: {{shopInfo.rst.promotion_info}}</p>
    </div>

    <!-- 导航 -->
    <nav-bar />
    <keep-alive>
      <router-view />
    </keep-alive>

  </div>
</template>

<script>
  import InfoModel from "./children/InfoModel";
  import Activity from "./children/Activity";
  import NavBar from "./children/NavBar";

  export default {
    name: "Shop",
    components: { NavBar, Activity, InfoModel },
    data() {
      return {
        shopInfo: {},
        showInfoModel: false
      };
    },
    methods: {
      getShopData() {
        axios.get("/api/profile/batch_shop").then(res => {
          console.log(res);
          this.shopInfo = res;
        });
      }
    },
    created() {
      this.getShopData();
    }
  };
</script>

<style scoped>
  .shop {
    overflow: auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .header-nav {
    position: relative;
  }

  .nav_bg img {
    width: 100%;
    height: 100px;
  }

  .nav_back {
    font-size: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    color: #ffffff;
  }

  .nav_back i {
    font-size: 20px;
    display: inline-block;
    margin-right: 5px;
  }

  .nav_back span {
    font-size: 16px;
    display: inline-block;
  }

  .shop_image {
    position: absolute;
    top: 60px;
    left: 150px;
  }

  .shop_image img {
    width: 75px;
    height: 75px;
    border-radius: 4px;
  }

  .index-rst {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 40px 0 0;
    background: #ffffff;
  }

  .index-rst .rst-name {
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    width: 72%;
    margin: 10px 0;
    white-space: nowrap;
  }

  .rst-name span {
    display: inline-block;
    overflow: hidden;
    margin-right: 10px;
    text-align: left;
    text-overflow: ellipsis;
  }

  .rst-name i {
    font-size: 20px;
    display: inline-block;
  }

  .index-rst .rst-order {
    font-size: 13px;
    line-height: 30px;
    height: 30px;
    text-align: center;
    white-space: nowrap;
    color: #666666;
  }

  .rst-order span {
    margin: 0 3px;
  }

  .index-rst .rst-promotion {
    font-size: 14px;
    line-height: 30px;
    display: block;
    overflow: hidden;
    width: 80%;
    height: 30px;
    margin: 0 auto 10px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #666666;
  }
</style>
