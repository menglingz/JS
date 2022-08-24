/**
 * 随机数
 * @param {Number} num1 起始数值
 * @param {Number} num2 结束数值
 */
function getRandomNumber(num1, num2) {
  let total_num = num2 - num1 + 1
  return Math.floor(Math.random() * total_num + num1)
}

/**
 * 时间格式化
 * @param {String} time 毫秒数
 */
function dateFormatting(time) {
  let YY = time.getFullYear()
  let MM = time.getMonth() + 1
  let DD = time.getDate()
  let hh = time.getHours()
  let mm = time.getMinutes()
  let ss = time.getSeconds()
  return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`
}

/**
 * 时间补零格式化
 * @param {String} time 毫秒数
 */
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

/**
 * 检测浏览器插件
 * @param {String} name 浏览器插件名字
 */
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

/**
 * 获取样式
 * @param {Object} element 获取样式的元素
 * @param {String} attr 要获取的样式
 */
function getStyle(element, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(element)[attr]
  } else {
    return element.currentStyle[attr]
  }
}

/**
 * location查询字符串格式化
 * @param {String} location 传入的location地址
 */
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

/**
 * 获取元素上的所有属性并格式化
 * @param {Object} element 传入的要获取属性的元素
 */
function outputAttributes(element) {
  let pairs = []
  for (let i = 0; i < element.attributes.length; i++) {
    const attribute = element.attributes[i]
    pairs.push(`${attribute.nodeName}="${attribute.nodeValue}"`)
  }
  return pairs.join(' ')
}

/**
 * 动态添加外部js文件
 * @param {String} url 传入的url地址
 */
function loadScript(url) {
  let script = document.createElement('script')
  script.src = url
  document.body.appendChild(script)
}

/**
 * 动态嵌入js源代码
 * @param {String} code 传入的javascript代码
 */
function loadScriptString(code) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  try {
    // 在标准浏览器中可以运行，但在旧版本的IE中可能会导致问题。IE对script元素作了处理，不允许常规DOM访问其子节点
    script.appendChild(document.createTextNode(code))
  } catch (ex) {
    // 在旧版本的IE中，script元素上有一个text属性可以用来添加javascript代码
    script.text = code
  }
  document.body.appendChild(script)
}
// loadScriptString("function sayHi(){alert('hi');}");

/**
 * 动态添加外部css样式表
 * @param {String} url 传入的url地址
 */
function loadStyles(url) {
  let link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 动态嵌入css源代码
 * @param {String} css 传入的css样式代码
 */
function loadStyleString(css) {
  let style = document.createElement('style')
  style.type = 'text/css'
  try {
    style.appendChild(document.createTextNode(css))
  } catch (ex) {
    style.styleSheet.cssText = css
  }
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(style)
}
// loadStyleString("body{background-color:red}");

/**
 * 防抖
 * @param {Function} func 要进行防抖的函数
 * @param {String} delay 延迟的毫秒数
 * @param {Boolean} immediate 表示是否立即执行
 */
function debounce(func, delay, immediate = true) {
  let timer

  return function (...args) {
    if (timer) clearTimeout(timer)

    // 默认立即执行方法，延后执行的话，会让人感觉有卡顿
    if (immediate) {
      // 定义现在是否能执行
      let now = !timer
      if (now) func.apply(this, args)
      // 不论timeout有没有值，都重新给timeout新添加一个定时器
      // 等待wait时间后，将timeout设为null，代表可以继续执行次function
      timer = setTimeout(() => {
        timer = null
      }, delay)
    } else {
      // 如果不是立即执行此函数，则在等待 delay 延迟时间后执行方法
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
}
