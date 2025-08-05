// 图形类--矩形
class Rectangle {
  // 鼠标按下后获取起始位置和颜色
  constructor(x1, y1, color) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x1
    this.y2 = y1
    this.color = color
  }
  // 访问器
  get minX() {
    return Math.min(this.x1, this.x2)
  }
  get minY() {
    return Math.min(this.y1, this.y2)
  }
  get maxX() {
    return Math.max(this.x1, this.x2)
  }
  get maxY() {
    return Math.max(this.y1, this.y2)
  }
  /**
   * 绘制图形
   * @method draw
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dpr 屏幕缩放比
   */
  draw(ctx, dpr) {
    ctx.fillStyle = this.color
    // 为了保持清晰度还需要乘dpr
    ctx.fillRect(
      this.minX * dpr,
      this.minY * dpr,
      (this.maxX - this.minX) * dpr,
      (this.maxY - this.minY) * dpr,
    )
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 3 * dpr
    ctx.strokeRect(
      this.minX * dpr,
      this.minY * dpr,
      (this.maxX - this.minX) * dpr,
      (this.maxY - this.minY) * dpr,
    )
  }
  isInside(x, y) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY
  }
}
export { Rectangle }
