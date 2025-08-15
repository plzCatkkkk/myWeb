<template>
  <div class="fullscreen-background waving-background">
    <div class="content">
      <h1 class="title">Demo</h1>
      <div class="list-wrapper" :class="{ 'not-visable': displayMode !== 1 }" ref="listWrapperRef">
        <div class="list-content">
          <div
            class="list-item"
            v-for="(item, index) in listData"
            :key="index"
            :title="item.name"
            @click="goto(item.path)"
            ref="listItemRefs"
          >
            {{ item.name }}
          </div>
          <!-- <div class="list-item" v-for="item in 4" :key="item.index">{{ 123 }}</div> -->
        </div>
      </div>
      <div class="cards-wrapper" :class="{ 'not-visable': displayMode !== 2 }">
        <com-active-card
          v-for="(item, index) in listData"
          :key="index"
          ref="cardItemRefs"
          :range="range"
          :active="index === curIndex"
          :enlarge="index === curIndex"
          @click="clickItem(index === curIndex, item.path)"
        >
          <template #content>{{ item.name }}</template>
        </com-active-card>
        <div class="button-prev" @click="prevCard">
          {{ '<' }}
        </div>
        <div class="button-next" @click="nextCard">
          {{ '>' }}
        </div>
      </div>
    </div>
    <div class="switch" @click="changeDisplayMode()">
      <div class="switch-slider" :class="{ 'is-checked': displayMode !== 1 }">
        <div class="virtual-icon"></div>
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
const displayMode = ref(2) // 1: 列表模式 2: 卡片模式

const changeDisplayMode = () => {
  displayMode.value = displayMode.value === 1 ? 2 : 1
}

const listData = computed(() => DemoItemsRoute())

const listWrapperRef = ref(null)
const listItemRefs = ref([])

const range = ref([-3, 3])
const cardItemRefs = ref([])
const curIndex = ref(0)

function updateCard() {
  let dfv = 0
  cardItemRefs.value[curIndex.value].setCardStyle('', 'none', 1, 1)
  for (let i = curIndex.value + 1; i < cardItemRefs.value.length; i++) {
    dfv++
    cardItemRefs.value[i].setCardStyle(
      `translateX(${dfv * 180 - dfv ** 2 * 15}px) scale(${1 - dfv * 0.2}) perspective(20px) rotateY(-1deg)`,
      `blur(${dfv * 2}px)`,
      1 - dfv * 0.2,
      -dfv,
    )
  }
  dfv = 0
  for (let i = curIndex.value - 1; i >= 0; i--) {
    dfv++
    cardItemRefs.value[i].setCardStyle(
      `translateX(${-dfv * 180 + dfv ** 2 * 15}px) scale(${1 - dfv * 0.2}) perspective(20px) rotateY(-1deg)`,
      `blur(${dfv * 2}px)`,
      1 - dfv * 0.2,
      -dfv,
    )
  }
}

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
  console.log(cardItemRefs.value)
  updateCard()
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
onBeforeMount(() => {})
function prevCard() {
  curIndex.value--
  updateCard()
}
function nextCard() {
  curIndex.value++
  updateCard()
}
/**
 * 点击卡片
 * @param {boolean} isActive 是否可用
 * @param {string} path 路由地址
 */
function clickItem(isActive, path) {
  if (!isActive) return
  goto(path)
}
</script>
<style lang="scss" scoped>
.not-visable {
  display: none !important;
}
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .cards-wrapper {
    width: 100vw;
    height: calc(100vh - 130px);
    position: fixed;
    top: 130px;
    left: 0;
    display: flex;
    // position: relative;
    .item-card {
      position: absolute;
      border-radius: 20px;
      height: 400px;
      width: 300px;
      margin: auto 0;
      transition: all 0.5s ease-in-out;
      left: calc(50% - 150px);
      top: calc(50% - 200px);
      font-size: 32px;
      font-weight: bolder;
      padding: 40px;
      color: rgb(50, 154, 156);
    }
    .button {
      &-prev,
      &-next {
        cursor: pointer;
        position: absolute;
        left: 40px;
        width: 40px;
        height: 40px;
        top: calc(50% - 20px);
        font-size: 56px;
        font-weight: bolder;
        color: #ffffff;
        transform: scaleY(1.5);
      }
      &-next {
        left: auto;
        right: 40px;
      }
    }
  }
}
// 非常好看的按钮
.switch {
  position: fixed;
  top: 18px;
  right: 18px;
  width: 80px;
  height: 36px;
  background-color: rgba(29, 104, 161, 0.1);
  background-image: url('@assets/icon/list-white.svg'), url('@assets/icon/card-white.svg');
  background-size:
    24px 24px,
    24px 24px;
  background-position:
    8px 6px,
    48px 6px;
  border-radius: 12px;
  background-repeat: no-repeat;
  &-slider {
    width: 40px;
    height: 100%;
    background-color: #fff;
    border-radius: inherit;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    &.is-checked {
      transform: translateX(40px);
      .virtual-icon {
        left: -40px;
      }
    }
    .virtual-icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 80px;
      height: 36px;
      background-image: url('@assets/icon/list-green.svg'), url('@assets/icon/card-green.svg');
      background-size:
        24px 24px,
        24px 24px;
      background-position:
        8px 6px,
        48px 6px;
      background-repeat: no-repeat;
      transition: all 0.3s ease;
    }
  }
}
</style>
