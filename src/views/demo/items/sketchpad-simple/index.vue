<template>
  <div class="fullscreen-background sketchpad-box">
    <input ref="colorPicker" type="color" />
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script setup>
import { Rectangle } from './class.js'
defineComponent({
  name: 'SketchpadSimple',
})
const canvasRef = ref(null)
const colorPicker = ref(null)

// const ctx = canvasRef.getContext('2d')
const ctx = ref(null)

// const devicePixelRatio = window.devicePixelRatio || 1
const devicePixelRatio = ref(1)

/**
 * @method initDevicePixelRatio
 * @description 初始化设备像素比
 */
function initDevicePixelRatio() {
  devicePixelRatio.value = window.devicePixelRatio || 1
}
/**
 * @method init
 * @description 初始化画布
 */
function initCanvas() {
  const w = 500,
    h = 300
  // 实际宽高(为了适应屏幕分辨率，增加清晰度)
  canvasRef.value.width = w * devicePixelRatio.value
  canvasRef.value.height = h * devicePixelRatio.value
  // 显示宽高
  canvasRef.value.style.width = w + 'px'
  canvasRef.value.style.height = h + 'px'
  ctx.value = canvasRef.value.getContext('2d')
}

// 图形列表
const shapes = ref([])

// 判断坐标是否已绘制形状
function getShape(x, y) {
  for (let i = shapes.value.length - 1; i >= 0; i--) {
    // 为了利于维护，需要根据形状进行判断
    // if (shapes[i].minX <= x && shapes[i].maxX >= x && shapes[i].minY <= y && shapes[i].maxY >= y) {
    //     return shapes[i];
    // }
    let shape = shapes.value[i]
    if (shape.isInside(x, y)) {
      return shape
    }
  }
  return null
}

/**
 * @method draw
 * @description 批量绘制
 */
function draw() {
  // 要求每帧都绘制
  // requestAnimationFrame(draw)
  // clearRect(清除矩形x坐标，清除矩形y坐标，清除矩形宽度，清除矩形高度)
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  for (const shape of shapes.value) {
    shape.draw(ctx.value, devicePixelRatio.value)
  }
}
onMounted(() => {
  initDevicePixelRatio()
  initCanvas()
  canvasRef.value.onmousedown = (e) => {
    // 此时的e相对于画布
    let shape = getShape(e.offsetX, e.offsetY)
    let canvasRefReact = canvasRef.value.getBoundingClientRect()
    if (shape) {
      // 移动位置
      // 记录起始坐标
      const sx = e.offsetX
      const sy = e.offsetY
      const { x1, y1, x2, y2 } = shape
      window.onmousemove = (e) => {
        // 画布上变化的坐标
        const x = e.clientX - canvasRefReact.left
        const y = e.clientY - canvasRefReact.top
        // 偏移量
        const dx = x - sx
        const dy = y - sy
        // 改变矩形位置
        shape.x1 = x1 + dx
        shape.y1 = y1 + dy
        shape.x2 = x2 + dx
        shape.y2 = y2 + dy
        draw()
      }
    } else {
      // 绘制新图形
      const rect = new Rectangle(e.offsetX, e.offsetY, colorPicker.value.value)
      shapes.value.push(rect)
      // 此时的e相对于视口
      window.onmousemove = (e) => {
        const x = e.clientX - canvasRefReact.left
        const y = e.clientY - canvasRefReact.top
        // 改变矩形结束位置
        rect.x2 = x
        rect.y2 = y
        draw()
      }
    }

    window.onmouseup = () => {
      // 清除事件
      window.onmousemove = null
      window.onmouseup = null
    }
  }
})
</script>
<style lang="scss" scoped>
.sketchpad-box {
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  canvas {
    background-color: #c1c1c1;
  }
}
</style>
