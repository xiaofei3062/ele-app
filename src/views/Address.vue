<template>
  <div class="address">
    <my-header :is-left="true" title="请选择收货地址" />
    <div class="city_search">
      <div class="search">
        <span class="city">{{city}}<i class="fa fa-angle-down" /></span>
        <i class="fa fa-search" />
        <input placeholder="小区/写字楼/学校等" type="text" v-model="searchValue">
      </div>
      <location :address="address" />
    </div>
    <div class="area">
      <ul :key="index" class="area_list" v-for="(item,index) in areaList">
        <li @click="selectAddress(item)">
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader";
  import Location from "@/components/Location";

  export default {
    name: "Address",
    components: { Location, MyHeader },
    data() {
      return {
        city: "合肥",//当前城市
        searchValue: "",
        areaList: []
      };
    },
    computed: {
      address() {
        return this.$store.getters.location.formattedAddress;
      }
    },
    watch: {
      searchValue() {
        this.searchPlace();
      }
    },
    // 进入路由之前给城市赋值,拿到to.params.city
    beforeRouteEnter(to, from, next) {
      const city = to.params.city || "合肥";
      next(vm => {
        vm.city = city;
      });
    },
    methods: {
      // 搜索城市
      searchPlace() {
        const self = this;
        AMap.plugin("AMap.Autocomplete", function () {
          // 实例化Autocomplete
          var autoOptions = {
            //city 限定城市，默认全国
            city: self.city
          };
          var autoComplete = new AMap.Autocomplete(autoOptions);
          autoComplete.search(self.searchValue, function (status, result) {
            // 搜索成功时，result即是对应的匹配数据
            // console.log(result);
            self.areaList = result.tips;
          });
        });
      },
      // 选择地址
      selectAddress(item) {
        // 设置地址
        if (item) {
          this.$store.dispatch(
            "setAddress",
            item.district + item.address + item.name
          );
        } else {
          this.$store.dispatch("setAddress", this.address);
        }
        // 跳转home
        this.$router.push("/home");
      }
    }
  };
</script>

<style scoped>
  .address {
    overflow: auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 45px;
  }

  .city_search {
    padding: 10px 20px;
    color: #333333;
    background-color: #ffffff;
  }

  .search {
    line-height: 40px;
    box-sizing: border-box;
    height: 40px;
    border-radius: 10px;
    background-color: #eeeeee;
  }

  .search .city {
    padding: 0 10px;
  }

  .city i {
    margin-right: 10px;
  }

  .search input {
    margin-left: 5px;
    border: none;
    outline: none;
    background-color: #eeeeee;
  }

  .area {
    margin-top: 16px;
    background: #ffffff;
  }

  .area li {
    padding: 8px 16px;
    color: #aaaaaa;
    border-bottom: 1px solid #eeeeee;
  }

  .area li h4 {
    font-weight: bold;
    margin-bottom: 5px;
    color: #333333;
  }
</style>
