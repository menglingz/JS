function Menu(obj)
{
    Object.assign(this,obj);
    console.log(this);
    this.index = 0;
    this.init();
}
Menu.prototype = {
    // constructor:Menu
    init:function()
    {
        this.render(this.pro,this.data);
        this.bindEvent();
    },
    render:function(ele,data)//ele 代表渲染的容器  data  渲染的数据
    {
        //渲染省、市、区
        //数据、渲染位置不同。
        ele.innerHTML = `<option value="">请选择</option>`;
        ele.innerHTML += data.map(function(item)
        {
            return `<option >${item.name  || item}</option>`
        }).join("")
    },
    bindEvent:function(){
        var that = this;
        this.pro.addEventListener("change",function()
        {
            // this----->  this.pro
            that.index = this.selectedIndex-1;//记录省级的下标
            console.log(that.data[that.index].city);
            that.render(that.city,that.data[that.index].city);
            that.area.innerHTML = `<option value="">请选择</option>`;
        })
        this.city.addEventListener("change",function()
        {
            that.render(that.area,that.data[that.index].city[this.selectedIndex-1].area)
            // console.log(that.data[that.index].city);
            // console.log(that.data[that.index].city[this.selectedIndex-1].area);
        })
    }
    
    

}



// change  click
/*
change 当元素值发生改变时，会触发change事件
change 适用于  textarea select

当你是select时，change 事件会在选择某个选项时。发生
    textarea时，在元素失去焦点是触发


    特定的执行顺序
    点击select出现下拉。一次点击事件
    选择下拉框中的某个选项时，将要选择的与你框中的不一样，一次change事件
    点击选择这个值时，会先产生change事件，再产生click事件
    
     选择下拉框中的某个选项时，将要选择的与你框中的一样，
    点击选择这个值时，产生click事件

*/
