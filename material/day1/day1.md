事件三要素：事件源、事件类行、事件处理函数

```c
onclick
元素.addEventListener('事件类型',function(){},布尔值)
```



# 一、正则表达式

#### 1.什么是正则表达式？

```js
规则表达式,是可以对字符串操作的一种逻辑公式
```

#### 2.为什么要使用正则表达式?

```js
1.使用简单的代码，去匹配字符串
2.速度快，代码少
3.在复杂的字符串中快速精确的匹配的想要的字符
```

#### 3.正则表达式的创建

```js
字面量:
		var reg = /规则/修饰符;
实例化：
		var reg = new RegExp(规则,修饰符)
```

#### 4.修饰符

| i    | 忽略大小写 |
| ---- | ---------- |
| g    | 全部匹配   |
| m    | 多行匹配   |

```js
var  reg =/at/gi;//定义正则表达式
var str = "cATuATPOatjjkAT"//字符串
console.log(str.replace(reg,"**"));
```

#### 5.元字符

##### 5.1概念

```js
正则表达式中具有特殊含义的字符
```

| \d                                     | 匹配数字                 |
| -------------------------------------- | ------------------------ |
| \D                                     |                          |
| \w                                     | 匹配数字、字母、下划线   |
| \W                                     | 匹配非数字、字母、下划线 |
| \s                                     | 匹配空字符               |
| \S                                     | 匹配非空字符             |
| \b                                     | 匹配单词边界             |
| \B                                     | 匹配非单词边界           |
| [\u4e00-\u9fa5]      有事100  有酒发我 |                          |

##### 5.2特殊字符

| \    | 转义字符，将在正则中具有特殊含义的字符转化为普通字符 |
| ---- | ---------------------------------------------------- |
| []   | 中括号中的字符匹配任意一个                           |
| ^    | 以什么什么开始                                       |
| $    | 以什么什么结束                                       |
| [^]  | 取反、除了中括号里以外的字符                         |
| .    | 除了换行以外的任意字符                               |
| \|   | 或                                                   |
| （） | 分组                                                 |

##### 5.3限定符

| {n,m} | 匹配n-m个                |
| ----- | ------------------------ |
| {n}   | 匹配n个                  |
| {n,}  | 最少匹配n个              |
| +     | 一个或多个  <====> {1，} |
| *     | 0个或者多个  <===>  {0,} |
| ？    | 0个或者一个    {0,1}     |



##### 5.3示例

```js
手机号
 var telReg = /^1[3-9]\d{9}$/;
 var tel  = '13856239848';
 console.log(telReg.test(tel));
先想规则是什么？然后再针对性的补齐代码
QQ
var qqReg = /^[1-9]\d{4,10}$/,
       qq = "76472";
console.log(qqReg.test(qq));
身份证
 var idCardReg =/^[1-9]\d{16}[\dX]$/;
 var idCard = "15020719911016561X" ;
 console.log(idCardReg.test(idCard));
邮箱
var emailReg = /^\w{3,16}@\w{2,8}.com$/;
var email = '467@1236qq.com';
console.log(emailReg.test(email));


2022-9-5
2022-10-10
日期
var dateReg = /^\d{4}-\d{1,2}-\d{1,2}$/;
var date = '2022-10-15';
console.log(dateReg.test(date));



网址：
https://www.taobao.com/
.net  .cn
http 开头 s 有或者没有都可以  后面 ://
www. 可有可无   之后1-16数字字母下划线
最后是  .com   .cn  .net   结尾
var httpReg =  /^https:\/\/(www\.)\w{1,16}\.(com|cn|net)$/;
var http = 'https://www.taobao.com';
console.log(httpReg.test(http));
```

##### 5.4验证

```c
test格式:
    正则表达式.test(字符串)
返回值：布尔值  true  代表正确匹配  false 匹配失败
```

##### 5.5案例

