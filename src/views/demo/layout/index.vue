<template>
  <div class="goBack"></div>
  <div class="fullscreen-background">
    <router-view />
  </div>
</template>
<script setup>
defineComponent({
  name: 'Demo',
})
</script>
<style lang="scss" scoped>
.goBack {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 40px;
  width: 40px;
  background-color: #ccc;
}
</style>
