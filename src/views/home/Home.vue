<template>
  <div class="home">
    <div class="header">
      <div @click="goAddress" class="address_map">
        <i class="fa fa-map-marker" />
        <span>{{address}}</span>
        <i class="fa fa-sort-desc" />
      </div>
    </div>
    <div :class="{'fixedview':showFilter}" class="search_wrap">
      <div class="shop_search">
        <i class="fa fa-search" />
        搜索商家 商家名称
      </div>
    </div>
    <div id="container">
      <!-- 轮播图 -->
      <my-swiper :swiper-list="swiperList" />
      <!-- 分类 -->
      <entries :entries="entries" />
    </div>

    <!-- 推荐商家 -->
    <div class="shoplist-title">推荐商家</div>
    <!-- 导航 -->
    <filter-view :filter-data="filterData" @searchFixed="searchFixed" @update="update" />
    <!-- 商家信息 -->
    <div class="shoplist">
      <index-shop :key="index" :restaurant="item.restaurant" v-for="(item,index) in restaurants" />
    </div>

  </div>
</template>

<script>
  import MySwiper from "@/components/MySwiper";
  import Entries from "./children/Entries";
  import FilterView from "./children/FilterView";
  import IndexShop from "./children/IndexShop";

  export default {
    name: "Home",
    components: { IndexShop, FilterView, Entries, MySwiper },
    data() {
      return {
        swiperList: [],
        entries: [],
        filterData: {},
        showFilter: false,
        page: 1,
        size: 10,
        restaurants: [] //存放商家数据
      };
    },
    computed: {
      address() {
        return this.$store.getters.address;
      },
      city() {
        return (
          this.$store.getters.location.addressComponent.city ||
          this.$store.getters.location.addressComponent.province
        );
      }
    },
    methods: {
      goAddress() {
        this.$router.push({ path: "/address", query: { city: this.city } });
      },
      getData() {
        // 商品列表数据
        axios.get("/api/profile/shopping").then(res => {
          this.swiperList = res.swipeImgs;
          this.entries = res.entries;
        }).catch(err => {
          console.log(err);
        });

        // 过滤筛选数据
        axios.get("/api/profile/filter").then(res => {
          this.filterData = res;
        }).catch(err => {
          console.log(err);
        });

        // 获取商家信息
        axios.post(`/api/profile/restaurants/${this.page}/${this.size}`).then(res => {
          console.log(res);
          this.restaurants = res;
        }).catch(err => {
          console.log(err);
        });

      },
      searchFixed(bol) {
        this.showFilter = bol;
      },
      update(condition) {
        console.log(condition);
      }
    },
    created() {
      this.getData();
    }
  };
</script>

<style scoped>
  .home {
    overflow: auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .header,
  .search_wrap {
    padding: 10px 16px;
    background-color: #009eef;
  }

  .header .address_map {
    font-weight: bold;
    color: #ffffff;
  }

  .address_map i {
    font-size: 18px;
    margin: 0 3px;
  }

  .address_map span {
    display: inline-block;
    overflow: hidden;
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .search_wrap .shop_search {
    padding: 10px 0;
    text-align: center;
    color: #aaaaaa;
    border-radius: 4px;
    background-color: #ffffff;
  }

  .search_wrap {
    position: sticky;
    z-index: 999;
    top: 0;
    box-sizing: border-box;
  }

  /* 推荐商家 */
  .shoplist-title {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    color: #333333;
    background: #ffffff;
  }

  .shoplist-title:before, .shoplist-title:after {
    display: block;
    content: "一";
  }

  .shoplist-title:before {
    margin-right: 10px;
  }

  .shoplist-title:after {
    margin-left: 10px;
  }

  .fixedview {
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
  }

  .mint-loadmore {
    overflow: auto;
    height: calc(100% - 95px);
  }
</style>
