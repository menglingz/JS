// 随机数
function getRandomNumber(num1, num2) {
  let total_num = num2 - num1 + 1
  return Math.floor(Math.random() * total_num + num1)
}

// 时间格式化
function dateFormatting(time) {
  let YY = time.getFullYear()
  let MM = time.getMonth() + 1
  let DD = time.getDate()
  let hh = time.getHours()
  let mm = time.getMinutes()
  let ss = time.getSeconds()
  return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`
}

// 时间补零格式化
function dateZeroFormat(time) {
  //计算天数
  d = parseInt(time / 60 / 60 / 24)
  //计算小时
  h = parseInt((time / 60 / 60) % 24)
  //计算分钟
  m = parseInt((time / 60) % 60)
  //计算秒
  s = parseInt(time % 60)
  // 补零
  d = d < 10 ? '0' + d : d
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return `${d}:${h}:${m}:${s}`
}

// 检测浏览器插件
function hasPlugin(name) {
  name = name.toLowerCase()
  // window.navigator.plugins 和name属性已被弃用
  for (let plugin of window.navigator.plugins) {
    if (plugin.name.toLocaleLowerCase().indexOf(name) > -1) {
      return true
    }
  }
  return false
}

// 获取样式
function getStyle(element, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(element)[attr]
  } else {
    return element.currentStyle[attr]
  }
}

// location查询字符串格式化
function getQueryStringArgs(location) {
  let qs = location.search.length > 0 ? location.search.substring(1) : ''
  let args = {}
  for (let item of qs.split('&').map((kv) => kv.split('='))) {
    let name = decodeURIComponent(item[0])
    let value = decodeURIComponent(item[1])
    if (name.length) {
      args[name] = value
    }
  }
  return args
}
