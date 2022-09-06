
function Banner(obj) {
	//合并参数
	Object.assign(this, obj)
	console.log(this);
	// this.timer = null;//全局作用域
	this.count = 0;
	this.init();

}
// 重写原型
Banner.prototype = {
	constructor: Banner,
	init: function () {//初始化方法
		this.auto();
		this.bindEvent();
		this.render();

	},
	render: function () {//渲染方法 ``  es6语法的拼接
		this.ul.innerHTML = this.data.map(function (item, ind) {
			return `<li index = ${ind} class = ${ind === 0 ?"active":""}></li>`
		}).join("")
	},
	//自动轮播
	auto: function () {
		var that = this;//提前记录状态
		//局部作用域
		this.timer = setInterval(function () {
			//that.count++    ++that.count
			// ?   :  三木运算符
			//条件？满足，执行这块 :不满足执行的代码
			// that.data.length-1  数据的长度
			// ++that.count 0  1 2 3
			that.count = ++that.count > that.data.length - 1 ? 0 : that.count;
			that.change(that.count);
		}, 1000)
	},
	bindEvent: function () {
		var that = this;
		// 移入停止、
		this.box.addEventListener("mouseover", function () {
			clearInterval(that.timer);
			// 箭头的显示
			that.left.style.display = "block";
			that.right.style.display = "block";
		})
		// 移出继续
		this.box.addEventListener("mouseout", function () {
			that.auto();
			// 箭头的隐藏
			that.left.style.display = "none";
			that.right.style.display = "none";
		})
		//左移
		this.left.addEventListener("click", function () {
			that.count = --that.count < 0 ? that.data.length - 1 : that.count;
			that.change(that.count)
		})
		// 右移
		this.right.addEventListener("click", function () {
			that.count = ++that.count > that.data.length - 1 ? 0 : that.count;
			that.change(that.count)
		})
		//利用事件委托的形式ul绑定事件
		this.ul.addEventListener("click",function(e)
		{
				var ev = e.target;
				if(ev.nodeName === "LI")
				{
					console.log(ev);
					//获取自定义属性的方法getAttribute
					that.count = ev.getAttribute("index");
					console.log(that.count);
					that.change(that.count);
				}
		})
	},
	change: function (n)
	//改变图片的路径
	//高亮
	{
		this.img.src = this.data[n];
		document.querySelector(".active").classList.remove("active");
		this.ul.children[n].classList.add("active");
	}
}