```js
敏感词替换
格式：replace(reg,"你想要替换的字符串")
 // 1.敏感词替换
  var str = prompt("请开始敲字");//输入框
  var reg = /[Ss傻杀煞莎][bB比笔币]/gi; 
  var result = str.replace(reg,'**');
  alert(result)
从字符串中找到数字并且数字+2
格式：
	replace(reg,function($0){})
	replace第二个参数可以是一个函数，函数中的第一个参数是每一个匹配项·;
	// 数字+2、
    var str = 'L5ove2You0';
    var reg = /\d/g;
    var str1 = str.replace(reg,function($0)//
    {
        return $0 = +$0+2;//parseInt
    })
    console.log(str1);

转小驼峰
replace(reg,function($0,$1){})
$1 可以拿到正则表达式小括号的分组内容
var str = 'get-element-by-id';//getElementById
    // var str1 = str.replace(/-(\w)/g,function($0,$1)
    var str1 = str.replace(/-([a-z])/g,function($0,$1)
    {
        return $1.toUpperCase();
    })
    console.log(str1);


```

#### 5.6字符串的方法

##### 5.6.1match()方法

```js
语法：
	字符串.match(正则表达式)
返回值：数组
返回匹配项组成的数组
示例：
	var str = 'abcdabcda';
    var res = str.match(/a/g);//全局匹配
    console.log(res);
```

##### 5.6.2exec()方法

```js
语法：
    正则表达式.exec(字符串)
返回值：数组

exec()方法  返回匹配项组成的数组(不支持全局匹配)
不加g永远只能找到第一个
但是当我加g,调用一次匹配第一个，再调用一次匹配第二个，依次类推。找不到返回null
var str = 'abcdabcda';
var reg = /a/g;//不支持全局匹配，执行一次走一次
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
```

##### 5.6.3split()方法

```js
支持使用 正则表达式当做分隔符
var str = 'get-element-by-id';
var res = str.split(/-/g);//正则表达式 ，不需要加""
console.log(res);
```

##### 5.7总结一下

```js
1.修饰符  i  忽略大小写    g 全局匹配   
2.元字符  \d数字   \w 数字字母下划线    \s  空字符     \b   单词边界  
3.特殊字符   \转义字符 | 或   [] 任意一个   [^] 除...之外 ^ 开头   $结尾  .  任意  （）分组
4.限定符   + 1或多   *  0或多    ？ 0或1 
5.正则方法  test 返回boolean值    exec() 返回数组，不支持全局匹配
6.字符串方法  replace()  替换     macth() 返回数组，支持全局匹配
```

练习：

```js
 var ipts = document.querySelectorAll("input"),
        // btn = document.getElementById()
        btn = document.querySelector('#btn');
        var obj ={
            user:/^[\u4e00-\u9fa5]{2,8}$/,//用户名
            pas:/^\w{6,16}$/,   //密码
            tel:/^1[3-9]\d{9}$/  //手机号
        } 
        // 用户名  dom 0级事件
        ipts[0].onblur = function()
        {
            //返回 fasle true
            // 正则.test(str)
            console.log(obj.user.test(ipts[0].value));
            return   obj.user.test(ipts[0].value)
        }
        //密码
        ipts[1].onblur = function()
        {
            //返回 fasle true
            // 正则.test(str)
            console.log(obj.pas.test(ipts[1].value));
            return   obj.pas.test(ipts[1].value)
        }
        //手机号
        ipts[2].onblur = function()
        {
            //返回 fasle true
            // 正则.test(str)
            console.log(obj.tel.test(ipts[2].value));
            return   obj.tel.test(ipts[2].value)
        }
        // dom2级事件
        btn.addEventListener("click",function()
        {
            if(ipts[0].onblur() && ipts[1].onblur() && ipts[2].onblur())
            {
                alert("输入正确");
            }
            else{
                alert("输入错误");
            }
        })
```

# 二、面向对象

#### 1.对象

```c
一组无序的属性集合
```

#### 2.什么是面向对象

```js
面向对象是一种程序设计模式（编程思想），将对象作为基本单元，将程序和数据进行封装
```

#### 3.为什么学面向对象

```js
可重用、可维护性好、可扩展、灵活性好
```

#### 4.创建对象

##### 4.1字面量

```js
var obj = {
    
}
```

##### 4.2实例化

```js
var obj = new Object();//构造器创建对象
```

示例：

```js
var dog = {
            name:"旺财",
            age:1,
            sex:'男',
            eat:function(){
                console.log("啃骨头");
            },
            jump:function(){
                    console.log("跳");
            },
            run:function(){

            }
        }

```

