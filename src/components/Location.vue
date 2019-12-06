<template>
  <div class="location">
    <div class="title">当前定位</div>
    <div @click="$emit('click')" class="des">
      <i class="fa fa-location-arrow" />
      <span>{{address}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Location",
    props: {
      address: String
    }
  };
</script>

<style scoped>
  .title {
    font-size: 12px;
    margin: 10px 0;
  }

  .des i {
    color: #009eef;
  }

  .des span {
    font-weight: bold;
    display: inline-block;
    overflow: hidden;
    width: 90%;
    margin-left: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333333;
  }
</style>
