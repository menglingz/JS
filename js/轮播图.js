;(function () {
  // 获取元素
  const banner = document.querySelector('.banner')
  const imgs = document.querySelectorAll('ul>li')
  const points = document.querySelectorAll('ol>li')

  // 定义一个变量，表示当前图片为第几张
  var index = 0

  // 封装函数，图片切换
  function changeImg(step) {
    /* 
      排他思想，先让当前元素的所有active类名消失，不用for循环遍历所有，因为事件最开始的index代表还没改变前的index,
      即上一次操作的元素中唯一带有active类名的节点，将这个index所代表的元素的active去掉即可使所有的元素都没有特殊样式
    */
    imgs[index].className = ''
    points[index].className = ''

    // 传入的tag为true，代表点击的是右按钮，让index加一，使其切换到下一张图片
    if (step === true) {
      index++
    } else if (step === false) {
      // 传入的tag为false，代表点击的是左按钮，让index减一，使其切换到上一张图片
      index--
    } else {
      // 传入的tag为数字索引，代表点击的是小圆点，将index的值与tag同步，使其点击那个小圆点就切换到小圆点所对应的图片
      index = step
    }
    // 处理index的边界情况
    if (index >= imgs.length) {
      // 到达最后一张，使其跳转到第一张
      index = 0
    }
    if (index < 0) {
      // 到达第一张，使其跳转到最后一张
      index = imgs.length - 1
    }

    // 让改变后的index所对应的元素的特殊样式显示出来
    imgs[index].className = 'active'
    points[index].className = 'active'
  }
  // 定时器开关，防止生成多个定时器导致定时器速度加快
  var tag = false
  // 定时器，自动切换
  var time = setInterval(function () {
    // 切换到下一张
    changeImg(true)
  }, 2000)

  // 鼠标悬浮，关闭定时器
  banner.addEventListener('mouseenter', function () {
    if (time) {
      clearInterval(time)
    }
    tag = true
  })

  // 鼠标离开，开启定时器
  banner.addEventListener('mouseleave', function () {
    // tag为true的时候才定义一个定时器
    if (tag) {
      time = setInterval(function () {
        // 切换到下一张
        changeImg(true)
      }, 2000)
    }
    tag = false
  })

  // 通过冒泡给轮播图盒子添加点击事件
  banner.addEventListener('click', function (e) {
    if (e.target.className === 'left') {
      console.log('点击的是左按钮')
      changeImg(false)
    }
    if (e.target.className === 'right') {
      console.log('点击的是右按钮')
      changeImg(true)
    }
    if (e.target.dataset.name === 'point') {
      console.log('点击的是焦点盒子')
      // 拿到小圆点的data-i值
      let point = e.target.dataset.i
      changeImg(point)
    }
  })
})()
