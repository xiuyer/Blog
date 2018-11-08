<template>
  <div class="banner banner-wrapper" id="banner">
    <ul class="img-list">
      <li class="show"><img src="../../../static/picture/1.jpg"/></li>
      <li><img src="../../../static/picture/2.jpg"/></li>
      <li><img src="../../../static/picture/3.jpg"/></li>
      <li><img src="../../../static/picture/4.jpg"/></li>
      <li><img src="../../../static/picture/5.jpg"/></li>
      <li><img src="../../../static/picture/6.jpg"/></li>
    </ul>
    <ul class="img-box">
      <!-- <li class="on">
        <div class="front"></div>
        <div class="bottom"></div>
        <div class="top"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="back"></div>
      </li> -->
    </ul>
    <div class="prev">&lt;</div>
    <div class="next">&gt;</div>
    <ul class="btn">
      <li class="on"></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script>
class Banner {
  constructor (el) {
    this.oWrap = document.getElementById(el)
    this.oImgList = this.oWrap.querySelector('.img-list')
    this.aLiItem = this.oImgList.getElementsByTagName('li')
    this.oImgBox = this.oWrap.querySelector('.img-box')
    this.oPrev = this.oWrap.querySelector('.prev')
    this.oNext = this.oWrap.querySelector('.next')
    this.aBtn = this.oWrap.getElementsByClassName('btn')[0].getElementsByTagName('li')
    this.oCss = document.getElementById('css')
    this.countLi = 8 * 5
    this.arrSide = ['up', 'down', 'left', 'right']
    this.last = 0
    this.arrLi = []
    this.imgArr = []
    this.t = new Date()
    this.timer = 0
  }

  init () {
    this.imgArr = Array.from(this.oImgList.getElementsByTagName('img')).map((item) => {
      return item.src
    })
    // 生成li正方体
    for (let i = 0; i < this.countLi; i++) {
      let oLi = document.createElement('li')
      let [x, y] = [i % 8, Math.floor(i / 8)]
      oLi.style.animationDelay = `${i * 15}ms`
      oLi.innerHTML = `<div class="front"></div>
                    <div class="bottom"></div>
                    <div class="top"></div>
                    <div class="left"></div>
                    <div class="right"></div>
                    <div class="back"></div>`
      this.oImgBox.appendChild(oLi)
      this.arrLi.push(oLi)
      let aDiv = oLi.getElementsByTagName('div')
      for (let j = 0; j < aDiv.length; j++) {
        aDiv[j].style.backgroundPosition = `${-x * 0.8}rem ${-y * 0.8}rem`
      }
    }
  }

  turn (index) {
    if (new Date() - this.t < 2000) return
    this.t = new Date()
    this.oCss.innerHTML = `.banner .img-box li .front{
  background-image: url("${this.imgArr[this.last]}");
}
.banner .img-box li div+div{
  background-image: url("${this.imgArr[index]}");
}`
    this.aLiItem[this.last].classList.remove('show')
    this.oImgList.classList.add('hide')
    this.aBtn[this.last].classList.remove('on')
    this.aBtn[index].classList.add('on')
    for (let i = 0; i < this.countLi; i++) {
      let side = this.arrSide[Math.floor(Math.random() * 4)]
      this.arrLi[i].side = side
      this.arrLi[i].classList.add(side)
    }
    this.last = index
    setTimeout(() => {
      this.aLiItem[index].classList.add('show')
      this.oImgList.classList.remove('hide')
      this.oCss.innerHTML = `.banner .img-box li div{
    background-image: url("${this.imgArr[index]}");
  }`
      for (let i = 0; i < this.countLi; i++) {
        this.arrLi[i].classList.remove(this.arrLi[i].side)
      }
    }, 2000)
  }

  regEvent () {
    let _this = this
    this.oPrev.onclick = function () {
      let i = (_this.last - 1) < 0 ? 5 : _this.last - 1
      _this.turn(i)
    }
    this.oNext.onclick = function () {
      let i = (_this.last + 1) % 6
      _this.turn(i)
    }
    this.oWrap.onmouseenter = function () {
      clearTimeout(_this.timer)
    }
    this.oWrap.onmouseleave = function () {
      _this.timer = setTimeout(_this.rander.bind(_this), 3000)
    }

    for (let i = 0; i < this.aBtn.length; i++) {
      this.aBtn[i].onclick = this.turn.bind(this, i)
    }
  }
  rander () {
    let i = (this.last + 1) % 6
    this.turn(i)
    this.timer = setTimeout(this.rander.bind(this), 4000)
  }
  start () {
    this.init()
    this.regEvent()
    this.timer = setTimeout(this.rander.bind(this), 5000)
  }
}
export default {
  name: 'banner',
  data () {
    return {
      banner: {}
    }
  },
  mounted () {
    this.banner = new Banner('banner')
    this.banner.start()
  }
}
</script>
