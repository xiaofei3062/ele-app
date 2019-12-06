<template>
  <div class="home">
    <div class="header">
      <div @click="goAddress" class="address_map">
        <i class="fa fa-map-marker" />
        <span>{{address}}</span>
        <i class="fa fa-sort-desc" />
      </div>
      <div class="shop_search">
        <i class="fa fa-search" />
        搜索商家 商家名称
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
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
      }
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

  .header {
    height: 104px;
    padding: 16px;
    background-color: #009eef;
  }

  .header .address_map {
    font-weight: bold;
    line-height: 24px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 24px;
    color: #ffffff;
  }

  .address_map i {
    font-size: 18px;
    display: block;
    margin-right: 10px;
  }

  .address_map .fa-sort-desc {
    margin-bottom: 5px;
  }

  .address_map span {
    display: inline-block;
    overflow: hidden;
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .header .shop_search {
    margin-top: 10px;
    padding: 10px 0;
    text-align: center;
    color: #aaaaaa;
    border-radius: 4px;
    background-color: #ffffff;
  }
</style>