##### 4.3对象的相关操作

```js
// 对象的遍历for  in 循环
//对象的遍历
        for(var key in dog){
            console.log(key,dog[key]);
        }
		dog.name = "二狗";//修改对象的内容
        dog.kg = "180kg";//添加对象的内容

        delete dog.run;// 删除对象中的内容
        console.log(dog);
```

##### 5.作用域

```c
全局作用域：全局变量
局部作用域：定义的函数内部使用
变量提升：使用var关键字声明的变量会将（var 变量名）提升到当前作用域的最顶端，赋值留在原地
函数提升：函数声明会提升到当前作用域的最顶端
```

##### 6.this指向

```c
什么是this指向？
this在js中是指执行上下文环境对象

this指向在调用之前是不确定指向谁的
在非严格模式下,this指向window
在严格模式下，this指向的undefined
```

##### 7.this指向作用场景

```js
谁调用指向谁，

1. 全局作用域下，this指向window
console.log(this);
console.log(this === window); //true
2.函数独立调用时，函数内部的this也指向window
function fn()
{
 console.log(this);
}
fn();
3.被嵌套函数独立调用时，this默认指向window
function fun1(params)
{
function fun2(params)
{
   console.log("我是嵌套函数");
   console.log(this);
}
fun2();
}
fun1();
4.自执行函数（立即执行函数）中内部的this也是指向window
(function(params){
console.log("立即执行");
console.log(this);
})();
5.事件处理函数中的this====>绑定事件的元素
document.querySelector("#box").onclick= function()
{
console.log(document.querySelector("#box") == this);
}
6.对象中的this ==> 指向调用函数的对象
var obj = {
    x:100,
    fn:function()
    {
        console.log(this);
    }
};
// obj.fn();//obj
var a = obj.fn;
a();//window
```

##### 8总结

函数中的this

直接调用 ====>window

事件处理函数====>事件源

对象调用===>对象

构造函数中的this ---->实例化对象

###### 函数中谁调用this.指向谁

#### 9.改变this指向

##### 1.apply()

```js
apply()方法
第一个参数指定对象
第二参数：原函数的参数放到数组中
格式：函数名.apply()
示例：
var obj = {
    user:"小李",
    fn:function()
    {
            console.log(this.user + "能吃");
    }
}
newObj = {
    user:"小王"
}
//  obj.fn()//15行this指向小李
obj.fn.apply(newObj)

function fn(a,b)
{
    console.log(a,b,this);
}
fn(1,2);
fn.apply("xiaowang",[1,2])
```

##### 2.call()

```js
call()方法
第一个参数必须是指定的对象，传入什么强制指向什么
第二个参数：将原函数的参数往后顺延一位
格式：
函数名.call()
function fn(a,b)
{
    var user = "xiaoli";
    console.log(a,b,this);
}
fn(1,2);
fn.call("xiaowang",1,2)
```

##### 3.bind()

```js
bind()方法的用户和call()一样，直接运行方法

/*
但是需要注意的是bind()返回新的方法，需要重新调用
*/
格式：
	函数名.bind()
示例：
var obj = {
user:"xiaoli",
score:85,
fn:function(){
    console.log(this);
    console.log(this.user+ "就考了" + this.score + "分");
}
}
var newObj ={
user:"yanlu",
score:9999
}
// obj.fn();//只有在调用之后才可以确定this的指向
obj.fn.bind(newObj)();
```

#### 10.工厂模式

```js
为什么要使用工厂模式，解决了创建多个相似对象（结构相似）的问题
```

示例：

```js
// function car(name,color,height)
// {
//     var obj = new Object();
//     obj.name = name;//等号左边的新增，右边是形式参数
//     obj.color = color;
//     obj.height = height;
//     return obj;
// }
function car(id)
{
    return {
        name:"BMW",
        kg:"200kg",
        color:"red",
        idCard:id,
        run:function()
        {
            console.log("跑的贼快");
        }
    }
}
var arr = [];
for(var i=1;i<=100;i++)
{
    arr.push(car(i))
}
console.log(arr);
```

1.找的你的轮播图排版

2.form表单练习---带等





