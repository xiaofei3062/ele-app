<template>
  <div class="cart-control">
    <van-icon
      @click.stop="reduceCount"
      class="cart-control-item"
      name="clear"
      v-if="food.count > 0"
    />
    <span class="cart-control-price" v-if="food.count > 0">
      {{ food.count }}
    </span>
    <van-icon @click.stop="addCount" class="cart-control-item" name="add" />
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
  color: #009eef;
}

.cart-control .cart-control-item {
  font-size: 20px;
}

.cart-control .cart-control-price {
  font-size: 16px;
  margin: 0 5px;
}
</style>
