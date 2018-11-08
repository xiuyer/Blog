<template>
  <canvas id="myCanvas"></canvas>
</template>
<script>
import common from './common.js'
export default {
  name: 'bgCanvas',
  mounted () {
    // 预处理
    /**
     * 生成指定[min,max)区间内的随机整数
     * @param min {number} 区间最小值
     * @param max {number} 区间最大值
     * @returns {number} [min,max)区间内的随机整数
     */
    let random = (min, max) => {
      return ~~(Math.random() * (max - min) + min)
    }
    // 兼容性处理
    window.requestAnimationFrame = window.requestAnimationFrame || function (fn) {
      return setTimeout(fn, 13)
    }
    let addEvent = common.addEvent()
    // 初始化变量
    const canvas = document.getElementById('myCanvas')
    const ctx = canvas.getContext('2d')
    let R1 = 80
    let R2 = 100
    let r = 3
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    let maxW = w - r
    let maxH = h - r
    let color = 'rgba(255,255,255,'
    let length = 100
    let arrPoint = []
    let ischeck = false
    let pos = {x: 0, y: 0}

    class Point {
      constructor () {
        this.x = random(r, maxW)
        this.y = random(r, maxH)
        this.vx = Math.random() - 0.5
        this.vy = Math.random() - 0.5
        this.flag = false
      }
      draw () {
        ctx.beginPath()
        ctx.fillStyle = color + '.3)'
        ctx.arc(this.x, this.y, r, 0, 2 * Math.PI)
        ctx.fill()
        this.x += this.vx
        this.y += this.vy
        if (this.x <= r || this.x >= maxW) this.vx *= -1
        if (this.y <= r || this.y >= maxH) this.vy *= -1
        this.x = Math.min(this.x, maxW)
        this.x = Math.max(0, this.x)
        this.y = Math.min(this.y, maxH)
        this.y = Math.max(0, this.y)
        if (this.flag) {
          this.flag = false
          this.vx = Math.random() - 0.5
          this.vy = Math.random() - 0.5
        }
      }
      moveToMouse () {
        var dis = Math.sqrt(Math.pow(this.x - pos.x, 2) + Math.pow(this.y - pos.y, 2))
        if (dis <= R2) {
          var aa = 0.1 * R2 / dis
          ctx.beginPath()
          ctx.strokeStyle = color + aa + ')'
          ctx.lineWidth = 2
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(pos.x, pos.y)
          ctx.stroke()
        }
        if (dis <= R2 + R1 * 0.7 && dis >= R2) {
          this.flag = true
          this.vx = (pos.x - this.x) / dis
          this.vy = (pos.y - this.y) / dis
        } else if (dis <= R2 - R1 / 8) {
          this.vx = 0.3 * (this.x - pos.x) / dis
          this.vy = 0.3 * (this.y - pos.y) / dis
        }
      }
    }
    // 初始化点数组
    for (let i = 0; i < length; i++) {
      let point = new Point()
      arrPoint.push(point)
      point.draw()
    }
    let render = () => {
      ctx.clearRect(0, 0, w, h)
      for (var i = 0; i < length; i++) {
        let pi = arrPoint[i]
        pi.draw()
        ischeck && pi.moveToMouse()
        for (var j = i + 1; j < length; j++) {
          let pj = arrPoint[j]
          var distance = Math.sqrt(Math.pow(pi.x - pj.x, 2) + Math.pow(pi.y - pj.y, 2))
          if (distance <= R1) {
            var a = 0.1 * R1 / distance
            ctx.beginPath()
            ctx.strokeStyle = color + a + ')'
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.stroke()
          }
        }
      }
      requestAnimationFrame(render)
    }
    render()
    addEvent(document, 'mousemove', function move (ev) {
      ischeck = true
      ev = ev || window.event
      pos.x = ev.clientX
      pos.y = ev.clientY
    })
    addEvent(document, 'mouseleave', function leave () {
      ischeck = false
    })
    addEvent(document, 'mouseenter', function enter () {
      ischeck = true
    })
    addEvent(window, 'resize', function resize () {
      canvas.width = w = document.documentElement.clientWidth
      canvas.height = h = document.documentElement.clientHeight
      maxW = w - r
      maxH = h - r
    })
  }
}
</script>
