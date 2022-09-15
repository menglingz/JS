var utils = (function () {
  // 属于标准浏览器，不成立就是在ie6~8
  var flag = 'getComputedStyle' in window

  // 类数组转化为数组
  function likeArray(likeData) {
    if (flag) {
      return Array.prototype.slice.call(likeData, 0)
    } else {
      var arr = []
      for (var i = 0; i < likeData.length; i++) {
        arr[i] = likeData[i]
      }
      return arr
    }
  }

  /* 
    获取浏览器渲染的样式 
    @param eleObj: 元素对象
    @param attr:样式属性
    @param returns：样式值
    */

  function getStyle(eleObj, attr) {
    return eleObj.currentStyle ? eleObj.currentStyle[attr] : window.getComputedStyle(eleObj)[attr]
  }

  /* 
    生成n-m之间的随机数 
    n:起始值 number 
    m:终值 number 
    @param returns 随机数值 number 
    */

  function getRandomNumber(n, m) {
    n = Number(n)
    m = Number(m)
    if (isNaN(n) || isNaN(m)) {
      throw new TypeError('请输入数值类型')
      if (n > m) {
        var temp
        temp = n
        n = m
        m = temp
      }
      return Math.round(Math.random() * (m - n) + n)
    }
  }

  /* 
    补零
    time：时间 
     @param returns 补零后的字符串
    */

  function zero(time) {
    return time < 10 ? '0' + time : time
  }

  /* 
    冒泡排序：对数组进行排序
    arr:数组
    bool:布尔值 true 升序  false 降序 
    returns arr 
    */
  function bubbleSort(arr, bool) {
    var flag = false
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (bool ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]) {
          var temp
          temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          flag = true
        }
      }
      if (flag) {
        flag = false
      } else {
        break
      }
    }
    return arr
  }

  /* 
    快速排序 
    arr:数组
    returns arr 
    */

  function quickSort(arr) {
    if (arr.length <= 1) {
      return arr
    }
    var point = Math.floor(arr.length / 2)
    var pointValue = arr.splice(point, 1)[0]
    var left = [],
      right = []
    for (var i = 0; i < arr.length; i++) {
      var cur = arr[i]
      cur < pointValue ? left.push(cur) : right.push(cur)
    }
    return quickSort(left).concat(pointValue, quickSort(right))
  }

  /* 
    数组去重 
    arr:数组
    returns arr 
    */
  function arrNoRepeat(arr) {
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
      var cur = arr[i]
      if (obj[cur] === cur) {
        arr[i] = arr[arr.length - 1]
        arr.length--
        i--
        continue
      }
      obj[cur] = cur
      obj[1] = 1
    }
    return arr
  }

  /* 
    获取所有的直接子元素 （不传递标签名 就获取所有的直接子元素，传递进行过滤） 
    eleObj:元素对象 
    tagName:标签名
    returns:array 
    */

  function getChildren(eleObj, tagName) {
    var nodes = eleObj.childNodes,
      arr = [] // 存储获取到的元素
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

  /* 
    获取第一个子元素 
    eleObj:元素对象 
     returns:eleObj
    */

  function firstChild(eleObj) {
    return getChildren(eleObj).length != 0 ? getChildren(eleObj)[0] : null
  }

  /* 
   获取最后一个子元素 
   eleObj:元素对象 
   returns:eleObj
    */

  function lastChild(eleObj) {
    return getChildren(eleObj).length != 0 ? getChildren(eleObj)[getChildren(eleObj).length - 1] : null
  }

  /* 
    获取上一个哥哥元素
    eleObj:元素对象 
    returns:eleObj
    */
  function prev(eleObj) {
    var pre = eleObj.previousSibling
    while (pre && pre.nodeType !== 1) {
      pre = pre.previousSibling
    }
    return pre
  }

  /* 
   获取下一个弟弟元素
   eleObj:元素对象 
   returns:eleObj
   */

  function next(eleObj) {
    var nex = eleObj.nextSibling
    while (nex && nex.nodeType !== 1) {
      nex = nex.nextSibling
    }
    return nex
  }

  /* 
    获取所有的哥哥元素
    eleObj:元素对象 
    returns:eleObj
    
    */
  function prevAll(eleObj) {
    var pre = prev(eleObj) // 获取当前的对象的哥哥元素
    var arr = []
    while (pre) {
      arr.unshift(pre)
      pre = prev(pre)
    }
    return arr
  }

  /* 
   获取所有的弟弟元素
   eleObj:元素对象 
   returns:eleObj
   */

  function nextAll(eleObj) {
    var nex = next(eleObj) // 获取当前的对象的哥哥元素
    var arr = []
    while (nex) {
      arr.push(nex)
      nex = next(nex)
    }
    return arr
  }

  /* 
    获取上一个哥哥元素以及下一个弟弟元素
     eleObj:元素对象 
   returns:eleObj
    
    */

  function siblings(eleObj) {
    var arr = []
    prev(eleObj) ? arr.push(prev(eleObj)) : null
    next(eleObj) ? arr.push(next(eleObj)) : null
    return arr
  }
  /* 
    获取所有的相邻元素 
    eleObj:元素对象 
    returns:array
    
    */
  function siblingsAll(eleObj) {
    return prevAll(eleObj).concat(nextAll(eleObj))
  }

  /* 
    className:类名
    context:执行上下文
    likeArray:转数组
    */
  function getClass(className, context) {
    context = context || document
    var arr = []
    if (flag) {
      var likeArrays = context.getElementsByClassName(className)
      return likeArray(likeArrays)
    } else {
      var curEles = document.getElementsByTagName('*')
      for (var i = 0; i < curEles.length; i++) {
        if (curEles[i].className === className) {
          arr[arr.length] = curEles[i]
        }
      }
      return arr
    }
  }

  return {
    likeArray: likeArray,
    getStyle: getStyle,
    getRandomNumber: getRandomNumber,
    zero: zero,
    bubbleSort: bubbleSort,
    quickSort: quickSort,
    getChildren: getChildren,
    firstChild: firstChild,
    lastChild: lastChild,
    prev: prev,
    next: next,
    prevAll: prevAll,
    nextAll: nextAll,
    siblings: siblings,
    siblingsAll,
    getClass: getClass
  }
})()
