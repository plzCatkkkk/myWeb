<template>
  <div class="container" :style="containerStyle"></div>
</template>
<script setup>
import yjWaiting from './yj-waiting.gif'
import yjThinking from './yj-thinking.gif'
import yjObjection from './yj-objection.gif'
import yjWin1 from './yj-win1.gif'
import yjWin2a from './yj-win2(a).gif'
import yjWin2b from './yj-win2(b).gif'
import yjFail1 from './yj-fail1.gif'
import yjFail2 from './yj-fail2.gif'
defineComponent({
  name: 'yj',
})
const props = defineProps({
  state: {
    type: Number,
    default: 1, //1.waiting  2.thinking 3.win 4.fail
  },
})
const containerStyle = ref({
  backgroundImage: `url(${yjWaiting})`,
})

const defaultImg = computed(() => {
  switch (props.state) {
    case 1:
      return yjWaiting
    case 2:
      return yjThinking
    default:
      return yjWaiting
  }
})
</script>
<style lang="scss" scoped>
.container {
  width: 50vmax;
  height: 420px;
  background-size: 600px;
  background-repeat: no-repeat;
  background-position: right 0 top 55px;
}
</style>
