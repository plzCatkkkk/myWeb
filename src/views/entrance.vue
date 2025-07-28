<template>
  <div class="fullscreen-background waving-background">
    <div class="joker">我请问呢</div>
  </div>
</template>
<script setup>
defineComponent({
  name: 'Entrance',
})
</script>
<style lang="scss" scoped>
// 一个全局样式不显示问题了折腾俩小时（可能仅仅是撞上了特殊情况）
// 问题：全局样式另一页能够显示这一页(当前页)不显示，观察发现，空scoped不添加唯一属性data-v-xxxxx，非空scoped才会添加唯一属性
// 解决方案：在这里显式定义样式（加个joker），添加后这里也能生成唯一属性
// 分析：样式作用域问题？但奇怪的是有唯一属性反而能正常显示，无唯一属性反而显示不了，孩子我真的不行了
.joker {
  background-color: #fff;
}
</style>
