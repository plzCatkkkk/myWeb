/**
 * 改变图片模版
 * @param {*} carrier 载体
 * @param {*} img 图片
 * @param {*} time 持续时间
 * @param {*} callback 回调
 */
export function changeImgTemplate(carrier, img, time, callback) {
  carrier = img
  setTimeout(() => {
    callback()
  }, time)
}
