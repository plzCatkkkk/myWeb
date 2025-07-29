<template>
  <div class="fullscreen-background waving-background flex-box">
    <!-- <div class="joker">我请问呢</div> -->
    <div class="item-card" @mousemove.stop="onMousemove" @mouseleave="onMouseleave">
      project
      <div class="jump-icon" @click="goto('/project')">
        <img src="@assets/icon/left-arrow.svg" alt="go to project" />
      </div>
    </div>
    <div class="item-card" @mousemove.stop="onMousemove" @mouseleave="onMouseleave">
      demo
      <div class="jump-icon" @click="goto('/demolist')">
        <img src="@assets/icon/right-arrow.svg" alt="go to demo" />
      </div>
    </div>
  </div>
</template>
<script setup>
defineComponent({
  name: 'Entrance',
})

const router = useRouter()
const goto = (path) => {
  router.push(path)
}

const range = [-3, 3]
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
  const { offsetX, offsetY, target } = e
  const { width, height } = target.getBoundingClientRect()
  const x = getRotation(range, offsetY, width)
  const y = -getRotation(range, offsetX, height)
  target.style.setProperty('--rotate-x', `${x}deg`)
  target.style.setProperty('--rotate-y', `${y}deg`)
}
const onMouseleave = (e) => {
  e.target.style.setProperty('--rotate-x', '0deg')
  e.target.style.setProperty('--rotate-y', '0deg')
}
</script>
<style lang="scss" scoped>
@keyframes rotation {
}
// 一个全局样式不显示问题了折腾俩小时（可能仅仅是撞上了特殊情况）
// 问题：全局样式另一页能够显示这一页(当前页)不显示，观察发现，空scoped不添加唯一属性data-v-xxxxx，非空scoped才会添加唯一属性
// 解决方案：在这里显式定义样式（加个joker），添加后这里也能生成唯一属性
// 分析：样式作用域问题？但奇怪的是有唯一属性反而能正常显示，无唯一属性反而显示不了，孩子我真的不行了
.joker {
  background-color: #fff;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  gap: 50px;
  .item-card {
    background-color: #fff;
    height: 60vh;
    width: 40vh;
    border-radius: 20px;
    transition: 0.3s;
    opacity: 0.8;
    font-size: 36px;
    display: flex;
    padding: 40px;
    font-weight: bold;
    color: rgb(50, 154, 156);
    box-sizing: border-box;
    position: relative;
    &:hover {
      scale: 1.03;
      opacity: 1;
      box-shadow: 2px 4px 12px 2px rgba(29, 104, 161, 0.272);
      transform: perspective(500px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg));
    }
    .jump-icon {
      cursor: pointer;
      position: absolute;
      background: linear-gradient(45deg, #00e0ff, #0dceda, #ebfffa);
      top: auto;
      bottom: 40px;
      left: 50%;
      right: auto;
      transform: translateX(-50%);
      height: 56px;
      width: 56px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background 0.5s ease-out;
      img {
        scale: 0.9;
      }
      &:hover {
        // animation: rotation 1s infinite ease-in-out;
      }
    }
    &:nth-child(1).jump-icon img {
      transform: translateX(2px);
    }
    &:nth-child(2).jump-icon img {
      transform: translateX(-2px);
    }
  }
}
// 屏幕尺寸适配
@media screen and (max-width: 900px) {
  .flex-box {
    flex-direction: column;
    gap: 50px;
    .item-card {
      width: 65vw;
      height: 25vh;
      .jump-icon {
        right: 40px;
        left: auto;
        bottom: auto;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
