;(function () {
  const day = document.querySelector('.day')
  const hour = document.querySelector('.hour')
  const minute = document.querySelector('.minute')
  const second = document.querySelector('.second')
  const desc = document.querySelector('.desc')
  function seckill() {
    let start = Date.now()
    // let end = Date.UTC(2022, 7, 19, 9, 0, 0)
    let end = new Date('2022-08-19T09:00:00').getTime()
    //获取时间差，单位为秒
    var remaining = parseInt((end - start) / 1000)
    if (remaining > 0) {
      //判断秒杀是否过期
      //计算剩余天数
      d = parseInt(remaining / 60 / 60 / 24)
      //计算剩余小时
      h = parseInt((remaining / 60 / 60) % 24)
      //计算剩余分钟
      m = parseInt((remaining / 60) % 60)
      //计算剩余秒
      s = parseInt(remaining % 60)
      // 补零
      d = d < 10 ? '0' + d : d
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      // console.log(d, h, m, s)
    } else {
      //秒杀过期，取消定时器
      clearInterval(interval)
      d = h = m = s = '00'
      desc.innerHTML = '<strong>23:00</strong>点场 已结束'
    }
    day.innerHTML = d
    hour.innerHTML = h
    minute.innerHTML = m
    second.innerHTML = s
  }
  var interval = setInterval(seckill, 1000)
})()
