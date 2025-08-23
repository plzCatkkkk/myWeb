const useDemoDataStore = defineStore('demo-data', {
  state: () => ({
    gobang: {},
  }),
  actions: {
    // 初始化
    init() {
      if (localStorage.hasOwnProperty('gobang')) {
        this.gobang = JSON.parse(localStorage.getItem('gobang'))
      } else {
        this.setDefaultGobang()
      }
    },
    // 获取值
    getGobang() {
      return this.gobang
    },
    // 更新值
    setGobang(data) {
      this.gobang = data
      localStorage.setItem('gobang', JSON.stringify(this.gobang))
    },
    // 设置默认值
    setDefaultGobang() {
      this.gobang = {
        rifOpen: false, //开启RIF开局规则
        threeRoundsExchange: false, //三手交换
        fiveRoundsTwoDrop: false, //五手两打
        blackForbidden: false, //禁手
      }
      localStorage.setItem('gobang', JSON.stringify(this.gobang))
    },
  },
})

export default useDemoDataStore
