<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search" />
        <input placeholder="请输入城市名" type="text" v-model="cityValue">
      </div>
      <button @click="$router.push({path:'/address',query:{city:$route.query.city}})">取消</button>
    </div>
    <div>
      <div class="location">
        <location :address="$route.query.city" />
      </div>
      <alpha-bet :cityInfo="cityInfo" :keys="keys" ref="allcity" />
    </div>
  </div>
</template>

<script>
  import Location from "@/components/Location";
  import AlphaBet from "@/components/AlphaBet";

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
    methods: {
      getCityInfo() {
        axios.get("/api/posts/cities").then(res => {
          // console.log(res);
          this.cityInfo = res;

          // 处理key
          this.keys = Object.keys(res);
          // 移除hotcities的key
          this.keys.pop();
          // keys排序
          this.keys.sort();

          this.$nextTick(() => {
            this.$refs.allcity.initScroll();
          });
        }).catch(err => {
          console.log(err);
        });
      }
    },
    mounted() {
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
    margin-left: 8px;
    border: none;
    outline: none;
    background: #eeeeee;
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
