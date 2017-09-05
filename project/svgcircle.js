const svgCircle = class{
  constructor (arg={}) {
    this.params = {
      winWidth: document.body.clientWidth,
      svgTarget: 'svg',
      track: 'track',
      progress: 'progress',
      text: 'text'
    }
    Object.assign(this.params, arg)
    let svg = document.querySelector(`${this.params.svgTarget}`)
    this.track = document.querySelector(`.${this.params.track}`)
    this.progress = document.querySelector(`.${this.params.progress}`)
    this.text = document.querySelector(`${this.params.text}`)
    this.r = this.progress.getAttribute('r')
    this.perimeter = 2*Math.PI*this.r
    this.init()
  }

  init () {
    this.track.setAttribute('stroke-dasharray', this.perimeter)
    this.track.setAttribute('cx', this.params.winWidth/2)
    this.progress.setAttribute('stroke-dasharray', `${this.perimeter},${this.perimeter}`)
    this.progress.setAttribute('cx', this.params.winWidth/2)
    this.text.setAttribute('x', this.params.winWidth/2)

    let countProgress = 0
    const f= () => {
      if(countProgress <= this.perimeter*1){
        countProgress++
        this.text.textContent = (countProgress/this.perimeter*100).toFixed(0)+'%'
        this.progress.setAttribute('stroke-dashoffset', -countProgress)
        if((countProgress/this.perimeter*100) >= 99){
          this.progress.setAttribute('stroke-dashoffset', -this.perimeter)
        }
      }
      window.requestAnimationFrame(f)
    }
    f()
  }
}

export {
  svgCircle
}
