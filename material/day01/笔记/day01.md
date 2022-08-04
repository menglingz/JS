**文档分为三种层：** 

- 结构层  -- html 
- 样式层  -- css  
- 行为层  -- js（javascript）

## 使用

- 行内 

在开始标签内，写入js方法，后面跟上表达式(数值和运算符组合成的)

```js
<!-- 
onclick:单击事件
alert：是js自带的弹出框，带有一个确定按钮，有阻塞作用 -- 也就是不点击确定按钮，alert后面的代码是不执行的
-->
<div onclick="alert('弹窗')"></div>
```

- 内部 

是在html页面内，写入script双标签，所有的代码写在这个双标签之间，可以存在页面当中的任何位置

但是，要求放在body结束标签之前，或者是head的结束标签之前，其他的位置，并不推荐使用

````js
<script>
    alert('内部的使用方式')
</script>
````

- 外部

在外部新建一个js文件，扩展名是 .js 需要使用script双标签的src属性，链接外部的js 

外部的js文件中，直接写js代码，不需要script双标签

```js
<script src="./js/index.js"></script>
```

总结：

1、不推荐使用行内js , 因为可读性或者可维护性较差 

2、如果是小型的项目，推荐使用内部  

3、如果是大型的项目，推荐使用外部，可以少量的使用内部 

4、如果script双标签，是用来实现内部js的，那就不能在用于外部js的链接，反之亦然

**注意：超链接 -- 因为超链接自带点击跳转 -- 伪链接**

````js
<a href="javascript:;"></a>
````

## 常用的语句

````js
// 注意：变量或者数字，不需要加引号
alert(123) 
// 控制台打印语句，用来测试使用的
console.log('结果在控制台显示');

/*  
是一个用户可以输入的弹窗
带有一个确定按钮和取消按钮，如果点击的是确定按钮，返回值是输入框中的值 
如果点击的是取消按钮，那么，输入框中的值会丢失 
*/
console.log( prompt('请输入用户名:'));
/*  
如果点击的是确定按钮，返回值是true 
如果点击的是取消按钮，返回值是false 
*/
console.log(confirm('你好'));
````

## 语法

js的构成：

- ECMAScript  --- es1 -- 11 
- DOM  --  document object model  -- 文档模型  
- BOM -- browser object model  -- 浏览器模型

## 变量

- 变量就是用来存储值的一个容器
- 变量一定是先声明(定义和赋值)后使用  
- 声明变量使用关键字 var (es5)

 ```js
var a; // 声明了 但是没有值 结果是 undefined
/* 1、声明一个变量，并赋值 */
var num = 10;
console.log(num + 10);

/* 2、 声明多个变量，并同时赋值，每个变量之间使用逗号隔开 */
var num1 = 10, num2 = 20, num3 = 30; 
console.log(num1, num2, num3);

/* 3、声明多个变量，并分开赋值 */
var sum1,sum2,sum3; 
sum1 = 100
sum2 = 200 
sum3 = 300
console.log(sum1, sum2,sum3);
 ```

## 变量的声明规则

- 以字母，下划线，$开头 
- 由字母，下划线，$开头，数字组成  
- 不能使用关键字和保留字 
- 见名知意 -- 语义化  
- 遵循驼峰命名法 --  变量名从第二个单词开始，首字母要大写  

## 事件

通过鼠标或者键盘触发，引发一些列的元素的行为 就是事件  

事件三步骤：

- 事件源 -- 也就是哪个元素发生事件  ---  获取元素  
- 发生什么事件 -- 把事件绑定给元素  
- 干什么事   -- 事件触发后，会引发什么行为  

````js
// 获取元素
/* 
document:文档
get: 获取 如果是set 就是设置
Element： 元素 -- 标签
By：通过
Id：ID的名字
.： 的
*/
var box = document.getElementById('box')
// 把事件绑定给元素 -- 这个函数就是事件函数，只有事件被触发的时候，才可以执行这个函数
box.onclick = function() {
    // 事件触发后，会引发什么行为
    console.log('我是一个好人');
}
````

