<template>
  <div class="seller" v-if="Object.keys(sellerInfo).length!==0">
    <div class="seller-content">
      <img :src="sellerInfo.header_image" alt>
      <h3>{{sellerInfo.title}}</h3>
      <p :class="{'more':isMore}" class="content">{{sellerInfo.brand_intros[0].brief}}</p>
      <p @click="isMore = !isMore" class="view">{{isMore?"查看更多故事":"点击收起故事"}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Seller",
    data() {
      return {
        sellerInfo: {},
        isMore: true
      };
    },
    methods: {
      getData() {
        axios.get("/api/profile/seller").then(res => {
          // console.log(res);
          this.sellerInfo = res;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    mounted() {
      this.getData();
    }
  };
</script>

<style scoped>
  .seller {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    height: calc(100vh - 44px);
    border-top: 1px solid #aaaaaa;
  }

  .seller-content {
    padding: 20px 15px 0 15px;
    background-color: #ffffff;
  }

  .seller-content img {
    width: 100%;
  }

  .seller-content h3 {
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .seller-content .content {
    font-size: 14px;
    line-height: 20px;
    text-align: justify;
  }

  .seller-content .content.more {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .seller-content .view {
    font-size: 16px;
    margin-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
</style>
