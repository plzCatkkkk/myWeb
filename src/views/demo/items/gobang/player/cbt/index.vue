<template>
  <div class="container" :style="containerStyle"></div>
</template>
<script setup>
import cbtWaiting from './cbt-waiting.gif'
import cbtThinking from './cbt-thinking.gif'
import cbtObjecting from './cbt-objecting.gif'
import cbtWin1 from './cbt-win1.gif'
import cbtWin2 from './cbt-win2.gif'
import cbtFail1 from './cbt-fail1.gif'
import cbtFail2 from './cbt-fail2.gif'
defineComponent({
  name: 'cbt',
})
const props = defineProps({
  state: {
    type: Number,
    default: 1, //1.waiting  2.thinking 3.win 4.fail
  },
})
const containerStyle = ref({
  backgroundImage: `url(${cbtWaiting})`,
})

const defaultImg = computed(() => {
  switch (props.state) {
    case 1:
      return cbtWaiting
    case 2:
      return cbtThinking
    default:
      return cbtWaiting
  }
})

onMounted(() => {
  // img.value = cbtWaiting
})
</script>
<style lang="scss" scoped>
.container {
  width: 50vmax;
  height: 420px;
  background-size: 600px;
  background-repeat: no-repeat;
  background-position: 0 55px;
}
</style>