## 事件的种类

````js
onclick: 单击事件 

onmouseover: 鼠标经过  
onmouseout: 鼠标离开  

onmouseenter: 鼠标经过
onmouseleave: 鼠标离开   

onmousedown: 按下 
onmouseup: 抬起 

onmousemove: 移动  

ondblclick：双击事件 

oncontextmenu: 右键

````

```js
/* 
window.onload: 是把js代码临时存储起来，等到结构中所有的元素
加载完毕，在执行js代码
*/
window.onload = function () {
    var box = document.getElementById("box");
    console.log(box);
};
```

## 文本操作

单标签和双标签

- 双标签  <div></div>
- 单标签：<input>

### 双标签

- 获取内容 ---- 元素.innerHTML 
- 获取内容 ---- 元素.innerText
- 设置内容 -- 元素.innerHTML = '新内容'
- 设置内容 -- 元素.innerText = ’新内容‘

````js
// 获取元素内容
console.log(box.innerHTML); 
console.log(box.innerText);

// 设置元素内容  // 有覆盖作用
box.innerHTML = '猪又活了'
box.innerHTML = '猪又死了'

// 解决覆盖
box.innerHTML = box.innerHTML + '到底是活了'
// 简写
box.innerHTML += '到底是活了'

box.innerText = '123' 
box.innerText = box.innerText + '456'
box.innerText += '456'
````

区别

- innerHTML是支持标签的 
- innerText不是支持标签的 

```js
box.innerHTML = '<h1>我是识别标签的</h1>'
box.innerText = '<h1>我是不识别标签的</h1>'
```

### 单标签

input框内容的获取和设置  

语法：

````js
元素.value // 获取内容
````

```js
元素.value = '新内容' // 设置内容
```

```js
console.log(pt.value); // 获取文本内容 
pt.value = '新内容'
```

### 样式操作

语法：

只要是js操作的样式，一定是行内样式

````js
元素.style.样式名 = 样式值 
// 比如：
元素.style.width = '100px' 
````

不足：一次只能实现一个样式值的改变 

```js
// 改变样式
box.style.width = '200px'
box.style.height = '200px'
// box.style.background = 'blue'

// 注意：如果是复合词，需要遵循驼峰命名法  
box.style.backgroundColor = 'green'
```

### 批量修改样式

语法：

```js
元素.style.cssText = "width:100px; height:100px;"

// 没有提示
```

```js
box.style.cssText = 'width: 100px;height: 100px;background-color: blue;' 
// 是可以覆盖的  -- 在样式的前面加一个分号 解决非标准浏览器的兼容问题
box.style.cssText += ';border:2px solid red'
```

### 属性操作

- 原有属性：标签元素本身自带的属性，比如：id class  src  href  
- 非原有属性:程序员为了实现某些效果，自己添加的就是非原有属性

### 原有属性

- 获取属性

````js
语法：
元素.属性名
// 比如 
元素.id  
元素.src 
````

```js
// 获取id属性
console.log(box.id); // box
console.log(box.a); // undefined 
console.log(box.class); // undefined 因为class是一个保留字 属性的操作方式是获取不到的  
```

- 设置属性 

```js
语法：
元素.属性名 = 新的属性值
// 比如 
元素.id  = 新的id 
元素.src = 新的src路径
```

````js
// 设置属性
box.id = 'box1234567'
````

如果一个属性，赋值给了一个变量，那么就要把点的方式转换成方括号的方式  

```js
var a = 'id'
console.log(box[a]); 
console.log(box['id']); 
```

### class

因为class是一个保留字，需要使用className来操作class 

语法：

````js
元素.className  // 获取类名 
元素.className = '新的类名'  设置classzhuy
````

注意：className是可以覆盖原有的类名的  

```js
// 获取一个类
console.log(box.className);
// 添加一个类
// box.className = 'box div1 div2 div3 div4 div'
box.className = 'active'
```

```js
box.classList.add() // 增加一个类 
box.classList.remove() // 删除一个类 
```























