<template>
  <div class="Rating-gray">
    <i :class="item" :key="index" class="fa" v-for="(item,index) in itemClasses" />
  </div>
</template>

<script>
  // 星星长度
  const starLen = 5;
  // 全星
  const allStar = "fa-star";
  // 半星
  const halfStar = "fa-star-half-empty";
  // 填充
  const offStar = "fa-star-o";

  export default {
    name: "Rating",
    props: {
      rating: Number
    },
    computed: {
      itemClasses() {
        // 4.8 4个全星 1个半星
        let result = [];

        // 对分数进行处理, 向下取0.5的倍数
        let score = Math.floor(this.rating * 2) / 2;
        // 控制半星
        let hasDecimal = score % 1 !== 0;
        // 全星
        let integer = Math.floor(score);

        // 全星放入到数组中
        for (let i = 0; i < integer; i++) {
          result.push(allStar);
        }
        // 半星
        if (hasDecimal) {
          result.push(halfStar);
        }
        // 补齐
        while (result.length < starLen) {
          result.push(offStar);
        }

        return result;

      }
    }
  };
</script>

<style scoped>
  .Rating-gray {
    display: inline-block;
    margin-right: 3px;
    color: #ffbe00;
  }
</style>
