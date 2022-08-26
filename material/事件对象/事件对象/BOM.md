## 什么是BOM

BOM就是浏览器对象模型，提供了内容与浏览器窗口进行交互的对象，核心是window  

BOM 的标准是浏览器厂商制定，具有兼容性  

## BOM的构成

dom  localtion  navigation history  ......... 

## window对象中的常见事件

```js
// 让js代码最后加载
window.onload = function(){

}

// 调整窗口大小的事件
window.onresize = function () {
    console.log('变化了');
    if (window.innerWidth <= 800) {
        box.style.width = '600px'
    } else {
        box.style.width = '300px'
    }
}

// 打开一个窗口
window.open('https://www.baidu.com','_self')
```

## 绑定事件

- 传统的方式给元素绑定事件

```js
// 绑定事件
元素.onclick = function() {}

// 解绑事件
元素.onclick = null
```

代码实列

````js
box.onclick = function () {
    console.log('我是红色的');
    // 解绑事件
    // box.onclick = null;
}
// 注意：同一个元素执行同一种事件，执行不同的事件函数，后面的事件会覆盖前面的事件
````

- 注册监听的方式给元素绑定事件

```js
/* 
语法： 
元素.addEventListener(事件名称，事件函数，布尔值)
事件名称：这个事件名称是不带的 on 的 比如onclick应该写成 click  是一个字符串
事件函数：是一个匿名函数，事件触发后执行的函数 
布尔值：值有true和false，代表的是元素是否支持冒泡 或者是捕获
*/

// 代码使用
box.addEventListener('click', function(){
    console.log('我是新绑定事件的方式');
})
// 开心就好啊

// 解绑事件 
/*  
 语法：
 元素.removeEventListener(事件名称，事件函数)
 事件名称：这个事件名称是不带的 on 的 比如onclick应该写成 click  是一个字符串
 事件函数：是一个匿名函数，事件触发后执行的函数 
*/

box.addEventListener('click', move) // 注意：如果事件函数被独立，调用的时候不带小括号

function move () {
    console.log('我是新绑定事件的方式');
    // 解绑事件
    box.removeEventListener('click',move)
}
```

非标准浏览器

````js
// 非标准浏览器
// 事件名称是需要带的 on 的 
box.attachEvent('onclick', move)


function move () {
    console.log(123456);

    // 解绑事件
    box.detachEvent('onclick', move)
}
````

绑定事件的兼容处理

````js
getEvent(box, 'click', function () {
    console.log('处理兼容');
})
// 绑定事件的兼容
function getEvent (obj, eventName, callback) {
    if (obj.addEventListener) {
        // 标准浏览器
        obj.addEventListener(eventName, callback, false)
    } else {
        // 非标准浏览器
        obj.attachEvent('on' + eventName, callback)
    }
}
````

解绑事件的兼容处理

```js
getEvent(box, 'click',move)

function move() {
    console.log('处理兼容');
    remEvent(box,'click',move)
} 

// 解绑事件的兼容
 function remEvent (obj, eventName, callback) {
    if (obj.removeEventListener) {
        // 标准浏览器
        obj.removeEventListener(eventName, callback)
    } else {
        // 非标准浏览器
        obj.detachEvent('on' + eventName, callback)
    }
}
```

## 元素偏移量 offset系列

offset就是偏移的意思，可以使用这个方法动态的获取到元素的位置(偏移)，元素的大小等  

1、获取到元素距离带有定位属性的父元素的位置

2、获取元素本身的大小 

3、返回值是不带的单位的

```js
element.offsetParent: 返回作为该元素有定位的父元素，如果父元素没有定位，返回的是到body
element.offsetTop:返回的是有定位属性的父元素的上方距离
element.offsetLeft:返回的是有定位属性的父元素左边的距离
element.offsetWidth:返回的是元素自身的宽度(padding、边框、内容区域的宽度) 返回值不带单位
element.offsetHeight:返回的是元素自身的高度(padding、边框、内容区域的高度) 返回值不带单位
```

````js
console.log(div.offsetParent);
console.log(div.offsetTop);
console.log(div.offsetLeft);
console.log(div.offsetWidth);
console.log(div.offsetHeight);
````

### offset

- offset可以得到任意样式中的样式值 
- offset系列获取到的数值是没有单位的 
- offsetWidth包含： padding + border + width
- offsetWidth等属性是只读属性，只能获取不能赋值 

结论：想要获取元素的大小位置，使用offset是比较合适  

### style

- style只能得到行内样式表中的样式值  
- style.width获取到数值是带单位 
- style.width不包含padding和border 
- style.width可读可写

#### 案例

````js
// 获取元素
var liList = document.getElementsByTagName('li');
var bg = document.getElementsByClassName('cloud')[0]
var liLeft = 34;
var header = 34; // 需要减掉的哪个34 

for (var i = 0; i < liList.length; i++) {
    liList[i].onmouseover = function () {
        liLeft = this.offsetLeft + (this.offsetWidth - bg.offsetWidth) / 2
        // 赋值
        // bg.style.left = liLeft + 'px' // 184
    }
}
setInterval(function(){ 
    header = header + (liLeft - header) / 10
    bg.style.left = header + 'px' 
},20)
````

