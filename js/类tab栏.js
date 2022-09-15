window.onload = function () {
  var that // 保存全局的this

  class Tab {
    constructor(id) {
      that = this
      // 获取元素
      this.main = document.querySelector(id)
      this.add = document.querySelector('.tabadd')
      this.ul = this.main.querySelector('.firstnav ul:first-child')
      this.sectionBox = this.main.querySelector('.tabcon')
      // 初始化
      this.init()
    }

    init() {
      this.updateNode()
      this.add.onclick = this.addTab
      for (let i = 0, len = this.lis.length; i < len; i++) {
        this.lis[i].index = i
        this.lis[i].onclick = this.toggleTab // 切换
        this.remove[i].onclick = this.removeTab // 删除
        this.spans[i].ondblclick = this.editTab // 标题编辑
        this.sections[i].ondblclick = this.editTab // 内容编辑
      }
    }

    updateNode() {
      // 因为DOM节点会改变，所以需要动态获取DOM元素
      this.lis = this.main.querySelectorAll('li')
      this.sections = this.main.querySelectorAll('section')
      this.remove = this.main.querySelectorAll('.icon-guanbi')
      this.spans = this.main.querySelectorAll('.firstnav li span:first-child')
    }

    clearClass() {
      for (let i = 0; i < this.lis.length; i++) {
        this.lis[i].className = ''
        this.sections[i].className = ''
      }
    }

    addTab() {
      that.clearClass()
      // 创建li元素和section元素
      var random = Math.random()
      var li = '<li class="liactive"><span>新大哥</span><span class="ifonfont icon-guanbi">x</span></li>'
      var section = ' <section class="conactive">新的内容' + random + '</section>'

      // 把这两个元素添加到对应的父元素里面
      that.ul.insertAdjacentHTML('beforeend', li)
      that.sectionBox.insertAdjacentHTML('beforeend', section)
      that.init()
    }

    toggleTab() {
      that.clearClass()
      this.className = 'liactive'
      that.sections[this.index].className = 'conactive'
    }

    removeTab(e) {
      e.stopPropagation()
      let index = this.parentNode.index
      that.lis[index].remove()
      that.sections[index].remove()
      // 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
      if (document.querySelector('.liactive')) return
      // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
      index--
      // 手动调用我们的点击事件  不需要鼠标触发
      that.lis[index] && that.lis[index].click()
    }

    editTab() {
      let str = this.innerHTML
      window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty()
      this.innerHTML = '<input type="text"/>'
      let ipt = this.children[0]
      ipt.value = str
      ipt.select()
      ipt.onblur = function () {
        this.parentNode.innerHTML = this.value
      }
      ipt.onkeyup = function (e) {
        if (e.keyCode === 13) {
          this.blur()
        }
      }
    }
  }

  new Tab('#tab')

  // window.onload的结束位置
}
