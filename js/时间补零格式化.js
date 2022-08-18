/* 
  传入一个毫秒数
 */
function dateZeroFormat(time) {
  //计算天数
  d = parseInt(time / 60 / 60 / 24)
  //计算小时
  h = parseInt((time / 60 / 60) % 24)
  //计算分钟
  m = parseInt((time / 60) % 60)
  //计算秒
  s = parseInt(time % 60)
  // 补零
  d = d < 10 ? '0' + d : d
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return `${d}:${h}:${m}:${s}`
}
