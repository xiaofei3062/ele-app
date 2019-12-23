<template>
  <div class="cart-control">
    <span @click.stop="reduceCount" v-if="food.count>0"><van-icon class="cart-control-item" name="clear" /></span>
    <span class="cart-control-price" v-if="food.count>0">{{food.count}}</span>
    <span @click.stop="addCount"><van-icon class="cart-control-item" name="add" /></span>
  </div>
</template>

<script>
  export default {
    name: "CartControl",
    props: {
      food: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      reduceCount() {
        this.food.count--;
      },
      addCount() {
        this.food.count++;
      }
    }
  };
</script>

<style scoped>
  .cart-control {
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  .cart-control .cart-control-item {
    font-size: 22px;
    color: #009eef;
  }

  .cart-control .cart-control-price {
    font-size: 16px;
    display: inline-block;
    margin: 0 7px;
    color: #009eef;
  }
</style>
