<template>
  <div class="container" :style="containerStyle"></div>
</template>
<script setup>
import yjWaiting from './yj-waiting.gif'
import yjThinking from './yj-thinking.gif'
import yjObjection from './yj-objection.gif'
import yjObjection2 from './yj-objection2.gif'
import yjWin1 from './yj-win1.gif'
import yjWin2a from './yj-win2a.gif'
import yjWin2b from './yj-win2b.gif'
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

const currentImg = ref(yjWaiting)

const containerStyle = computed(() => ({
  backgroundImage: `url(${currentImg.value})`,
}))

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

function objection() {
  currentImg.value = Math.random() > 0.5 ? yjObjection : yjObjection2
  setTimeout(() => {
    if (!props.isEnd) {
      reset()
    }
  }, 1700)
}

function reset() {
  currentImg.value = defaultImg.value
}

function win() {
  if (Math.random() > 0.5) {
    currentImg.value = yjWin1
  } else {
    currentImg.value = yjWin2a
    setTimeout(() => {
      currentImg.value = yjWin2b
    }, 1700)
  }
}

function fail() {
  if (Math.random() > 0.5) {
    currentImg.value = yjFail1
  } else {
    currentImg.value = yjFail2
  }
}

onMounted(() => {
  reset()
})

defineExpose({ objection, reset, win, fail })
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
