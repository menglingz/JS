
/* 
method:方法 -- get / post 
url: 数据请求地址
data:传入给后台的数据
callback:回调函数 -- 用来接收数据

*/

function ajax (method, url, data, callback) {

    var xhr = new XMLHttpRequest();

    if (method.toUpperCase() === 'GET') {
        if (data) {
            url += '?' + data
        }
        xhr.open(method, url, true)
        xhr.send()
    } else if (method.toUpperCase() === 'POST') {
        xhr.open(method, url, true)
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(data)
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback && callback(xhr.responseText)
            }
        }
    }
}



