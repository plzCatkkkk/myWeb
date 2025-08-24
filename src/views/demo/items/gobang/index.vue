<template>
  <div
    class="fullscreen-background custom"
    :class="{
      center: layout === 1,
      leftAndRight: layout === 2,
    }"
  >
    <div class="player">
      <div class="stone-type1" :class="{ black: pfMap[1] === 0, white: pfMap[1] === 1 }"></div>
      <div class="player1">
        <cbt
          ref="cbtRef"
          :isEnd="isEnd"
          :state="isEnd ? (curFlag === pfMap[1] ? 3 : 4) : curFlag === pfMap[1] ? 2 : 1"
        ></cbt>
      </div>
    </div>
    <div class="gobang-container">
      <div class="slot">
        <span class="custom-button-cbt" @click="layout = 1" v-if="layout !== 1">布局1</span>
        <span class="custom-button-cbt" @click="layout = 2" v-else>布局2</span>
        <span class="custom-button-yj" @click="openRuleDialog">RIF规则</span>
        <span class="custom-button-cbt" @click="reset">重开</span>
      </div>
      <div class="gobang-board" @mouseleave="curHover = [null, null]">
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
            ref="cellRefs"
            @click="dropPoint(xIndex, yIndex)"
            @mouseenter="changeHover(xIndex, yIndex)"
          >
            <div
              class="gobang-stone"
              :class="{
                black: cell === 0,
                white: cell === 1,
              }"
              v-if="cell !== '*'"
            ></div>
            <div
              class="gobang-stone virtual"
              :class="{
                black: curFlag === 0,
                white: curFlag === 1,
              }"
              v-if="curHover[0] === xIndex && curHover[1] === yIndex"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="player">
      <div class="stone-type2" :class="{ black: pfMap[2] === 0, white: pfMap[2] === 1 }"></div>
      <div class="player2">
        <yj
          ref="yjRef"
          :isEnd="isEnd"
          :state="isEnd ? (curFlag === pfMap[2] ? 3 : 4) : curFlag === pfMap[2] ? 2 : 1"
        ></yj>
      </div>
    </div>
    <dialog-rif-rule v-model:visible="ruleDialogVisible" @updata="changeRule()"></dialog-rif-rule>
  </div>
</template>
<script setup>
import cbt from './player/cbt/index.vue'
import yj from './player/yj/index.vue'
import cloneDeep from 'lodash/cloneDeep'
import dialogRifRule from './dialog-rif-rule.vue'
import useDemoDataStore from '@stores/demo-data'
defineComponent({
  name: 'Gobang',
})

const gobangRule = computed(() => useDemoDataStore().getGobang())

const cbtRef = ref(null)
const yjRef = ref(null)

const layout = ref(1) //1：棋盘居中布局 2：人物棋盘左右布局

const chessboardData = ref([])
chessboardData.value = Array.from({ length: 15 }, () => Array(15).fill('*')) //初始化棋盘

// 玩家棋子映射，键对应玩家，值对应棋子
const pfMap = ref({
  1: 0,
  2: 1,
})

// 开局规则落子范围map，键对应回合，值对应落子范围
const startMap = ref({
  1: [[7, 7]],
  2: [
    [6, 6],
    [6, 7],
    [6, 8],
    [7, 6],
    [7, 8],
    [8, 6],
    [8, 7],
    [8, 8],
  ],
})
startMap.value[3] = [
  ...startMap.value[2],
  [5, 5],
  [5, 6],
  [5, 7],
  [5, 8],
  [5, 9],
  [6, 5],
  [6, 9],
  [7, 5],
  [7, 9],
  [8, 5],
  [8, 9],
  [9, 5],
  [9, 6],
  [9, 7],
  [9, 8],
  [9, 9],
]

const round = ref(1) //第几手
const isEnd = ref(false)
const curFlag = ref(0) // 0:黑 1:白
const curHover = ref([null, null])

const changeHover = (xIndex, yIndex) => {
  if (chessboardData.value[xIndex][yIndex] !== '*') {
    curHover.value = [null, null]
    return
  }
  if (gobangRule.value.rifOpen) {
    // 进入开局规则
    if (
      round.value < 4 &&
      !startMap.value[round.value].some((item) => {
        return item[0] == xIndex && item[1] == yIndex
      })
    ) {
      curHover.value = [null, null]
      return
    }
  }
  curHover.value = [xIndex, yIndex]
}

/**
 * @method dropPoint 落子方法
 * @param {number} xIndex x坐标
 * @param {number} yIndex y坐标
 */
async function dropPoint(xIndex, yIndex) {
  // 判断是否结束
  if (isEnd.value) return
  // 判断是否已落子
  if (chessboardData.value[xIndex][yIndex] !== '*') return
  // 判断开局规则条件
  if (gobangRule.value.rifOpen) {
    if (
      round.value < 4 &&
      !startMap.value[round.value].some((item) => {
        return item[0] == xIndex && item[1] == yIndex
      })
    ) {
      return
    }
  }
  chessboardData.value[xIndex][yIndex] = curFlag.value
  round.value++
  curHover.value = [null, null]
  if (isWin(curFlag.value)) {
    // 结束
    isEnd.value = true
    if (curFlag.value == pfMap.value[1]) {
      cbtRef.value.win()
      yjRef.value.fail()
    } else {
      cbtRef.value.fail()
      yjRef.value.win()
    }
  } else {
    // 继续
    if (curFlag.value == pfMap.value[1]) {
      cbtRef.value.objection()
      curFlag.value = curFlag.value === 0 ? 1 : 0
      await nextTick()
      yjRef.value.reset()
    } else {
      yjRef.value.objection()
      curFlag.value = curFlag.value === 0 ? 1 : 0
      await nextTick()
      cbtRef.value.reset()
    }
  }
}
/**
 * @method 判断战况
 * @param {number} flag 0:黑 1:白
 * @return {boolean} 是否胜利
 */
