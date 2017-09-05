/**
/@ params参数
  params={
    canvasId:'', // 画布id
    colorFill: '', // 字体填充颜色
    backgroundColor: '', // 背景色的填充颜色
    strockStyle: '', // 旋转颜色
    drawDirection: '', // 方向
    lineWidth: '', // 圆环的宽度
  }
*/
const initCircle = class{
  constructor (arg={}) {
    document.body.clientWidth/2
    this.params = {
      canvasId: 'myCanvas', // 画布id
      canvasWidth: document.body.clientWidth,
      canvasHeight: 150,
      positionX: document.body.clientWidth/2,
      positionY: 75,
      radius: 50,
      colorFill: '#f60', // 字体填充颜色
      fontSizeFill: 'bold 20px Arial',
      backgroundColor: '#bbb', // 背景色的填充颜色
      strockStyle: '#f60', // 旋转颜色
      drawDirection: true, // 方向
      lineWidth: 20, // 圆环的宽度
      beginPath: 0.01,
      endPath: 96
    };
    Object.assign(this.params, arg)
    this.canvas = document.getElementById(this.params.canvasId)
    this.canvas.width = this.params.canvasWidth
    this.canvas.height = this.params.canvasHeight
    this.ctx = this.canvas.getContext('2d')
    this.init()
  }
  init () {
    this.ctx.beginPath()
    this.ctx.arc(this.params.positionX, this.params.positionY, this.params.radius, 0, 2*Math.PI, this.params.drawDirection);
    this.ctx.lineWidth = this.params.lineWidth
    this.ctx.strokeStyle = this.params.backgroundColor
    this.ctx.stroke()
    this.drawCircle()
  }
  drawCircle () {
    const f = () => {
      if(this.params.beginPath < this.params.endPath){
        this.params.beginPath += 1
        this.drawCircle()
        this.beginDraw()
      }else{
        this.endDraw()
      }
    }
    window.requestAnimationFrame(f)
  }
  beginDraw () {
    this.ctx.clearRect(0, 0, this.params.canvasWidth, this.params.canvasHeight)

    this.ctx.beginPath()
    this.ctx.arc(this.params.positionX, this.params.positionY, this.params.radius, 0, 2*Math.PI, this.params.drawDirection);
    this.ctx.lineWidth = this.params.lineWidth
    this.ctx.strokeStyle = this.params.backgroundColor
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.arc(this.params.positionX, this.params.positionY, this.params.radius, 0, -Math.PI*(this.params.beginPath/100*2), this.params.drawDirection);
    this.ctx.strokeStyle = this.params.strockStyle
    this.ctx.stroke()

    this.ctx.font = this.params.fontSizeFill
    this.ctx.fillStyle = this.params.colorFill
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.moveTo(this.params.positionX, this.params.positionY)
    this.ctx.fillText((this.params.beginPath).toFixed(0)+'%', this.params.positionX, this.params.positionY,)
  }
  endDraw () {
    this.ctx.clearRect(0, 0, this.params.canvasWidth, this.params.canvasHeight)
    this.ctx.beginPath();
    this.ctx.arc(this.params.positionX, this.params.positionY, this.params.radius, 0, 2*Math.PI, this.params.drawDirection);
    this.ctx.lineWidth = this.params.lineWidth
    this.ctx.strokeStyle = this.params.backgroundColor
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(this.params.positionX, this.params.positionY, this.params.radius, 0, -Math.PI*(this.params.beginPath/100*2), this.params.drawDirection)
    this.ctx.strokeStyle = this.params.strockStyle
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.font = this.params.fontSizeFill
    this.ctx.fillStyle = this.params.colorFill
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.moveTo(this.params.positionX, this.params.positionY)
    this.ctx.fillText((this.params.beginPath).toFixed(0)+'%', this.params.positionX, this.params.positionY,)
  }
}
export {
  initCircle
}
