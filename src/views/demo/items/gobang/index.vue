<template>
  <div class="fullscreen-background custom">
    <div class="player"></div>
    <div class="gobang-container">
      <div class="gobang-board">
        <div class="gobang-row" v-for="(row, xIndex) in chessboardData" :key="xIndex">
          <div
            class="gobang-cell normal"
            v-for="(cell, yIndex) in chessboardData[xIndex]"
            :key="yIndex"
            :class="{
              l: yIndex === 0,
              b: xIndex === 14,
              t: xIndex === 0,
              r: yIndex === 14,
            }"
          >
            <div class="gobang-stone black" v-if="cell === '0'"></div>
            <div class="gobang-stone white" v-if="cell === '1'"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="player"></div>
  </div>
</template>
<script setup>
defineComponent({
  name: 'Gobang',
})

const chessboardData = ref([])
chessboardData.value = Array.from({ length: 15 }, () => Array(15).fill('')) //初始化棋盘
chessboardData.value[2][7] = '1'
chessboardData.value[2][6] = '0'
</script>
<style lang="scss" scoped>
$--board-size: calc(100vmin - 80px);
$--cell-size: calc((100vmin - 100px) / 15);
$--cell-size-half: calc($--cell-size / 2);
.gobang {
  &-container {
    width: $--board-size;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }
  &-board {
    width: $--board-size;
    height: $--board-size;
    background-color: #dcb385;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
    &::after {
      content: '';
      background-color: #4f3c30;
      position: absolute;
      display: block;
      height: 6px;
      width: 6px;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-40%, -40%);
      box-shadow:
        calc($--cell-size * 4) calc($--cell-size * 4) 0 #4f3c30,
        calc($--cell-size * 4) calc($--cell-size * -4) 0 #4f3c30,
        calc($--cell-size * -4) calc($--cell-size * 4) 0 #4f3c30,
        calc($--cell-size * -4) calc($--cell-size * -4) 0 #4f3c30;
    }
  }
  &-row {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  &-cell {
    flex: 1;
    position: relative;
    &.normal {
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: $--cell-size;
        height: 1px;
        transform: scaleY(0.5); // 解决下粗细不均
        background-color: #4f3c30;
        top: $--cell-size-half;
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 1px;
        height: $--cell-size;
        transform: scaleX(0.5); // 解决下粗细不均
        background-color: #4f3c30;
        left: $--cell-size-half;
      }
    }
    // 特殊格子
    &.l {
      &::before {
        width: $--cell-size-half;
        left: $--cell-size-half;
      }
    }
    &.b {
      &::after {
        height: $--cell-size-half;
        top: 0;
      }
    }
    &.t {
      &::after {
        height: $--cell-size-half;
        top: $--cell-size-half;
      }
    }
    &.r {
      &::before {
        width: $--cell-size-half;
        left: 0;
      }
    }
  }
  &-stone {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc($--cell-size * 0.8);
    height: calc($--cell-size * 0.8);
    border-radius: 50%;
    z-index: 1;
    $--box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.272);
    &.black {
      background-color: #000;
      background-image: radial-gradient(#8e8e8e, transparent);
      background-position: 100% 100%;
      background-size: 150% 150%;
      background-repeat: no-repeat;
      box-shadow:
        $--box-shadow,
        inset 2px 2px 8px 2px rgba(0, 0, 0, 0.272);
    }
    &.white {
      background-color: #f1f1f1;
      background-image: radial-gradient(#ffffff, transparent);
      background-position: 100% 100%;
      background-size: 150% 150%;
      background-repeat: no-repeat;
      box-shadow:
        $--box-shadow,
        inset -2px -2px 8px 2px rgba(0, 0, 0, 0.253);
    }
  }
}
.custom {
  display: flex;
  .player {
    // background-color: #6c5c5c;
    flex: 1;
  }
}
@media (max-width: 1200px) {
  .player {
    display: none;
  }
}
</style>
