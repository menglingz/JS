function Select(obj) {
  Object.assign(this, obj)
  this.init()
}
Select.prototype = {
  init() {
    this.render(this.province, this.data)
    this.bindEvent()
  },

  render(ele, data) {
    ele.innerHTML = `<option value="">请选择</option>`
    ele.innerHTML += data.map((item) => `<option >${item.name || item}</option>`).join('')
  },
  bindEvent() {
    let that = this
    this.province.addEventListener('change', function () {
      that.index = this.selectedIndex - 1 //记录省级的下标
      that.render(that.city, that.data[that.index].city)
      that.area.innerHTML = `<option value="">请选择</option>`
    })
    this.city.addEventListener('change', function () {
      that.render(that.area, that.data[that.index].city[this.selectedIndex - 1].area)
    })
  }
  // provinceRender() {
  //   // 遍历省份数据，插入节点
  //   for (const x of city) {
  //     let option = document.createElement('option')
  //     option.value = x.name
  //     option.innerText = x.name
  //     this.province.appendChild(option)
  //   }
  // },
  // cityRender() {
  //   let that = this
  //   this.province.addEventListener('change', function (e) {
  //     // 将上一次选择的城市选项清零
  //     if (that.city.children.length !== 1) {
  //       let node = that.city.firstElementChild.nextElementSibling
  //       while (node) {
  //         that.city.removeChild(node)
  //         node = that.city.firstElementChild.nextElementSibling
  //       }
  //     }
  //     // 将上一次选择的地区选项清零
  //     if (that.area.children.length !== 1) {
  //       let node = that.area.firstElementChild.nextElementSibling
  //       while (node) {
  //         that.area.removeChild(node)
  //         node = that.area.firstElementChild.nextElementSibling
  //       }
  //     }
  //     // 通过选择的省份找到对应的城市数据，遍历城市数据，插入节点
  //     let citys = city.find((ele) => ele.name === e.target.value)
  //     // 存储选择的省份数据
  //     that.data = citys.name
  //     // 遍历
  //     for (const x of citys.city) {
  //       let option = document.createElement('option')
  //       option.value = x.name
  //       option.innerText = x.name
  //       that.city.appendChild(option)
  //     }
  //   })
  // },
  // areaRender() {
  //   let that = this
  //   this.city.addEventListener('change', function (e) {
  //     // 将上一次选择的地区选项清零
  //     if (that.area.children.length !== 1) {
  //       let node = that.area.firstElementChild.nextElementSibling
  //       while (node) {
  //         that.area.removeChild(node)
  //         node = that.area.firstElementChild.nextElementSibling
  //       }
  //     }
  //     // 通过选择的省份找到对应的城市数据在根据城市数据找到地区数据，遍历地区数据，插入节点
  //     let areas = city.find((ele) => ele.name === that.data).city.find((x) => x.name === e.target.value)
  //     // 遍历
  //     for (const x of areas.area) {
  //       let option = document.createElement('option')
  //       option.value = x
  //       option.innerText = x
  //       that.area.appendChild(option)
  //     }
  //   })
  // }
}
