<template>
  <div class="home">
    <div class="header">
      <div @click="goAddress" class="address_map">
        <i class="fa fa-map-marker" />
        <span>{{ address }}</span>
        <i class="fa fa-sort-desc" />
      </div>
    </div>
    <div :class="{ fixedview: showFilter }" @click="$router.push('/search')" class="search_wrap">
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
    <mt-loadmore
      :auto-fill="false"
      :bottom-all-loaded="allLoaded"
      :bottom-method="loadMore"
      :bottomPullText="bottomPullText"
      :top-method="loadData"
      ref="loadmore"
    >
      <div class="shoplist">
        <IndexShop :key="index" :restaurant="item.restaurant" v-for="(item, index) in restaurants" />
      </div>
    </mt-loadmore>
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
      restaurants: [], //存放商家数据
      allLoaded: false,
      bottomPullText: "上拉加载更多",
      sortData: {} // 排序内容
    };
  },
  computed: {
    address() {
      return this.$store.getters.address;
    },
    city() {
      return (
        this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province
      );
    }
  },
  methods: {
    goAddress() {
      this.$router.push({ path: "/address", query: { city: this.city } });
    },
    getData() {
      // 商品列表数据
      axios
        .get("/api/profile/shopping")
        .then(res => {
          this.swiperList = res.swipeImgs;
          this.entries = res.entries;
        })
        .catch(err => {
          console.log(err);
        });

      // 过滤筛选数据
      axios
        .get("/api/profile/filter")
        .then(res => {
          this.filterData = res;
        })
        .catch(err => {
          console.log(err);
        });

      // 获取商家信息
      this.loadData();
    },
    searchFixed(bol) {
      this.showFilter = bol;
    },
    // 排序更新内容
    update(condition) {
      this.sortData = condition;
      this.loadData();
    },
    // 获取商家信息,下拉刷新
    loadData() {
      this.page = 1;
      this.allLoaded = false;
      this.bottomPullText = "上拉加载更多";
      axios
        .post(`/api/profile/restaurants/${this.page}/${this.size}`, this.sortData)
        .then(res => {
          this.restaurants = res;
          // 数据加载完毕隐藏
          this.$refs.loadmore.onTopLoaded();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上拉加载
    loadMore() {
      if (!this.allLoaded) {
        this.page++;
        axios
          .post(`/api/profile/restaurants/${this.page}/${this.size}`, this.sortData)
          .then(res => {
            // 加载完之后重新渲染
            this.$refs.loadmore.onBottomLoaded();
            if (res.length > 0) {
              res.forEach(item => {
                this.restaurants.push(item);
              });
              if (res < this.size) {
                this.allLoaded = true;
                this.bottomPullText = "没有更多了";
              }
            } else {
              // 数据为空
              this.allLoaded = true;
              this.bottomPullText = "没有更多了";
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
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
  background-color: #009eef;
}

.search_wrap {
  width: 100%;
  padding: 10px 16px;
}

.header {
  line-height: 40px;
  width: 100%;
  height: 40px;
  padding: 0 16px;
}

.header .address_map {
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.address_map i {
  font-size: 18px;
  display: inline-block;
  margin: 0 3px;
}

.address_map i:last-child {
  font-size: 20px;
  margin-bottom: 6px;
}

.address_map span {
  display: inline-block;
  overflow: hidden;
  width: 80%;
  margin-left: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.search_wrap .shop_search {
  line-height: 34px;
  height: 34px;
  text-align: center;
  color: #aaaaaa;
  border-radius: 4px;
  background-color: #ffffff;
}

.search_wrap {
  position: sticky;
  z-index: 90;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
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

.shoplist-title:before,
.shoplist-title:after {
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
  height: calc(100% - 94px);
}
</style>
