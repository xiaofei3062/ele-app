<template>
  <div class="addressSearch" v-if="isSearch">
    <div class="search-view">
      <div class="search-box">
        <div class="search-box-input">
          <i class="fa fa-search" />
          <input placeholder="请输入小区/写字楼/学校等" type="text" v-model="search_address" />
        </div>
        <button @click="$emit('close')" class="search-box-btn">取消</button>
      </div>
      <ul class="search-list">
        <li
          :key="index"
          @click="selectAddress(item)"
          class="search-row"
          v-for="(item, index) in areaList"
        >
          <p class="search-row-title">{{ item.name }}</p>
          <p class="search-row-location">{{ item.district }}{{ item.address }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressSearch",
  data() {
    return {
      search_address: "",
      areaList: []
    };
  },
  watch: {
    search_address(val) {
      this.searchPlace(val);
    },
    isSearch(boolean) {
      if (!boolean) {
        this.search_address = "";
        this.areaList = [];
      }
    }
  },
  props: {
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    }
  },
  methods: {
    // 调用高德地图搜索
    searchPlace(val) {
      AMap.plugin("AMap.Autocomplete", () => {
        let autoOptions = {
          //city 限定城市，默认全国
          city: this.city
        };
        let autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(val, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          this.areaList = result.tips;
        });
      });
    },
    // 点击选择地址
    selectAddress(item) {
      this.$emit("selectAddress", item);
    }
  }
};
</script>

<style scoped>
.addressSearch {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 54px;
}

.search-view {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.search-box-input {
  display: flex;
  align-items: center;
  width: 280px;
  height: 30px;
  margin-right: 10px;
  padding: 0 10px;
  color: #999999;
  border: 1px solid #dddddd;
  border-radius: 3px;
  background: #f5f5f5;
}

.search-box-input i {
  font-size: 14px;
  margin-right: 5px;
}

.search-box-input > input {
  font-size: 13px;
  width: 90%;
  background: none;
}

input,
button {
  border: none;
  outline: none;
}

.search-box-btn {
  font-size: 14px;
  line-height: 30px;
  width: 56px;
  height: 30px;
  text-align: center;
  white-space: nowrap;
  color: #333333;
  border-radius: 3px;
}

.search-list {
  padding-left: 15px;
}

.search-row {
  line-height: 1.2;
  padding: 10px 15px;
  border-bottom: 1px solid #cccccc;
}

.search-row-title {
  font-size: 15px;
  display: block;
  margin-bottom: 5px;
  color: #333333;
}

.search-row-location {
  font-size: 14px;
  display: block;
  text-align: justify;
  color: #999999;
}
</style>
