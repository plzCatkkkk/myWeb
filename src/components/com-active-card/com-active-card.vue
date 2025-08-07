<template>
  <div
    class="item-card"
    :class="{ 'has-shadow': shadow, 'has-enlarge': enlarge }"
    @mousemove.stop="onMousemove"
    @mouseleave.stop="onMouseleave"
  >
    <slot name="content"></slot>
  </div>
</template>
<script setup>
defineComponent({
  name: 'ComActiveCard',
})
const props = defineProps({
  active: { type: Boolean, default: true },
  shadow: { type: Boolean, default: false },
  range: { type: Array, default: () => [0, 0] },
  enlarge: { type: Boolean, default: true },
})
/**
 * @method getRotation 获取旋转角度
 * @params range 旋转范围
 * @params Offset 鼠标偏移量
 * @params length 旋转元素宽度
 * @return 旋转角度
 */
function getRotation(range, Offset, length) {
  return ((range[1] - range[0]) / length) * Offset + range[0]
}
const onMousemove = (e) => {
  if (!props.active) {
    return
  }
  const { offsetX, offsetY, target } = e
  const { width, height } = target.getBoundingClientRect()
  const x = getRotation(props.range, offsetY, height)
  const y = -getRotation(props.range, offsetX, width)
  target.style.setProperty('--rotate-x', `${x}deg`)
  target.style.setProperty('--rotate-y', `${y}deg`)
}
const onMouseleave = (e) => {
  e.target.style.setProperty('--rotate-x', '0deg')
  e.target.style.setProperty('--rotate-y', '0deg')
}
</script>
<style lang="scss" scoped>
.item-card {
  background-color: #fff;
  transition: 0.3s;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  &:hover {
    transform: perspective(500px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg));
  }
  &.has-shadow:hover {
    box-shadow: 2px 4px 12px 2px rgba(29, 104, 161, 0.272);
  }
  &.has-enlarge:hover {
    scale: 1.03;
  }
}
</style>
