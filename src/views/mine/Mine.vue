<template>
  <div class="mine">
    {{totalPrice}}
  </div>
</template>

<script>
  export default {
    name: "Mine",
    data() {
      return {
        list: [
          { name: "aaa", price: "120.00" },
          { name: "bbb", price: "78.00" },
          { name: "ccc", price: "99.00" },
          { name: "ddd", price: "323.00" }
        ]
      };
    },
    computed: {
      // 计算总价
      totalPrice() {
        return this.list.reduce((prev, val) => {
          return Number(prev) + Number(val.price);
        }, 0);
      }
    }
  };
</script>

<style scoped>

</style>
