<template>
  <div class="ele-container">
    <keep-alive exclude="Login">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapMixins } from "./mixins";

export default {
  name: "App",
  // 调用定位混入
  mixins: [mapMixins]
};
</script>
