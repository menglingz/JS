## 数据类型

#### 为什么需要数据类型

不同的数据占用的内存是不一样的，为了节省内存，需要给数据分配不同的数据类型，可以占用不同的内存  

**注意：js是一种动态分配内存的动态语言**  

### 数据类型分类

- 简单的数据类型
  - Number 数值类型   String 字符串类型  Boolean  布尔值  null 空值  undefined  未定义 
- 复杂的数据类型 --  object
  - Array  数组  Object 对象    Function 函数

### 检测数据类型

使用typeof 检测数据类型 

```js
typeof 变量  // 返回值就是数据的类型 
```

### Number 数值类型

- 整数 

```js
var  num = 10; 
console.log(typeof num);
```

- 小数 

```js
var  num1 = 1.2; 
console.log(typeof num1); 
// 注意：小数是有精度缺失的 --- 不要使用小数当做判断条件 
console.log(0.1 + 0.7);
console.log(0.3); 
```

- 无穷大 无穷小 
- NaN 

不是个玩意，计算错误一定会出现NaN 

```js
console.log(typeof NaN);
```

- 进制 

```js
var num = 0101010; // 二进制 
var num1 = 0123456; // 八进制 
var num2 = 3468 
var num3 = 0xaf; // 十六进制   
```

### String 字符串类型

使用单引号或者双引号引起来的都是字符串，因为样式中使用的是双引号，字符串中推荐使用单引号

```js
var str = '10'; // 纯数字的字符串  
var str1 = "我爱美女"; // 字符串
```

#### 字符串的拼接

```js
console.log(10 + 10); // 20 
console.log('10' + 20); // 1020 
console.log('10' + '20'); // 1020
```

#### 字符串的方法

字符串是有长度（就是字符串中字符的个数）和下标（从 0 开始的，每个字符的下标，是字符的位置数 - 1）的

字符串是可读不可写的（也就是字符串通过下标取值，是无法改变的）

```js
console.log(str.length); // 10

console.log(str[0]); // 
str[0] = 'k'
console.log(str); // 可读不可写  

// 使用的是小括号 参数是下标值  --- 返回值是字符
console.log(str.charAt(0));
// 使用的是小括号 参数是下标值  --- 是码值 常用来实现字符串的去重或分类
console.log(str.charCodeAt(0));
```

#### 字符串拼接

````js
// 获取元素
var box = document.getElementById('box'); 

var num = 30
var num1 = 185
var num2 = 150
var num3 = 80

box.innerHTML = '<h1>我今年'+num+'岁</h1><h1>身高185</h1><h1>体重150</h1><h1>腰围80</h1>'

box.innerHTML = '<h1>我今年'+num+'岁</h1>'+
                '<h1>身高185</h1>'+
                '<h1>体重150</h1>'+
                '<h1>腰围80</h1>'
// es6的模板语法
box.innerHTML = `<h1>我今年${num}岁</h1>
        <h1>身高185</h1>
        <h1>体重150</h1>
        <h1>腰围80</h1>`
````

#### Boolean  布尔值

有两个值 true(真 -- 1)  false（假  -- 0） 

常用于判断条件的返回值 

```js
console.log(true + false); // （ 1+ 0 ） 
console.log( 10 > 90); // fasle 
```

#### null 空值   和  undefined  未定义 

undefined  ： 变量声明了 但是没有赋值 

null ： 空值，但是是占用内存，提前分配一块内存，用来将来存放一个对象

````js
console.log(typeof null); // object
````

#### isNaN

```js
console.log(typeof isNaN); // function
/*     
isNaN: 是不是 不是一个数字？   
       是数字：不是  是一个数字  
       不是数字：是 不是一个数字  
*/

console.log(isNaN(10));  // 不是 是一个数字
console.log(isNaN('10'));  // 不是 是一个数字
console.log(isNaN('str'));   // true  不是一个数字 
```

## 复杂的数据类型 --  object

#### Array  数组  

数组是一组无序的数据集合

#### 声明数组

- 字变量

````js
var arr = [1,'str',true,false,null,undefined,function,[],{}]
````

```js
var arr = [1,2,3,4,5]
console.log(arr.length); // 数组中元素的个数 
console.log(arr[0]); // 取值 -- 数组中必须通过下标存储值或者取值
arr[5] = 6
console.log(arr); 
```

- 使用关键字 new  

```js
var arr = new Array() // 实列化一个数组对象
```

#### Object 对象    

万物都是对象

对象是有属性和方法的 

对象：名词

属性：形容词

方法：动词

- 关键字

````js
var obj = new Object() // 实列化一个对象
````

- 字变量

```js
var obj = {} // 对象
```

```js
// 对象 -- 是键值（有属性名，有属性值，并且是冒号隔开）对的集合 
// 属性名对于程序员是没用的，需要的是属性值，但是，必须通过属性名才可以区到属性值
var obj = {
    name: '张三三',
    age:30,
    eat:function(){
        console.log('我很能吃');
    }
} 
console.log(obj.name); 
obj.eat()

var obj1 = new Object(); 
obj1.name = '李四'
var a = 'name'
console.log(obj1[a]);
```

#### Function 函数

函数就是一段可以重复执行的代码块  

- 字变量

```js
var fn = function(){
    // 代码块
}
```

- 关键字 function 

```js
function add(){
    // 代码块
}
```

```js
function add(){
    console.log('代码块');
}
// 函数必须调用，否则不会执行  --  函数名+() 也就是 add()
add()

var num = function(){
    console.log('代码块');
}
num()
```

## 数据类型转换

- Number()  

把其他的数据类型转换成Number类型，但是，只能转换纯数字的字符串 

```js
console.log(Number('1') + 1); // 11
// 如果遇到不能转换的 直接返回NaN
console.log(Number('1a') + 1); // 11
```

- parseInt() 

把其他的数据类型转换成整数的Number类型，也就是保留整数 

遇到转换就直接转化，如果遇到不能转换，返回转换完成的

```js
console.log(parseInt('1') + 1); // 2
console.log(parseInt('1.9') + 1); // 2.5
console.log(parseInt('100.99px') + 10); // 110
```

- parseFloat ()

把其他的数据类型转换成小数的Number类型，保留整体 

遇到转换就直接转化，如果遇到不能转换，返回转换完成的

```js
console.log(parseFloat('1') + 1); // 2
console.log(parseFloat('1.9') + 1); // 2.5
console.log(parseFloat('100.99px') + 10); // 110
 // toFixed()数字是多少，就保留多少位小数
console.log(parseFloat('1.23456789').toFixed(2))
```

- Boolean()

把其他的数据类型转换成布尔类型

````js
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(''));
console.log(Boolean(false)); 
console.log(Boolean(NaN));
console.log(Boolean(0));
````

- String()

把其他的数据类型转换成字符串类型

````js
console.log(typeof String(1));
````

- toString

```js
console.log(typeof (1).toString());
```

### 运算符

- 算术运算符 

````js
+ 加  - 减 	* 乘 	/ 除 	% 取余

// 代码

````

- 自增自减 
- 比较运算符
- 逻辑运算符 
- 赋值运算符

























