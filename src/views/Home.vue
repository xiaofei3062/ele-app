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

  </div>
</template>

<script>
  import MySwiper from "@/components/MySwiper";
  import Entries from "@/components/Entries";
  import FilterView from "../components/FilterView";

  export default {
    name: "Home",
    components: { FilterView, Entries, MySwiper },
    data() {
      return {
        swiperList: [],
        entries: [],
        filterData: {},
        showFilter: false
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
        axios.get("/api/profile/shopping").then(res => {
          // console.log(res);
          this.swiperList = res.swipeImgs;
          this.entries = res.entries;
        }).catch(err => {
          console.log(err);
        });

        axios.get("/api/profile/filter").then(res => {
          console.log(res);
          this.filterData = res;
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
