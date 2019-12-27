<template>
  <div class="ele-container">
    <keep-alive exclude="Shop">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
