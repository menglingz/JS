## Promise

Promise是一种异步编程的解决方案，传统异步解决方式(回调函数和事件)是es6提出，

就是一个容器，里面保存的是未来才会结束的一个事件，通常这个事件是一个异步处理的方式



有两个特点： 

- 状态不受外界的影响，三种状态 
- 一旦状态改变，就不会在变了  

基本用法：

````js
const promise = new Promise(function (resolve, reject) {
    if (异步处理成功) {
        resolve(value)
    }
    reject(error)
})
````

有then方法，可以实现链式调用

````js
promise.then(function(value){
  // 成功  
}, function(error){
    // 失败
})
````

```js
function loadImg (url) {
        return new Promise((resolve, reject) => {
            resolve(url)
        })
    }

    let url1 = 'https://www.baidu.com/1.png'
    let url2 = 'https://www.baidu.com/2.png'

    loadImg(url1).then(function (value) {
        console.log(value);
        return loadImg(url2)
    }).then(function (value) {
        console.log(value);
    })
```

**Promise -- 封装ajax**   --- 注意  没讲  

#### Promise.prototype.catch() 

````js
loadImg(url1).then(function (value) {
    return loadImg(url2111111)
}).then(function (value) {
    console.log(value111111);
}).catch(function(error){
    console.log('发生错误',error);
})
````

#### Promise.all()  

这个方式将多个promise实列，包装成一个新的Promise实列  

````js
const p = Promise.all([p1,p2,p3])
````

参数是一个数组,p1,p2,p3都是Promise的实列对象，如果有一个不是，就会调用下面的Promise.resolve()  ，将参数转为promise实列，参数也可以不是数组，单必须具备**iterator**接口，

- 只有p1,p2,p3的状态都变成fulfilled，那么，p的状态才是fulfilled，p1,p2,p3返回值组成一个数组，传递给p的回调函数  
- 只要p1,p2,p3有一个状态是rejected,那么,p的状态就是rejected

````js
const  promise = [2,3,5,7,11,13].map(function(id){
    return ('/post/' + id + '.json')
}) 

Promise.all(promise).then(function(posts){

}).catch(function(error){
    console.log(error);
})
````

#### Promise.race()

状态是看p1,p2,p3谁先改变，跟着先改变的状态进行改变  

#### Promise.resolve()  



### async函数 

````js
// async函数
// 如果是async函数，在函数内部，一定必须使用await表达式
async function a () {
    var h = await '1'
}
````

async函数是可以使用then的方法的，async函数的返回值是一个promise实列对象

## 闭包

指的是有权访问另一个函数作用域中的变量的函数，

一个作用域可以访问另外一个函数内部的局部变量

- 函数嵌套函数 
- 内部的函数可以引用外部函数的参数或者变量 
- 参数和变量不会被垃圾回收机制回收，因为函数内部还在使用 

**问题：闭包真的会引发内存溢出吗？**

```js
// 1、延长变量的使用范围
function aaa(){
    var a = 1; 
    return function(){
        a++
        alert(a)
    }
}

var c = aaa(); 

c();  // 2 
c(); // 3


// 获取正常的索引
var li = document.querySelectorAll('ul li');
for (var i = 0; i < li.length; i++) {
    (function (i) {
        li[i].onclick = function () {
            console.log(i);
        }
    })(i)
}

// 模块化代码
var aaa = (function () {

    var a = 1;
    function bbb () {
        a++
        alert(a)
    }
    function ccc () {
        a++
        alert(a)
    }

    // 以对象的形式返回 
    return {
        b: bbb,
        c: ccc
    }

})()

aaa.b(); // 2
aaa.c(); // 3
```

## 本地存储

### 特性

- 数据存储到用户的浏览器中 
- 设置、读取方便、有些时候页面刷新也不会丢失数据  
- 容量较大，session Storage 大约是 5M  localStorage大约是20M  
- **只能存储字符串**，可以将对象JSON.stringfy（）编码后存储

### window.sessionStorage

- 生命周期为关系浏览器窗口  
- 在同一个窗口（页面）下的数据是可以共享的 
- **以键值的形式存储使用** 

````js
// 存储数据 
// sessionStorage.setItem(key,value)

sessionStorage.setItem('name','张三')
sessionStorage.setItem('age',20)


// 获取数据  
console.log(sessionStorage.getItem('name'));

// 删除数据
sessionStorage.removeItem('name')

// 清空数据
sessionStorage.clear()
````

### window.localStorage

- 生命周期是永久的，除非是手动删除，否则一直存在  
- 可以多窗口(页面)共享数据（同一个浏览器）
- 以键值的形式存储使用 

````js
// 存储数据 
// sessionStorage.setItem(key,value)

localStorage.setItem('name','张三')
localStorage.setItem('age',20)

// 获取数据  
console.log(localStorage.getItem('name'));

// 删除数据
localStorage.removeItem('name')

// 清空数据
localStorage.clear()
````













