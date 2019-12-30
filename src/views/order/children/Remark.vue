<template>
  <div class="remark">
    <my-header :is-left="true" @click="$parent.isAddress = true" title="订单备注" />
    订单备注
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";

export default {
  name: "Remark",
  components: { MyHeader }
};
</script>

<style scoped>
.remark {
  z-index: 10;
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 54px);
  background-color: #ffffff;
}
</style>
