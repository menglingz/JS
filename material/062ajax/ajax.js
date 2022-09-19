
/* 
method --- 请求方式： get / post 
url --- 请求数据的地址 
data -- 携带的数据 可以传(数据)也可以不传(null)
callBack --- 回调函数 把服务器的数据携带回来，准备渲染页面
*/

function ajax (method, url, data, callBack) {

    var xhr = new XMLHttpRequest()
    if (method.toLowerCase() === 'get') {
        // get请求 
        if (data) {
            url += '?' + data
        }
        xhr.open(method, url, true)
        xhr.send();
    } else if (method.toLowerCase() === 'post') {
        // post请求 
        xhr.open(method, url, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(data)
    }

    xhr.onreadystatechange = function () {
        // ajax 
        if (xhr.readyState === 4) {
            // 服务器
            if (xhr.status === 200) {
                callBack && callBack(xhr.responseText)
            } else {
                throw new Error('请求失败，错误码是：' + xhr.status)
            }
        }
    }

}