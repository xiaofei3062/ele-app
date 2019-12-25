<template>
  <div class="index">
    <keep-alive>
      <router-view />
    </keep-alive>
    <tar-bar />
  </div>
</template>

<script>
  import TarBar from "@/components/TarBar";

  export default {
    name: "Index",
    components: { TarBar }
  };
</script>

<style scoped>
  .index {
    width: 100%;
    height: calc(100% - 50px);
  }
</style>
