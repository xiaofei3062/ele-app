<template>
  <ul class="search_list">
    <li :key="index" @click="$emit('click')" v-for="(item,index) in list">
      <img :src="item.image_path" alt="" v-if="item.image_path">
      <i class="fa fa-search" v-else />
      <div class="shopitem">
        <span class="title">{{item.name || item}}</span>
        <span class="rating" v-if="item.rating">评分：{{item.rating}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "SearchIndex",
    props: {
      list: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  };
</script>

<style scoped>
  .search_list {
    background: #ffffff;
  }

  .search_list li {
    display: flex;
    align-items: center;
    height: 13.933333vw;
    padding: 0 4.266667vw;
  }

  .search_list li img {
    width: 6.4vw;
    height: 6.4vw;
    margin-right: 4.266667vw;
    border-radius: 0.133333vw;
  }

  .shopitem {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
    height: 13.933333vw;
    border-bottom: 1px solid #e3e3e3;
  }

  .shopitem .title {
    font-size: 14px;
    display: inline-block;
    overflow: hidden;
    max-width: 56vw;
    margin-right: 0.8vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333333;
  }

  .shopitem .rating {
    font-size: 14px;
    color: #999999;
  }

  .search_list li i {
    margin-right: 4.266667vw;
    color: #888888;
  }
</style>