function isWin(flag) {
  return getAllBoardArray().some((row) => {
    return hasSeriesPoint(row, flag)
  })
}
// 没苦硬吃的写法hhhh
/**
 * @generator 每行的生成器
 */
function* rowGenerator(array) {
  for (var i = 0; i < array.length; i++) {
    yield array[i]
  }
  yield
}
/**
 * @method获取对角线数组
 * @param {number} direction 方向  0: 左上到右下方向  1: 右上到左下方向
 * @returns {Array} 对角线数组
 */
function getCrossArray(direction) {
  let result = []
  let tempData = cloneDeep(chessboardData.value)
  if (!direction) {
    tempData.reverse()
  }
  let dataRowGnrt = tempData.map((item, index) => {
    return rowGenerator(item)
  })

  for (let i = 0; i < 29; i++) {
    let tempArray = []
    for (let j = 0; j <= i; j++) {
      tempArray.push(dataRowGnrt[j > 14 ? j - 14 : j].next())
    }
    result.push(
      tempArray.map((item) => {
        return item.value === undefined ? '' : item.value
      }),
    )
  }
  return result
}
/**
 * @method 获取所有行
 * @returns {Array} 所有行包括对角数组
 */
function getAllBoardArray() {
  let allRowArray = []
  let allColumnArray = []
  let allCrossArray = []
  allRowArray = chessboardData.value
  for (let i = 0; i < 15; i++) {
    allColumnArray.push(chessboardData.value.map((item) => item[i]))
  }
  allCrossArray = [...getCrossArray(0), ...getCrossArray(1)]
  return [...allRowArray, ...allColumnArray, ...allCrossArray]
}
/**
 * @method 判断连线
 * @param {Array} pointArray 行索引
 * @param {number} flag 棋子颜色
 * @return {boolean} 是否连线
 */
function hasSeriesPoint(pointArray, flag) {
  if (pointArray.join('').includes(String(flag).repeat(5))) {
    return true
  } else {
    return false
  }
}

async function reset() {
  isEnd.value = false
  curFlag.value = 0
  round.value = 1
  chessboardData.value = Array.from({ length: 15 }, () => Array(15).fill('*'))
  await nextTick()
  yjRef.value.reset()
  cbtRef.value.reset()
}

const ruleDialogVisible = ref(false)
function openRuleDialog() {
  ruleDialogVisible.value = true
}
function changeRule() {
  reset()
}
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
    position: relative;
    // 临时按键插槽
    .slot {
      position: absolute;
      top: 0;
      left: 0;
      height: 40px;
      width: 100%;
      span {
        display: inline-block;
        padding: 8px;
        @extend .cur-pointer;
      }
    }
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
      height: 0.5vmax;
      width: 0.5vmax;
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
    &.virtual {
      opacity: 0.5;
    }
  }
}
@mixin stone-type-left($color, $text) {
  margin: 6px;
  &::after {
    content: $text;
    display: inline-block;
    font-size: larger;
    color: $color;
  }
  &::before {
    content: '';
    display: inline-block;
    background-color: $color;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: translateY(2px);
    margin: 0 5px;
  }
}
@mixin stone-type-right($color, $text) {
  margin: 6px;
  &::after {
    content: '';
    display: inline-block;
    background-color: $color;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: translateY(2px);
    margin: 0 5px;
  }
  &::before {
    content: $text;
    display: inline-block;
    font-size: larger;
    color: $color;
  }
}
.custom {
  &.leftAndRight {
    .player {
      float: left;
      height: 50vh;
      width: calc(100vw - $--board-size);
      position: relative;
      .stone-type1 {
        position: absolute;
        bottom: 0;
        right: 0;
        &.white {
          @include stone-type-right(white, '白棋');
        }
        &.black {
          @include stone-type-right(black, '黑棋');
        }
      }
      .stone-type2 {
        position: absolute;
        top: 0;
        left: 0;
        &.white {
          @include stone-type-left(white, '白棋');
        }
        &.black {
          @include stone-type-left(black, '黑棋');
        }
      }
      &1 {
        // 阻止元素事件
        pointer-events: none;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
      }
      &2 {
        // 阻止元素事件
        pointer-events: none;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 1;
      }
    }
    .gobang-container {
      float: right;
    }
  }
  &.center {
    .player {
      float: left;
      height: 100vh;
      width: calc(50vw - $--board-size/2);
      position: relative;
      .stone-type1 {
        position: absolute;
        top: 0;
        right: 0;
        &.white {
          @include stone-type-right(white, '白棋');
        }
        &.black {
          @include stone-type-right(black, '黑棋');
        }
      }
      .stone-type2 {
        position: absolute;
        top: 0;
        left: 0;
        &.white {
          @include stone-type-left(white, '白棋');
        }
        &.black {
          @include stone-type-left(black, '黑棋');
        }
      }
      &1 {
        // 阻止元素事件
        pointer-events: none;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
      }
      &2 {
        // 阻止元素事件
        pointer-events: none;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 1;
      }
    }
    .gobang-container {
      float: left;
    }
  }
  .player {
    &:nth-child(1) {
      background-color: #3f72af;
    }
    &:nth-child(3) {
      background-color: #88304e;
    }
  }
}
@media (max-width: 1200px) {
  .player {
    // display: none;
  }
}
</style>
