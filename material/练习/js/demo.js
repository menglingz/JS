window.onload = function () {
    // 获取元素是一个伪数据，也就是，不是真正的数组，数组的原生方法是用了的 
    /* 把数组转换成真正的数组 */

    /* if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByClassName('*');
            for (var i = 0, len = els.length; i < len; i++) {
                if(els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ')>=0 || els[i].className.indexOf(' ' + cls)){
                    ret.push(cls[i])
                }
            }
            return ret; 
        }
    } */

    // 获取元素
    var table = document.getElementById('cartTable'); // 购物车表格 
    var checkInputs = document.getElementsByClassName('check'); //所有的勾选框  
    var checkAllInputs = document.getElementsByClassName('check-all'); // 全选框 
    var checkOneInputs = document.getElementsByClassName('check-one'); // 单选框 
    var tr = table.children[1].rows; // 所有的tbody下面的行 

    // 获取计算需要的元素
    var selectedTotal = document.getElementById('selectedTotal'); // 已选商品的数目 
    var priceTotal = document.getElementById('priceTotal'); // 价格总计

    // 浮层
    var selected = document.getElementById('selected');
    var foot = document.getElementById('foot');
    var selectedViewList = document.getElementById('selectedViewList'); // 接收浮层
    // 全部删除
    var deleteAll = document.getElementById('deleteAll');
    // 给所有的点选矿添加点击事件 
    for (var i = 0; i < checkInputs.length; i++) {
        checkInputs[i].onclick = function () {
            // 点击全选，选中所有的商品 
            if (this.className === 'check-all check') { // 证明点击的是全选按钮
                for (var j = 0; j < checkInputs.length; j++) {
                    checkInputs[j].checked = this.checked;
                }
            }

            // 点击单选 checkOneInputs 全选选中
            var count = 0;
            for (var f = 0; f < checkOneInputs.length; f++) {
                if (checkOneInputs[f].checked) {
                    count++
                }
                for (var t = 0; t < checkAllInputs.length; t++) {
                    checkAllInputs[t].checked = (count === checkOneInputs.length)
                }
            }
            getTotal();
        }
    }
    // 计算 
    function getTotal () {
        var selected = 0;
        var price = 0;
        var HTMLstr = ''; // 浮层
        for (var i = 0; i < tr.length; i++) {
            if (tr[i].getElementsByTagName('input')[0].checked) {
                selected += parseInt(tr[i].getElementsByTagName('input')[1].value);
                price += parseFloat(tr[i].cells[4].innerHTML)
                // 拼接浮层的内容
                HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
            }
        }
        selectedTotal.innerHTML = selected; // 商品件数 
        priceTotal.innerHTML = price.toFixed(2); // 总价格
        selectedViewList.innerHTML = HTMLstr
        // 判断 当前商品数为 0 不显示浮层
        if (selected == 0) {
            foot.className = 'foot'
        }
    }
    // 浮层 --- show类显示或者隐藏
    selected.onclick = function () {
        if (foot.className == 'foot') {
            if (selectedTotal.innerHTML != 0) {
                foot.className = 'foot show'
            }
        } else {
            foot.className = 'foot'
        }
    }
    // 浮层取消事件
    selectedViewList.onclick = function (e) {
        var e = e || window.event;
        var el = e.target || e.srcElement
        if (el.className == 'del') {
            // 获取自定义属性 index = i 
            var index = el.getAttribute('index');
            var input = tr[index].getElementsByTagName('input')[0]; // 获取tr下面的第一个input框

            input.checked = false;
            input.onclick();
        }
    }
    // 商品的单个计算小计
    function getSubtotal (tr) {
        var cells = tr.cells;
        var price = cells[2]; // 单价 
        var subtotal = cells[4]; // 小计
        var countInput = tr.getElementsByTagName('input')[1];  // 数目input

        var span = tr.getElementsByTagName('span')[1] // - 号  

        // 写入html 
        subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2)

        // 减号的消失或者出现 -- 数据类型
        if (countInput.value == 1) {
            span.innerHTML = ''
        } else {
            span.innerHTML = '-'
        }
    }
    // 为每一行的点击事件
    for (var i = 0; i < tr.length; i++) {
        // 将点击事件绑定到tr元素上  
        tr[i].onclick = function (e) {
            var e = e || window.event;
            var el = e.target || e.srcElement; // 事件源 
            var cls = el.className; // 触发事件元素的class名 
            var countInput = this.getElementsByTagName('input')[1]
            var value = parseInt(countInput.value); // 数目

            // 通过判断触发元素的class确定用户点击的是哪个元素
            switch (cls) {
                case 'add': // 加商品
                    countInput.value = value + 1
                    // 更新小计
                    getSubtotal(this)
                    break;
                case 'reduce': // 减商品
                    if (value > 1) {
                        countInput.value = value - 1
                        // 更新小计
                        getSubtotal(this)
                    }
                    break;
                case 'delete': // 删除
                    var conf = confirm('确定删除此商品吗？')
                    if (conf) {
                        // 父元素.removeChild(删除的元素)
                        this.parentNode.removeChild(this)
                    }
                    break;
            }
            getTotal(); // 更新总数
        }
        // 给数目输入框绑定keyup事件 
        tr[i].getElementsByTagName('input')[1].onkeyup = function () {
            var val = parseInt(this.value)
            if (isNaN(val) || val <= 0) {
                val = 1;
            }
            if (this.value != val) {
                this.value = val
            }
            // 更新小计
            getSubtotal(this.parentNode.parentNode)
        }

        // 计算所有的价格和商品件数
        getTotal(); // 更新总数
    }
    // 点击全部删除 
    deleteAll.onclick = function () {
        if (selectedTotal != 0) {
            var con = confirm('确定删除选中的商品吗？');
            if (con) {
                for (var i = 0; i < tr.length; i++) {
                    if (tr[i].getElementsByTagName('input')[0].checked) {
                        tr[i].parentNode.removeChild(tr[i]); // 回退下标
                        i--;
                    }
                }
            }
        } else {
            alert('请选择商品！')
        }
        getTotal(); // 更新总数
    }
    // window的结束符
}

