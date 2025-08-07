<template>
  <div class="fullscreen-background waving-background flex-box">
    <!-- <div class="joker">我请问呢</div> -->
    <com-active-card :range="range" shadow>
      <template #content>
        project
        <div class="jump-icon" @click="goto('/project')">
          <img src="@assets/icon/left-arrow.svg" alt="go to project" /></div
      ></template>
    </com-active-card>
    <com-active-card :range="range" shadow>
      <template #content>
        demo
        <div class="jump-icon" @click="goto('/demolist')">
          <img src="@assets/icon/right-arrow.svg" alt="go to demo" /></div
      ></template>
    </com-active-card>
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
    height: 60vh;
    width: 40vh;
    border-radius: 20px;
    font-size: 36px;
    display: flex;
    padding: 40px;
    font-weight: bold;
    color: rgb(50, 154, 156);
    position: relative;
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
