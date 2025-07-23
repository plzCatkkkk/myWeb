<template>
  <div class="full-screen">
    <div class="content">
      <h1 class="title">Demo</h1>
      <div class="list-wrapper" ref="listWrapperRef">
        <div class="list-content" ref="listContent">
          <div class="list-item" v-for="item in listData" :key="item.name">{{ item.name }}</div>
          <!-- <div class="list-item" v-for="item in 4" :key="item.index">{{ 123 }}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, computed, ref, watch } from 'vue'
import { DemoItemsRoute } from '../items/items.route'

const listData = computed(() => DemoItemsRoute())

const listWrapperRef = ref(null)
const isOverflow = computed(() => {
  if (!listWrapperRef.value) return false
  return listWrapperRef.value?.scrollHeight > listWrapperRef.value?.clientHeight
})
watch(
  isOverflow,
  (newVal) => {
    if (!listWrapperRef.value) return
    listWrapperRef.value.classList.toggle('is-overflow', newVal)
  },
  { immediate: true },
)
// 监视元素变化实时判断滚动条悬浮状态
onMounted(() => {
  const observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    // console.log('元素监视', entry.target.scrollHeight > entry.target.clientHeight)
    listWrapperRef.value.classList.toggle(
      'is-overflow',
      entry.target.scrollHeight > entry.target.clientHeight,
    )
  })

  if (listWrapperRef.value) {
    observer.observe(listWrapperRef.value)
  }
  onUnmounted(() => observer.disconnect())
})
</script>
<style lang="scss" scoped>
@keyframes movement {
  0%,
  100% {
    background-size:
      130vmax 130vmax,
      80vmax 80vmax,
      90vmax 90vmax,
      90vmax 90vmax,
      60vmax 60vmax;
    background-position:
      -80vmax -80vmax,
      60vmax -30vmax,
      10vmax 10vmax,
      -30vmax -10vmax,
      50vmax 50vmax;
  }
  25% {
    background-size:
      100vmax 100vmax,
      90vmax 90vmax,
      100vmax 100vmax,
      110vmax 110vmax,
      90vmax 90vmax;
    background-position:
      -60vmax -90vmax,
      50vmax -40vmax,
      0vmax -20vmax,
      -40vmax -20vmax,
      40vmax 60vmax;
  }
  50% {
    background-size:
      80vmax 80vmax,
      110vmax 110vmax,
      80vmax 80vmax,
      60vmax 60vmax,
      80vmax 80vmax;
    background-position:
      -50vmax -70vmax,
      40vmax -30vmax,
      10vmax 0vmax,
      20vmax 10vmax,
      30vmax 70vmax;
  }
  75% {
    background-size:
      90vmax 90vmax,
      90vmax 90vmax,
      100vmax 100vmax,
      90vmax 90vmax,
      70vmax 70vmax;
    background-position:
      -50vmax -40vmax,
      50vmax -30vmax,
      20vmax 0vmax,
      -10vmax 10vmax,
      40vmax 60vmax;
  }
}

.full-screen {
  height: 100vh;
  width: 100vw;
  background-color: rgba(68, 220, 223, 0.5);
  transition: transform 1s;
  transform: scale(1);
  overflow: hidden;
  // background-color: rgba(196, 123, 255, 0.5);
  background-image:
    // radial-gradient(closest-side, rgba(64, 158, 255, 1), rgba(64, 158, 255, 0)),
    // radial-gradient(closest-side, rgba(121, 121, 255, 1), rgba(121, 121, 255, 0)),
    // radial-gradient(closest-side, rgb(187, 103, 255), rgba(196, 123, 255, 0)),
    // radial-gradient(closest-side, rgb(255, 144, 227), rgba(255, 168, 233, 0)),
    // radial-gradient(closest-side, rgb(255, 204, 220), rgba(255, 159, 189, 0));

    radial-gradient(closest-side, #0dceda, rgba(64, 158, 255, 0)),
    radial-gradient(closest-side, #6ef3d6, rgba(121, 121, 255, 0)),
    radial-gradient(closest-side, #c6fce5, rgba(196, 123, 255, 0)),
    radial-gradient(closest-side, #ebfffa, rgba(255, 168, 233, 0)),
    radial-gradient(closest-side, #00e0ff, rgba(255, 159, 189, 0));
  background-size:
    130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax;
  background-position:
    -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;
  .content {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    padding: 50px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .title {
      font-size: 30px;
      line-height: 40px;
    }
    .list-wrapper {
      flex: 1;
      height: 300px;
      overflow: hidden;
      position: relative;
      &::-webkit-scrollbar {
        width: 8px; // 垂直滚动条宽度
        height: 8px; // 水平滚动条高度
      }
      //   补偿滚动条宽度导致的内容被挤压
      &.is-overflow:hover {
        margin-right: -8px;
        // padding-right: 8px;
        overflow: auto;
      }
      // 重写滚动条
      &::-webkit-scrollbar {
        width: 8px; // 垂直滚动条宽度
        height: 8px; // 水平滚动条高度
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(22, 74, 129, 0.2);
        border-radius: 5px;
      }
      &::-webkit-scrollbar-corner {
        background-color: transparent;
      }
      .list-content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 20px;
        .list-item {
          background-color: #fff;
          opacity: 0.6;
          border-radius: 20px;
          line-height: 60px;
          padding: 0 20px;
          height: 60px;
          box-shadow: 0px 2px 6px 0px rgba(29, 104, 161, 0.272);
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          // 禁止用户选中文字
          user-select: none; /* 标准属性 */
          -webkit-user-select: none; /* Safari/Chrome */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* IE/Edge */
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
