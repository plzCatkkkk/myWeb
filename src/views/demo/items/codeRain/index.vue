<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script setup>
defineComponent({
  name: 'codeRain',
})
// 获取canvas元素
const canvasRef = ref(null)
// 定时器
let drawAlways = null
// 绘制上下文
const ctx = ref(null)

// 列宽
const colWidth = 20
// 列数
const colCount = ref(0)

// 记录每行写到第几个字
const colNextIndexes = ref(null)

/**
 * @method draw
 * @description 绘制
 */
function draw() {
  ctx.value.fillStyle = 'rgba(250, 250, 250, 0.1)'
  ctx.value.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  const fz = 20
  ctx.value.font = `${fz}px Roboto Mono`
  for (let i = 0; i < colCount.value; i++) {
    if (colNextIndexes.value[i] == 0 && Math.random() < 0.995) {
    } else {
      const x = i * colWidth
      const y = colNextIndexes.value[i] * fz
      ctx.value.fillStyle = getRandomColor()
      ctx.value.fillText(getRandomLetter(), x, y)
      if (y > canvasRef.value.height) {
        colNextIndexes.value[i] = 0
      }
      colNextIndexes.value[i]++
    }
  }
}
// 随机颜色列表（确保不要太丑）
const colorList = [
  '#1E90FF',
  '#30D5C8',
  '#6495ED',
  '#2A52BE',
  '#4682B4',
  '#5F9EA0',
  '#008080',
  '#20B2AA',
]

// 随机颜色
/**
 * @method getRandomColor
 * @description 获取随机颜色
 * @return {string}
 */
function getRandomColor() {
  return colorList[Math.floor(Math.random() * colorList.length)]
}
/**
 * @method getRandomLetter
 * @description 获取随机字母
 * @return {string}
 */
function getRandomLetter() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

onMounted(() => {
  // 初始化画布
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  canvasRef.value.style.backgroundColor = '#fff'
  // 获取绘制上下文
  ctx.value = canvasRef.value.getContext('2d')
  // 初始化列数
  colCount.value = Math.floor(canvasRef.value.width / colWidth)

  // 初始化记录
  // 记录每行写到第几个字
  colNextIndexes.value = new Array(colCount.value)
  colNextIndexes.value.fill(0)
  // 开始绘制
  drawAlways = setInterval(draw, 50)

  // 监听窗口变化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  clearInterval(drawAlways)
  window.removeEventListener('resize', handleResize)
})

/**
 * @method handleResize
 * @description 监听窗口变化改变数据
 */
function handleResize() {
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  colCount.value = Math.floor(canvasRef.value.width / colWidth)
  colNextIndexes.value = new Array(colCount.value).fill(0)
}
</script>
<style lang="scss" scoped>
canvas {
  // 解决原始属性出现滚动条
  display: block;
}
</style>
