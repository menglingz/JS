var CookieUtil = {
  get(name) {
    let cookieNmae = `${encodeURIComponent(name)}`,
      cookieStart = document.cookie.indexOf(cookieNmae),
      cookieValue = null

    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieNmae.length, cookieEnd))
      return cookieValue
    }
  },

  set(name, value, expires, path, domain, secure) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toGMTString}`
    }
  }
}
