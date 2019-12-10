<template>
  <div class="search">
    <!-- 页面头部 -->
    <my-header :is-left="true" title="搜索" />
    <!-- 搜索头部 -->
    <div class="search_header">
      <form class="search_wrap">
        <i class="fa fa-search" />
        <input placeholder="输入商家/商品信息" type="text" v-model="keyWord">
        <button @click.prevent="keyWordChange">搜索</button>
      </form>
    </div>
    <!-- 搜索内容 -->
    <div class="shop" v-if="result && !showShop">
      <div class="empty_wrap" v-if="empty">
        <img alt="" src="@/assets/empty.png">
        <div class="empty_txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <div v-else>
        <search-index :list="result.restaurants" @click="shopItemClick" />
        <search-index :list="result.words" @click="shopItemClick" />
      </div>
    </div>
    <!-- 商家信息 -->
    <div class="container" v-if="showShop">商家信息</div>
  </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader";
  import SearchIndex from "./children/SearchIndex";

  export default {
    name: "Search",
    components: { SearchIndex, MyHeader },
    data() {
      return {
        keyWord: "",
        result: {},
        empty: false,
        showShop: false
      };
    },
    watch: {
      keyWord(val) {
        if (!val) {
          this.result = {};
          this.empty = false;
        }
      }
    },
    methods: {
      // 搜素关键词
      keyWordChange() {
        this.showShop = false;
        if (!this.keyWord) {
          return false;
        } else {
          axios(`/api/profile/typeahead/${this.keyWord}`).then(res => {
            // console.log(res);
            // 数组有数据才赋值
            if (res.restaurants.length > 0 || res.words.length > 0) {
              this.result = res;
            } else {
              // 否则显示暂无数据,并清空result
              this.empty = true;
              this.result = {};
            }
          }).catch(err => {
            console.log(err);
            this.result = {};
          });
        }
      },
      // 点击
      shopItemClick() {
        this.showShop = true;
        this.keyWord = "";
      }
    }
  };
</script>

<style scoped>
  .search {
    overflow: auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .search_header {
    margin-top: 45px;
    padding: 0 10px;
    background: #ffffff;
  }

  .search_header .search_wrap {
    position: relative;
    display: flex;
    align-items: center;
    height: 50px;
  }

  .search_wrap .fa-search {
    position: absolute;
    top: 18px;
    left: 10px;
    width: 24px;
    height: 24px;
    color: #888888;
  }

  .search_wrap input {
    line-height: 30px;
    display: block;
    flex-grow: 1;
    height: 30px;
    padding-top: 2px;
    padding-left: 30px;
    color: #666666;
    border: none;
    border-radius: 4px;
    outline: none;
    background-color: #eeeeee;
  }

  .search_wrap button {
    font-size: 14px;
    font-weight: 600;
    margin-left: 10px;
    color: #666666;
    border: none;
    outline: none;
    background: #ffffff;
  }

  .shop {
    overflow: auto;
    width: 100%;
    height: calc(100% - 95px);
  }

  .empty_wrap {
    display: flex;
    overflow: hidden;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #ffffff;
  }

  .empty_wrap img {
    width: 130px;
    height: 130px;
  }

  .empty_txt h4 {
    font-size: 18px;
    display: block;
    margin: 40px 0 10px 0;
    color: #666666;
  }

  .empty_txt span {
    font-size: 14px;
    display: block;
    color: #999999;
  }
</style>
