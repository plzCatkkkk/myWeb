<template>
  <div class="goBack" @click="goback">
    <img src="@assets/icon/go-back.svg" alt="go back" />
  </div>
  <div class="fullscreen-background">
    <router-view />
  </div>
</template>
<script setup>
defineComponent({
  name: 'Demo',
})
const router = useRouter()
const goback = () => {
  router.push('/demolist')
}
</script>
<style lang="scss" scoped>
.goBack {
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
  margin: 16px;
  img {
    scale: 0.6;
  }
}
</style>
