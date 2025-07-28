<template>
  <div class="fullscreen-background waving-background">
    <div class="content">
      <h1 class="title">Demo</h1>
      <div class="list-wrapper" ref="listWrapperRef">
        <div class="list-content" ref="listContent">
          <div class="list-item" @click="goto(item.path)" v-for="item in listData" :key="item.name">
            {{ item.name }}
          </div>
          <!-- <div class="list-item" v-for="item in 4" :key="item.index">{{ 123 }}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, computed, ref, watch } from 'vue'
import { DemoItemsRoute } from '../items/items.route'

defineComponent({
  name: 'DemoList',
})

const router = useRouter()
const goto = (path) => {
  router.push('/demo/' + path)
}

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
</style>
