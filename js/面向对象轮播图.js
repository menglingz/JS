function Banner(obj) {
  Object.assign(this, obj)
  this._mouseenter()
  this._mouseleave()
  this._click()
}
var that = Banner.prototype
console.log(that)
Banner.prototype = {
  // 定义一个变量，表示当前图片为第几张
  index: 0,

  // 定时器开关
  tag: false,

  // // 定时器
  // time: setInterval(function () {
  //   console.log(this.that)
  //   // 切换到下一张
  //   this.that.changeImg(true)
  // }, 2000),

  // 图片切换
  changeImg(step) {
    this.imgs[this.index].className = ''
    this.points[this.index].className = ''

    // 传入的tag为true，代表点击的是右按钮，让index加一，使其切换到下一张图片
    if (step === true) {
      this.index++
    } else if (step === false) {
      // 传入的tag为false，代表点击的是左按钮，让index减一，使其切换到上一张图片
      this.index--
    } else {
      // 传入的tag为数字索引，代表点击的是小圆点，将index的值与tag同步，使其点击那个小圆点就切换到小圆点所对应的图片
      this.index = step
    }
    // 处理index的边界情况
    if (this.index >= this.imgs.length) {
      // 到达最后一张，使其跳转到第一张
      this.index = 0
    }
    if (this.index < 0) {
      // 到达第一张，使其跳转到最后一张
      this.index = this.imgs.length - 1
    }

    // 让改变后的index所对应的元素的特殊样式显示出来
    this.imgs[this.index].className = 'active'
    this.points[this.index].className = 'active'
  },

  // // 鼠标悬浮，关闭定时器
  _mouseenter() {
    let _this = this
    this.banner.addEventListener('mouseenter', function () {
      if (_this.time) {
        clearInterval(_this.time)
      }
      _this.tag = true
    })
  },

  // // 鼠标离开，开启定时器
  _mouseleave() {
    let _this = this
    this.banner.addEventListener('mouseleave', function () {
      if (_this.tag) {
        _this.time = setInterval(function () {
          // 切换到下一张
          _this.changeImg(true)
        }, 2000)
      }
      _this.tag = false
    })
  },

  // 通过冒泡给轮播图盒子添加点击事件
  _click() {
    let _this = this
    this.banner.addEventListener('click', function (e) {
      if (e.target.className === 'left') {
        console.log('点击的是左按钮')
        _this.changeImg(false)
      }
      if (e.target.className === 'right') {
        console.log('点击的是右按钮')
        _this.changeImg(true)
      }
      if (e.target.dataset.name === 'point') {
        console.log('点击的是焦点盒子')
        // 拿到小圆点的data-i值
        let point = e.target.dataset.i
        _this.changeImg(point)
      }
    })
  }
}