## client系列

就是客户端的意思，可以获取到元素可视区域的相关值，得到元素的边框的大小，元素的大小等 

```js
element.clientTop: 返回元素上边框的大小 
element.clientLeft: 返回元素左边框的大小 
element.clientWidth: 返回元素的宽度（padding,内容区域的宽度，不包含边框）返回值不带单位
element.clientHeight: 返回元素的高度（padding,内容区域的高度，不包含边框）返回值不带单位
```

```js
console.log(box.clientTop);
console.log(div.clientTop);

console.log(box.clientLeft);
console.log(div.clientLeft);

console.log(box.clientWidth);

// body 和 html 
console.log(document.body.clientWidth); // body
console.log(document.documentElement.clientHeight); // html  

//    处理兼容
var clientTop = document.documentElement.clientWidth || document.body.clientWidth
console.log(clientTop);
```

## scroll系列

就是滚动的意思，可以获取元素的大小，以及滚动距离  

```js
element.scrollTop: 返回被卷去的上边距离，返回值不带单位
element.scrollLeft: 返回被卷去的左侧距离，返回值不带单位
element.scrollWidth: 返回自身实际的宽度，不包含边框，返回值不带单位
element.scrollHeight: 返回自身实际的高度，不包含边框，返回值不带单位
```

```js
// 注意： 当需要获取滚动条滚动的距离的时候，需要使用onscroll事件监听，否则的获取不到 

// 事件监听
window.onscroll = function () {
    // 获取值
    var top = document.documentElement.scrollTop || document.body.scrollTop
    console.log(top);
}

// 赋值 
// 注意： 获取值是一起获取，但是赋值，需要分开赋值
document.documentElement.scrollTop = 500
document.body.scrollTop = 500
```

```js
var box = document.querySelector('div')

window.onscroll = function () {
    var top = document.documentElement.scrollTop || document.body.scrollTop
    if (top >= 800) {
        box.style.display = 'block'
    }

    // 添加点击事件
    box.onclick = function () {
        var time = setInterval(function () {
            var top = document.documentElement.scrollTop || document.body.scrollTop

            document.documentElement.scrollTop -= 50
            document.body.scrollTop -= 50

            if (top <= 0) {
                console.log(1);
                clearInterval(time)
            }
        }, 50)
    }
}
```



## 事件高级

### 什么是事件

用户操作上由某种行为产生的操作，比如点击触发事件，回车搜素(键盘事件)

## 事件对象

事件触发后，根事件相关的一系列信息数据的集合会在底层当中，被存放到一个实参中，这个实参就是事件对象

在页面中，定义事件函数的时候，需要在事件中函数设置形参，来接收这个实参，就可以使用事件对象了  

1、谁绑定了事件 

2、鼠标触发事件，可以得到鼠标相关的信息，比如：位置 

3、键盘触发事件，可以得到键盘的信息，比如：按下了哪个键 

```js
btn.onclick = function(event){
    // 注意：一般会使用 e 或者 event 
    console.log(event);
    // 事件对象的兼容
    // 注意：非标准浏览器，只能使用window.event  
    console.log(window.event);

    // 兼容
    var event = event || window.event 
}
```

### 常用的属性和方法

````js
// 常用的属性和方法
console.log(event.target); // 事件源 -- 发生事件的元素 -- 标准浏览器
console.log(event.srcElement);
var target = event.target || event.srcElement

// 鼠标距离浏览器左上角的距离
console.log(event.clientX); 
console.log(event.clientY);

// 鼠标到屏幕左上角的距离
console.log(event.screenX);
console.log(event.screenY);

// 鼠标距离文档左上角的距离(包含被卷出去的距离)
console.log(event.pageX);
console.log(event.pageY);
````

### event.target 和 this的区别

- this是事件绑定的元素
- e.target是事件触发的元素

## DOM的事件流

html标签中是互相嵌套的，可以将元素想象成一个盒子，document就是最大的盒子 

当点击最里面的div的时候，同时你也点击了div的父元素，甚至是整个页面 

事件流分为三个阶段：

1、当从最外面开始找目标元素的过程，是从最不具体的元素，到具体的某一个元素，这个过程是捕获过程  

2、找到对应的元素，并触发了相应的事件，这个是目标阶段  

3、当从最里面，点击了这个元素触发事件，从最具体的元素，到最不具体的元素，这个过程是冒泡阶段  

### 事件冒泡

当一个元素接收到事件，会把接收到的事件依次传递给父元素，一直到window(document)

````js
div[0].onclick = function(){
            console.log(this.id);
        }
        div[1].onclick = function(){
            console.log(this.id);
        }
        div[2].onclick = function(){
            console.log(this.id);
        }

        document.body.onclick = function(){
            console.log('body');
        }

````

### 案例 -- 暂停

````js
btn.onclick = function(e){
    var e = e || window.event
    div[0].style.display = 'block'
    // 先看下一个知识点 --- **************************
    // e.stopPropagation()
    // e.cancelBubble = true
    stopPropagation(e)
}

