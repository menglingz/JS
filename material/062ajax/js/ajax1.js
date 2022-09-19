
/* 
1、简单封装
2、拼接参数 -- 传入的数据data  
3、判断请求参数是get还是post
4、传入的是普通数据类型还是json对象格式的数据类型
5、状态码200的判断
5、如果传入参数，就用传入的参数，如果不传入参数，就使用默认的
*/
function ajax (options) {
    // 把所有的options使用defaults替换掉
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function () { },
        error: function () { }
    }

    Object.assign(defaults, options)

    var xhr = new XMLHttpRequest();

    var params = '';
    for (var attr in defaults.data) {
        // 将参数转换字符串进行保存 
        params += attr + '=' + defaults.data[attr] + '&'
    }
    // 把最后一个&去掉 
    params = params.substr(0, params.length - 1);
    // 是get方式
    if (defaults.type === 'get') {
        defaults.url = defaults.url + '?' + params
    }
    /* 
    将{
        name:'zhangsan',
        age:20
    },
    转换成： name=zhangsan&age=20
    */

    xhr.open(defaults.type, defaults.url)

    // 如果是post方式
    if (defaults.type === 'post') {
        var contentType = defaults.header['content-type']

        // 设置请求参数的格式类型
        xhr.setRequestHeader('content-type', contentType)

        // 如果类型是json 
        if (contentType == 'application/json') {
            // 向服务器传递json数据格式的参数 
            xhr.send(JSON.stringify(defaults.data))
        } else {
            // 向服务器传递普通类型的请求参数 
            xhr.send(params)
        }
    } else {
        xhr.send()
    }

    xhr.onload = function () {
        if (xhr.status === 200) {
            // 请求成功 调用处理成功的函数 
            defaults.success(xhr.responseText)
        } else {
            // 请求失败 调用处理失败的函数 
            defaults.error(xhr.responseText, xhr)
        }
    }
}

/* 
1、请求参数传入的位置问题  
get：放在请求地址后面，并且使用 ？ 链接 
post:放在send()方法中，当做参数传递  

2、请求参数的格式问题  
application/x-www-form-urlencoded:参数格式：参数名='参数值'&参数名="参数值" 

application/json：参数格式：参数名：'参数值'，参数名："参数值"

注意：传递对象数据类型的对于函数的调用者(开发人员)更加友好 
     在函数内部对象数据转换为字符串数据类型更加方便
*/






