<template>
  <div class="goBack"></div>
  <div class="fullScreen">
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
.fullScreen {
  height: 100vh;
  width: 100vw;
}
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
