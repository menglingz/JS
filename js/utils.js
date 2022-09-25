var utils = (function () {
  // 属于标准浏览器，不成立就是在ie6~8
  var flag = 'getComputedStyle' in window

  /**
   * 随机数
   * @param {Number} num1 起始数值
   * @param {Number} num2 结束数值
   * @param {Number} return 随机数值
   */
  function getRandomNumber(num1, num2) {
    num1 = Number(num1)
    num2 = Number(num2)
    if (isNaN(num1) || isNaN(num2)) {
      throw new TypeError('请输入数值类型')
    }
    if (num1 > num2) {
      var temp
      temp = num2
      num2 = num1
      num1 = temp
    }
    return Math.floor(Math.random() * (num2 - num1 + 1) + num1)
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
   * 根据毫秒计算天时分秒并补零格式化
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
   * 时间补零格式化
   * @param {String} time 传入的时间
   */
  function zero(time) {
    return time < 10 ? '0' + time : time
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
   * @param {Element} element 获取样式的元素
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

  /**
   * 伪数组转为真正的数组
   * @param {Object} likeData 伪数组
   * @param {Boolean} flag 是否为标准浏览器
   * @param {Array} return 伪数组经过转换后的的真正的数组
   */
  function likeArray(likeData) {
    if (flag) {
      return Array.from(likeData)
    } else {
      var arr = []
      for (var i = 0; i < likeData.length; i++) {
        arr[i] = likeData[i]
      }
      return arr
    }
  }

  /**
   * 冒泡排序
   * @param {Array} arr 要排序的数组
   * @param {Boolean} bool true为升序，false为降序
   * @param {Array} return 排完序后的数组
   */
  function bubbleSort(arr, bool) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (bool ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]) {
          var temp
          temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
      }
    }
    return arr
  }

  /**
   * 快速排序
   * @param {Array} arr 要排序的数组
   * @param {Array} return 排完序后的数组
   */
  function quickSort(arr) {
    if (arr.length <= 1) {
      return arr
    }
    var point = Math.floor(arr.length / 2)
    var pointValue = arr.splice(point, 1)[0]
    var left = [],
      right = []
    for (let i = 0; i < arr.length; i++) {
      var cur = arr[i]
      cur < pointValue ? left.push(cur) : right.push(cur)
    }
    return quickSort(left).concat(pointValue, quickSort(right))
  }

  /**
   * 数组去重
   * @param {Array} arr 要去重的数组
   * @param {Array} return 去重后的数组
   */
  function arrNoRepeat(arr) {
    var obj = {}
    for (let i = 0; i < arr.length; i++) {
      var cur = arr[i]
      if (obj[cur] === cur) {
        arr[i] = arr[arr.length - 1]
        arr.length--
        i--
        continue
      }
      obj[cur] = cur
    }
    return arr
  }

  /**
   * 获取所有的直接子元素
   * @param {Element} eleObj 父元素
   * @param {String} tagName 标签名
   * @param {Array} return 子元素的数组
   */
  function getChildren(eleObj, tagName) {
    var nodes = eleObj.childNodes,
      arr = []
    for (var i = 0; i < nodes.length; i++) {
      var curNode = nodes[i]
      if (typeof tagName === 'undefined') {
        if (curNode.nodeType === 1) {
          arr.push(curNode)
        }
      } else {
        if (curNode.nodeType === 1 && curNode.nodeName.toUpperCase() === tagName.toUpperCase()) {
          arr.push(curNode)
        }
      }
    }
    return arr
  }

  /**
   * 获取第一个子元素
   * @param {Element} eleObj 父元素
   * @param {Element} return 第一个子元素
   */
  function firstChild(eleObj) {
    return getChildren(eleObj).length !== 0 ? getChildren(eleObj)[0] : null
  }

  /**
   * 获取最后一个子元素
   * @param {Element} eleObj 父元素
   * @param {Element} return 最后一个子元素
   */
  function lastChild(eleObj) {
    return getChildren(eleObj).length !== 0 ? getChildren(eleObj)[getChildren(eleObj).length - 1] : null
  }

  /**
   * 获取上一个哥哥元素
   * @param {Element} eleObj 当前元素
   * @param {Element} return 上一个哥哥元素
   */
  function prev(eleObj) {
    var pre = eleObj.previousSibling
    while (pre && pre.nodeType !== 1) {
      pre = pre.previousSibling
    }
    return pre
  }

  /**
   * 获取下一个弟弟元素
   * @param {Element} eleObj 当前元素
   * @param {Element} return 下一个弟弟元素
   */
  function next(eleObj) {
    var nex = eleObj.nextSibling
    while (nex && nex.nodeType !== 1) {
      nex = nex.nextSibling
    }
    return nex
  }

  /**
   * 获取所有的哥哥元素
   * @param {Element} eleObj 当前元素
   * @param {Array} arr 所有哥哥元素的数组
   */
  function prevAll(eleObj) {
    var pre = prev(eleObj)
    var arr = []
    while (pre) {
      arr.push(pre)
      pre = prev(pre)
    }
    return arr
  }

  /**
   * 获取所有的弟弟元素
   * @param {Element} eleObj 当前元素
   * @param {Array} arr 所有弟弟元素的数组
   */
  function nextAll(eleObj) {
    var nex = next(eleObj)
    var arr = []
    while (nex) {
      arr.push(nex)
      nex = prev(nex)
    }
    return arr
  }

  /**上一个哥哥元素以及下一个弟弟元素所有的弟弟元素
   * @param {Element} eleObj 当前元素
   * @param {Array} arr 上一个哥哥元素+下一个弟弟元素组成的数组
   */
  function siblings(eleObj) {
    var arr = []
    prev(eleObj) ? arr.push(prev(eleObj)) : null
    next(eleObj) ? arr.push(next(eleObj)) : null
  }

  /**获取所有兄弟元素
   * @param {Element} eleObj 当前元素
   * @param {Array} arr 所有兄弟元素的数组
   */
  function siblingsAll(eleObj) {
    return prevAll(eleObj).concat(nextAll(eleObj))
  }

  /**获取所有对应类名的所有元素数组
   * @param {String} className 类名
   * @param {context} context 执行上下文
   * @param {Boolean} flag 是否为标准浏览器
   * @param {Array} arr 对应类名的元素的数组
   */
  function getClass(className, context) {
    context = context || document
    var arr = []
    if (flag) {
      var likeArrays = context.getElementsByClassName(className)
      return likeArray(likeArrays)
    } else {
      var curEles = document.getElementsByTagName('*')
      for (let i = 0; i < curEles.length; i++) {
        if (curEles[i].className === className) {
          arr[arr.length] = curEles[i]
        }
      }
      return arr
    }
  }

  /**运动框架封装函数
   * @param {Element} obj 运动的元素
   * @param {Object} json 要变化的元素样式属性
   * @param {Function} callback 回调函数
   */
  function move(obj, json, callback) {
    if (obj.time) {
      clearInterval(obj.time)
    }
    obj.time = setInterval(function () {
      var onOff = true
      for (var attr in json) {
        var target = json[attr]
        var speed = 0

        // 预处理
        if (attr === 'opacity') {
          speed = Math.round(getStyle(obj, attr) * 100)
        } else {
          speed = parseInt(getStyle(obj, attr))
        }

        // 步长处理，先快后慢
        var dir = (target - speed) / 10
        dir = dir > 0 ? Math.ceil(dir) : Math.floor(dir)

        speed += dir

        // 边界处理
        if ((speed > target && dir > 0) || (speed < target && dir < 0)) {
          speed = target
        }

        if (attr === 'opacity') {
          obj.style.opacity = speed / 100
          obj.style.filter = `alpha(opacity=${speed})`
        } else {
          obj.style[attr] = speed + 'px'
        }

        if (speed !== target) {
          onOff = false
        }
      }
      if (onOff) {
        clearInterval(obj.time)
        callback && callback()
      }
    }, 30)
  }

  /**深拷贝
   * @param {Object} obj 要复制的对象
   * @param {Object} return 复制的对象
   */
  function deepClone(obj) {
    if (typeof obj !== 'object' || obj == null) {
      return obj
    }

    let clone = obj instanceof Array ? [] : {}

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key])
      }
    }
    return clone
  }

  /**在URL尾部添加查询字符串参数
   * @param {String} url 要添加查询字符串餐宿的URL
   * @param {String} name 查询参数
   * @param {String} value 参数值
   * @param {String} return 添加完查询字符串参数后的URL
   */
  function addURLParam(url, name, value) {
    url += url.indexOf('?') === -1 ? '?' : '&'
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
    return url
  }

  /**在URL尾部添加查询字符串参数
   * @param {HTMLFormElement} form 要序列化的表单元素
   */
  function serialize(form) {
    let parts = []
    let optValue

    for (let field of form.elements) {
      switch (field.type) {
        case 'select-one':
        case 'select-multiple':
          if (field.name.length) {
            for (let option of field.options) {
              if (option.selected) {
                if (option.hasAttribute) {
                  optValue = option.hasAttribute('value') ? option.value : option.text
                } else {
                  optValue = option.attributes['value'].specified ? option.value : option.text
                }
                parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue))
              }
            }
          }
          break
        case undefined:
        case 'file':
        case 'submit':
        case 'reset':
        case 'button':
          break
        case 'radio':
        case 'checkbox':
          if (!field.checked) {
            break
          }
        default:
          if (field.name.length) {
            parts.push(`${encodeURIComponent(field.name)} = ${encodeURIComponent(field.value)}`)
          }
      }
    }

    return parts.join('&')
  }

  /**在URL尾部添加查询字符串参数
   * @param {Object} obj 其中一个对象
   * @param {Object} anotherObj 另外一个对象
   * @param {Boolean} return 是否相等，true表示相等，false表示不相等
   */
  function isObjectValueEqual(obl, anotherObj) {
    if (obj === anotherObj) return true

    let aProps = Object.getOwnPropertyNames(obj)
    let bProps = Object.getOwnPropertyNames(anotherObj)

    if (aProps.length !== bProps.length) return false

    for (let prop in aProps) {
      if (anotherObj.hasOwnProperty(prop)) {
        if (typeof aProps[prop] === 'object') {
          if (!isObjectValueEqual(aProps[prop], bProps[prop])) return false
        } else if (aProps[prop] !== bProps[prop]) {
          return false
        }
      } else {
        return false
      }
    }
    return true
  }

  /**封装ajax
   * @param {Object} options 请求的参数
   */
  function ajax(options) {
    // 把所有的options使用defaults替换掉
    var defaults = {
      type: 'get',
      url: '',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function () {},
      error: function () {}
    }

    Object.assign(defaults, options)

    var xhr = new XMLHttpRequest()

    var params = ''
    for (var attr in defaults.data) {
      // 将参数转换字符串进行保存
      params += attr + '=' + defaults.data[attr] + '&'
    }
    // 把最后一个&去掉
    params = params.substr(0, params.length - 1)
    // 是get方式
    if (defaults.type === 'get') {
      defaults.url = defaults.url + '?' + params
    }

    xhr.open(defaults.type, defaults.url)

    // 如果是post方式
    if (defaults.type === 'post') {
      var contentType = defaults.header['content-type']

      // 设置请求参数的格式类型
      xhr.setRequestHeader('content-type', contentType)

      // 如果类型是json
      if (contentType == 'application/json') {
        // 向服务器传递json数据格式的参数
        xhr.send(JSON.stringify(defaults.data))
      } else {
        // 向服务器传递普通类型的请求参数
        xhr.send(params)
      }
    } else {
      xhr.send()
    }

    xhr.onload = function () {
      if (xhr.status === 200) {
        // 请求成功 调用处理成功的函数
        defaults.success(xhr.responseText)
      } else {
        // 请求失败 调用处理失败的函数
        defaults.error(xhr.responseText, xhr)
      }
    }
  }

  return {
    getRandomNumber: getRandomNumber,
    dateFormatting: dateFormatting,
    dateZeroFormat: dateZeroFormat,
    zero: zero,
    hasPlugin: hasPlugin,
    getStyle: getStyle,
    getQueryStringArgs: getQueryStringArgs,
    outputAttributes: outputAttributes,
    loadScript: loadScript,
    loadScriptString: loadScriptString,
    loadStyles: loadStyles,
    loadStyleString: loadStyleString,
    debounce: debounce,
    likeArray: likeArray,
    bubbleSort: bubbleSort,
    quickSort: quickSort,
    arrNoRepeat: arrNoRepeat,
    getChildren: getChildren,
    firstChild: firstChild,
    lastChild: lastChild,
    prev: prev,
    next: next,
    prevAll: prevAll,
    nextAll: nextAll,
    siblings: siblings,
    siblingsAll: siblingsAll,
    getClass: getClass,
    move: move,
    deepClone: deepClone,
    addURLParam: addURLParam,
    serialize: serialize,
    isObjectValueEqual: isObjectValueEqual,
    ajax: ajax
  }
})()
