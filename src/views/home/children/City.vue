<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search" />
        <input placeholder="请输入城市名" type="text" v-model="cityValue" />
      </div>
      <button @click="handleBtnClick">{{ btnMsg }}</button>
    </div>
    <div v-show="searchList.length === 0">
      <div class="location">
        <location
          :address="$route.query.city"
          @click="$router.push({ path: '/single', query: { city: $route.query.city } })"
        />
      </div>
      <alpha-bet :cityInfo="cityInfo" :keys="keys" @selectCity="selectCity" ref="allcity" />
    </div>
    <div class="search_list" v-show="searchList.length !== 0">
      <ul>
        <li :key="index" @click="selectCity(item)" v-for="(item, index) in searchList">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Location from "./Location";
import AlphaBet from "./AlphaBet";

export default {
  name: "City",
  components: { AlphaBet, Location },
  data() {
    return {
      cityValue: "",
      cityInfo: {},
      keys: [],
      allCities: [],
      searchList: []
    };
  },
  computed: {
    // 动态赋值按钮文字
    btnMsg() {
      if (this.searchList.length === 0) {
        return "取消";
      }
      return "清空";
    }
  },
  watch: {
    cityValue(val) {
      this.searchCity(val);
    }
  },
  methods: {
    getCityInfo() {
      // 获取城市数据本地存储
      const city_info = localStorage.getItem("city_info");
      // 本地存储存在 就直接获取数据 否则请求数据
      if (city_info) {
        this.cityInfo = JSON.parse(city_info);
        // 处理key
        this.keys = Object.keys(this.cityInfo);
        // 移除hotcities的key
        this.keys.pop();
        // keys排序
        this.keys.sort();

        this.$nextTick(() => {
          this.$refs.allcity.initScroll();
        });

        // 存储所有城市,用来搜索过滤
        this.keys.forEach(key => {
          this.cityInfo[key].forEach(city => {
            this.allCities.push(city);
          });
        });
      } else {
        this.$toast.loading({
          forbidClick: true,
          message: "加载中..."
        });
        axios
          .get("/api/posts/cities")
          .then(res => {
            // console.log(res);
            this.$toast.clear();
            this.cityInfo = res;
            // 城市数据一般比较固定所以存到本地
            localStorage.setItem("city_info", JSON.stringify(res));

            // 处理key
            this.keys = Object.keys(res);
            // 移除hotcities的key
            this.keys.pop();
            // keys排序
            this.keys.sort();

            this.$nextTick(() => {
              this.$refs.allcity.initScroll();
            });

            // 存储所有城市,用来搜索过滤
            this.keys.forEach(key => {
              this.cityInfo[key].forEach(city => {
                this.allCities.push(city);
              });
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 选择城市
    selectCity(city) {
      // console.log(city.name);
      this.$router.push({ path: "/address", query: { city: city.name } }).catch(err => {});
    },
    // 搜索城市
    searchCity(val) {
      if (!val) {
        // 内容为空,搜素内容清空
        this.searchList = [];
      } else {
        // 根据城市名检索城市
        this.searchList = this.allCities.filter(item => {
          return item.name.indexOf(val) !== -1;
        });
      }
    },
    // 取消清空按钮
    handleBtnClick() {
      if (this.btnMsg === "取消") {
        this.$router.push({
          path: "/address",
          query: { city: this.$route.query.city }
        });
      } else {
        // 清空数据并且清空输入框内容
        this.searchList = [];
        this.cityValue = "";
      }
    }
  },
  activated() {
    this.getCityInfo();
  }
};
</script>

<style scoped>
.city {
  overflow: auto;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 50px;
}

.search_wrap {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 8px 16px;
  background: #ffffff;
}

.search {
  line-height: 34px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 85%;
  height: 34px;
  padding: 0 16px;
  border-radius: 10px;
  background-color: #eeeeee;
}

.search input {
  display: block;
  height: 32px;
  margin-left: 6px;
  border: none;
  outline: none;
  background: #eeeeee;
}

.search i {
  font-size: 16px;
}

.search_wrap button {
  display: block;
  color: #009eef;
  border: none;
  outline: none;
  background: none;
}

.location {
  box-sizing: border-box;
  padding: 4px 16px;
  background: #ffffff;
}

.search_list {
  padding: 5px 16px;
  background: #ffffff;
}

.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
}
</style>