document.onclick = function(){
    div[0].style.display = 'none'
}
````

### 阻止冒泡

指的是子元素接收到事件后，阻止子元素在给父元素传播事件 

```js
标准浏览器：事件对象.stopPropagation(); 
IE浏览器（非标准）: 事件对象.cancelBubble = true 
```

谁冒泡就阻止谁 

兼容处理

````js
// 阻止冒泡兼容
/* 
@params： stopPropagation： 标准
@params： cancelBubble 非标准
*/
function stopPropagation(e){
    if(e.stopPropagation){
        e.stopPropagation()
    }else{
        e.cancelBubble = true
    }
}
````

### 捕获阶段

```js
div[0].addEventListener('click', fn, false)
div[1].addEventListener('click', fn, true)
div[2].addEventListener('click', fn, true)
// 把布尔值false变成true，就是在捕获阶段触发
```

### 事件的默认行为

事件的默认行为，就是元素的特殊操作，比如超链接

**取消默认行为**

````js
// 元素.事件名 = 事件函数 -- 传统的方式添加事件 
return false 

// 元素.addEventListener() 
事件对象.preventDefault() 

// 元素.attachEvent()  
事件对象.returnValue = false; 
````

````js
// 兼容
function preventDefault(e){
    if(e.preventDefault){
        e.preventDefault()
    }else{
        e.returnValue = false
    }
}
````

#### 自定义菜单

```js
var box = document.querySelector('#box'); 

document.oncontextmenu = function(e){
    e.preventDefault()
    box.style.display = 'block'
    box.style.left = e.pageX + 'px'
    box.style.top = e.pageY + 'px'
}

document.onclick = function(){
    box.style.display = 'none'
}
```

### 事件委托

将事件添加到父元素上，当事件发生的时候，父元素会找到对应的触发事件的子元素起处理，通过创建的元素，也会有事件

```js
btn.onclick = function () {
    var li = document.createElement('li');
    li.innerHTML = input.value
    ul.appendChild(li)
}

// 给每个li元素添加事件
// for (var i = 0; i < aLi.length; i++) {
//     aLi[i].onclick = function () {
//         this.style.background = 'red'
//     }
// }

// 事件代理（事件委托）
ul.onclick = function (e) {
    var e = e || window.event
    var target = e.target || e.srcElement; // 事件源  
    // if(target.nodeName === 'LI'){
    if (target.tagName === 'LI') {
        target.style.background = 'red'
    }
}
```

### 键盘事件

```js
// 常用的键盘事件
// 1、keyup -- 按键抬起的时候触发
document.addEventListener('keyup', function () {
    console.log('弹起了');
})

// 2、keydown -- 按键按下的时候触发
document.addEventListener('keydown', function (e) {
    console.log('keydown按下了');
    console.log(e.key); // 返回的是键名
})

// 3、keypress-- 按键按下的时候触发 -- 不能识别功能键 比如： ctrl shift alt 等等
document.addEventListener('keypress', function () {
    console.log('keypress按下了');
})

//4、keyCode -- 按键编码

document.addEventListener('keydown', function (e) {
   console.log(e.keyCode);
})
```

### 滚轮事件

鼠标中间的滚轮滚动的时候，js也可以监听到，称之为是滚轮事件

### 添加滚轮事件

````js
// 标准浏览器和IE浏览器 
元素.onmousewheel = function(){} // 绑定滚轮事件
// 火狐 
元素.addEventListener('DOMMouseScroll',fun,false) // 火狐只能这么绑定 
````

````js
var box = document.getElementById('box'); 

// 标准浏览器和IE  
box.onmousewheel = fun;  

// 火狐 
box.addEventListener('DOMMouseScroll',fun,false)

function fun(){
    console.log('滚动');
}
````

### 获取滚轮的信息

```js
标准、IE: 事件对象.wheelDelta  往上滚动  120 往下滚动 -120  
火狐： 事件对象.detail  往上滚动  -3 往下滚动 3  

// 为了统一方向 会使用 -3 *-40 
```

`````js
function fun(e){
// console.log('滚动');
// 滚轮信息
console.log(e.wheelDelta);
console.log(e.detail); // 火狐

}
`````

#### 滚轮信息兼容

````js
function wheelDelta(e){
    if(e.wheelDelta){
       return e.wheelDelta
    }else{
       return e.detail * -50
    }
}
````

#### 滚轮控制div元素的大小

````js
/* 
1、给元素绑定滚轮事件 
2、获取滚轮信息 
3、根据值判断，滚轮是向上还是向下滚动，让高度增减 
*/

var div = document.querySelector('div');
var h = div.clientHeight

// 标准浏览器和IE  
div.onmousewheel = fun;
// 火狐 
div.addEventListener('DOMMouseScroll', fun, false)

function fun (e) {
    // 判断向上向下
    var e = e || window.event; 
    if(wheelDelta (e) > 0){
        // 上 
        h--
    }else{
        // 下
        h++
    }
    div.style.height = h + 'px'
}

// 滚轮信息
function wheelDelta (e) {
    if (e.wheelDelta) {
        return e.wheelDelta
    } else {
        return e.detail * -50
    }
}
````

















































