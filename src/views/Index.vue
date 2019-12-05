<template>
  <div class="index">
    <router-view />
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
    height: calc(100% - 50px);
  }
</style>
