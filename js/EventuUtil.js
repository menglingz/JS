/**
 * @param {Object} EventUtil 跨浏览器事件相关工具方法封装对象
 */

var EventUtil = {
  /**
   * 为元素绑定事件处理程序
   * @param {Element} element 要绑定事件处理程序的元素
   * @param {String} type 事件类型
   * @param {Function} handler 事件处理函数
   * @param {Function} element.addEventListener DOM2事件处理函数
   * @param {Function} element.attachEvent IE事件处理函数
   * @param {Function} element["on" + type] HTML上添加事件处理函数
   */
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false)
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler)
    } else {
      element['on' + type] = handler
    }
  },

  /**
   * 移除之前为元素绑定的事件处理程序
   * @param {Element} element 绑定事件处理程序的元素
   * @param {String} type 事件类型
   * @param {Function} handler 事件处理函数
   * @param {Function} element.removeEventListener DOM2事件处理函数
   * @param {Function} element.detachEvent IE事件处理函数
   * @param {Function} element["on" + type] HTML上的事件处理函数
   */
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler)
    } else {
      element['on' + type] = null
    }
  },

  /**
   * 返回对event对象的引用
   * @param {Object} event DOM事件对象
   * @param {Object} window.event IE事件对象
   */
  getEvent: function (event) {
    return event ? event : window.event
  },

  /**
   * 返回事件目标
   * @param {Object} event 事件对象
   * @param {Element} event.target DOM事件目标属性
   * @param {Element} event.srcElement IE事件目标
   */
  getTarget: function (event) {
    return event.target || event.srcElement
  },

  /**
   * 阻止事件的默认行为
   * @param {Object} event 事件对象
   * @param {Function} event.preventDefault DOM阻止事件默认行为
   * @param {Boolean} event.srcElement IE阻止事件默认行为
   */
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  },

  /**
   * 阻止事件冒泡
   * @param {Object} event 事件对象
   * @param {Function} event.stopPropagation DOM阻止事件冒泡
   * @param {Boolean} event.cancelBubble IE阻止事件冒泡
   */
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  },

  /**
   * 获取相关元素(只在mouseover,mouseout中存在)
   * @param {Object} event 事件对象
   * @param {Element} event.relatedTarget DOM事件对象上的相关元素属性
   * @param {Element} event.toElement IE中mouseover事件触发时提供的相关元素属性
   * @param {Element} event.fromElement IE中mouseout事件触发时提供的相关元素属性
   */
  getRelatedTarget: function (event) {
    if (event.relatedTarget) {
      return event.relatedTarget
    } else if (event.toElement) {
      return event.toElement
    } else if (event.fromElement) {
      return event.fromElement
    } else {
      return null
    }
  },

  /**
   * 获取keypress事件发生时按下的按键编码
   * @param {Object} event 事件对象
   * @param {Element} event.charCode DOM事件对象上按键字符对应的ASCII编码
   * @param {Element} event.keyCode IE8及更早版本和Opera中按键字符对应的ASCII编码
   */
  getCharCode: function (event) {
    if (typeof event.charCode == 'number') {
      return event.charCode
    } else {
      return event.keyCode
    }
  }
}

/* 
  EventUtil.addHandler(btn, 'click', handler) // 绑定事件调用
  EventUtil.removeHandler(btn, 'click', handler) // 解绑事件调用
  var event = EventUtil.getEvent(event) // 获取事件对象调用
  let target = EventUtil.getTarget(event) // 获取事件目标调用
  EventUtil.preventDefault(event) // 取消事件默认行为调用
  EventUtil.stopPropagation(event) // 阻止事件冒泡调用
  let relatedTarget = EventUtil.getRelatedTarget(event) // 获取相关元素
  console.log(EventUtil.getCharCode(event)) // 获取按键编码调用
*/
