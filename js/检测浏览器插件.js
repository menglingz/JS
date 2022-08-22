function hasPlugin(name) {
  name = name.toLowerCase()
  // window.navigator.plugins 和name属性已被弃用
  for (let plugin of window.navigator.plugins) {
    if (plugin.name.toLocaleLowerCase().indexOf(name) > -1) {
      return true
    }
  }
  return false
}
