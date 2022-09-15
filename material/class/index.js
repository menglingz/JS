window.onload = function () {

    var that; // 保存全局的this 

    class Tab {
        constructor(id) {
            // 获取元素
            that = this;
            this.main = document.querySelector(id);
            this.add = this.main.querySelector('.tabadd'); // 增加 
            // li父元素 
            this.ul = this.main.querySelector('.firstnav ul:first-child'); // ul  
            // section 元素
            this.fsection = this.main.querySelector('.tabcon')
            this.init()
        }
        // 事件初始化的方法
        init () {
            this.updataNode()
            // init 初始化操作相关的元素绑定事件
            this.add.onclick = this.addTab // 增加
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab // 切换
                this.remove[i].onclick = this.removeTab; // 移除 
                this.spans[i].ondblclick = this.editTab; // 标题编辑 
                this.sections[i].ondblclick = this.editTab; // 内容编辑
            }
        }

        // 因为需要动态添加元素 需要重新获取对应的元素 
        updataNode () {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section')
            this.remove = this.main.querySelectorAll('.icon-guanbi')
            this.spans = this.main.querySelectorAll('.firstnav li span:first-child');

        }
        // 切换 
        toggleTab () {
            that.clearClass()
            this.className = 'liactive'
            that.sections[this.index].className = 'conactive'
        }

        // clearClass 清除所有的li和section的切换 
        clearClass () {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = ''
                this.sections[i].className = ''
            }
        }

        // 添加
        addTab () {
            that.clearClass()
            // 创建li元素和section元素 
            var random = Math.random()
            var li = '<li class="liactive"><span>新大哥</span><span class="ifonfont icon-guanbi">x</span></li>'
            var section = ' <section class="conactive">新的内容' + random + '</section>'

            // 把这两个元素添加到对应的父元素里面 
            that.ul.insertAdjacentHTML('beforeend', li)
            that.fsection.insertAdjacentHTML('beforeend', section)
            that.init()
        }
        // 删除功能 -- span 
        removeTab (e) {
            e.stopPropagation();//阻止冒泡 防止触发li的点击切换事件 

            var index = this.parentNode.index

            // 根据索引号删除对应的li 和 section remove方法可以直接删除指定的元素 
            that.lis[index].remove()
            that.sections[index].remove()
            that.init()

        }

        // 修改功能
        editTab () {
            var str = this.innerHTML
            // 双击选中文字  
            window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty();

            this.innerHTML = '<input type="text">'
            var input = this.children[0];
            input.value = str
            input.select() // 文本框里面的文字处于选中状态  
            input.onblur = function(){
                this.parentNode.innerHTML = this.value 
            }
            
            // 按下回车也可以把文本框的内容赋值给span  
            input.onkeyup = function(e){
                if(e.keyCode === 13){
                    // 手动调用失去焦点事件
                    this.blur(); 
                }
            }
        }

    }

    new Tab('#tab')


















    // window.onload的结束符
}