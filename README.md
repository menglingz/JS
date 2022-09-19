- # JS

JS学习



### 优化总结

#### 1.定时器优化

- 存在问题：开辟的定时器变量会占内存
- 优化步骤：将定时器变量作为元素的属性，这样既可以不用在内存中额外开辟一个定时器变量内存

#### 2.比较运算符使用选择

- 判断是其是否为`null`，使用双等（`jQuery`源码）

  ```js
  element == null
  // 相当于 element === null || element === undefined
  ```

- 其余比较操作用三等

#### 3.null和undefined

- `null`表示被分配了一块空内存，生成一个哈希地址
- `undefined`表示声明的变量为赋值，参与运算的时候，表达式的结果是`NaN`

#### 4.循环一个不断变换的结构

- 例：`NodeList`集合类型是实时的，文档结构的变化会实时地在他们身上反映出来，因此他们的值始终代表最新的状态。

- 基于此，下面的循环会导致无限循环

  ```js
  let divs = document.getElementsByTagName('div')
  for(let i = 0;i<divs.length;i++){
    let div = document.createElement('div')
    document.body.appendChild(div)
  }
  ```


- 每次循环开始，都会求值`i < divs.length`。这意味着要执行获取所有`<div>` 元素的查询。因为循环体中会创建并向文档添加一个新的`<div>` 元素，所以每次循环`divs.length`的值也会递增。因为两个值都会递增，所以i将永远不会等于`dis.length`，导致无限循环。

- 解决办法：任何时候要迭代NodeList，最好在初始化一个变量保存当时查询时的长度，然后用循环变量与这个变量进行比较。

  ```js
  let divs = document.getElementsByTagName('div')
  for(let i = 0;len = divs.length;i<len;i++){
    let div = document.createElement('div')
    document.body.appendChild(div)
  }
  ```


- 在这个例子中，又初始化了一个保存集合长度的变量`len`。因为`len`保存着循环开始时集合的长度，而这个值不会随着集合增大动态增长，所以这就可以避免无限循环。


- 另外，如果不想在初始化一个变量，也可以反向迭代集合。

  ```js
  let divs = document.getElementsByTagName('div')
  for(let i = divs.length - 1;i >= 0;i--){
    let div = document.createElement('div')
    document.body.appendChild(div)
  }
  ```

