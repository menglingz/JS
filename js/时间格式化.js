function dateFormatting(time) {
  let YY = time.getFullYear()
  let MM = time.getMonth() + 1
  let DD = time.getDate()
  let hh = time.getHours()
  let mm = time.getMinutes()
  let ss = time.getSeconds()
  return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`
}
