<template>
  <div class="ele-container">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style>
  .ele-container {
    font-size: 14px;
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
  }
</style>
