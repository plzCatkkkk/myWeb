<template>
  <div class="fullscreen-background bg-color">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <div class="layer4"></div>
    <!-- 改变顺序可以改变标题层级 -->
    <div class="title">Starry Sky</div>
    <div class="layer5"></div>
  </div>
</template>
<script setup>
defineComponent({
  name: 'StarrySky',
})
</script>
<style lang="scss" scoped>
@use 'sass:string';
@use 'sass:math';
.title {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-wrap-mode: nowrap;
  background: linear-gradient(transparent, #ffffff);
  -webkit-background-clip: text;
  color: transparent;
  font-size: calc(8vmin + 2px);
  font-weight: bolder;
  //   盖两层元素实现底部描边效果（简直是甜菜）
  // 不管是before还是after，伪元素在这种情况下都只能覆盖在真元素上，设置z-index也无效
  &::after {
    content: 'Starry Sky';
    z-index: 1;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(#c1c1c1, #272727);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 8vmin;
    font-weight: bolder;
  }
}
.bg-color {
  background-color: #0e101c;
  background-image:
    //   声明顺序决定层叠顺序：第一个声明的背景图像在最上层，后续声明的背景图像依次在下层

    radial-gradient(closest-side, #ffc0a166, transparent),
    radial-gradient(closest-side, #243d53, transparent);
  background-size:
    100vmax 100vmax,
    200vmax 200vmax;
  background-position:
    top calc(100vh - 50vmax) left calc(50vw - 50vmax),
    top calc(100vh - 100vmax) left calc(50vw - 100vmax);
  background-repeat: no-repeat;
}
@function getShadows($n) {
  $result: '#{math.random(100)}vw #{math.random(100)}vh 1px 0 #fff';
  @for $i from 2 through $n {
    $result: '#{$result}, #{math.random(100)}vw #{math.random(100)}vh 1px 0 #fff';
  }
  // unquote函数去掉引号
  @return string.unquote($result);
}
@keyframes movement {
  // 反过来可以下雪hhh
  to {
    transform: translateY(-100vh);
  }
}
$duration: 400s;
@for $i from 1 through 5 {
  $duration: calc($duration / 2);
  $count: math.div(500, $i);
  $opacity: math.div($i, 10) + 0.5;
  //   $opacity: 1;
  .layer#{$i} {
    $size: #{$i}px;
    position: fixed;
    left: 0;
    top: 0;
    width: $size;
    height: $size;
    border-radius: 50%;
    opacity: $opacity;
    box-shadow: getShadows(math.floor($count));
    animation: movement $duration linear infinite;
    &::after {
      content: '';
      position: inherit;
      left: 0;
      top: 100vh;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      box-shadow: inherit;
    }
  }
}
</style>
