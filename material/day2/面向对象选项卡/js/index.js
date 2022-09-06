// 构造函数
function Tab(obj) {
    // console.log(obj);
    this.ul = obj.ul;
    this.bottom = obj.bottom;
    this.change();
    // 想要将我的全部传入到我的this中
    console.log(this);
}
Tab.prototype = {
    constructor: Tab,//指回构造函数本身,(可写可不写)
    // init:function()
    // {

    // }
    change: function () {
        // console.log(1);
        //tab功能
        var _this = this;//提前记录一下状态
        this.ul.onclick = function (e) {
            //事件委托
            var ev = e.target;//事件源
            if (ev.nodeName === "LI") {
              //当我进行li的切换时
              //我应该要删除1的高亮（删除active）
              document.querySelector(".active").classList.remove("active")
              //2高亮显示
              ev.classList.add("active");
              //对应的内容改变
            //   console.log(this);
            _this.bottom.innerHTML=ev.innerHTML
            }

        }
    }
}
