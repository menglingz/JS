// 防止全局污染 将方法挂载到window上 

~(function () {

    // 处理IE 兼容问题 
    // 创建ajax的实列  

    function createXHR () {
        if (window.ActiveXObject) { // IE
            return new ActiveXObject('Microsoft.XMLHttp')
        } else { // 标准
            return new XMLHttpRequest;
        }
    }

    // ajax方法 
    // options{....}
    function ajax (options) {
        // 用户不传递是默认参数，传递了就是传递进来的参数 
        // 默认对象 
        var _default = { // 值都是默认的
            method: 'get', // 请求方式
            url: null, // 请求url的地址 
            async: true, // 同步还是异步 
            dataType: null, // 返回的数据格式 
            getHead: null, // 获取响应的头信息 
            success: null, // 获取响应的主题内容，成功的额回调函数
            setRequest: null, // 设置请求头 
            data: null // 数据 
        }
        // 将默认对象的值进行覆盖 
        // 循环遍历用户传递进来的对象 给默认对象重新赋值 
        for (var key in options) {
            // 只循环遍历私有的属性 
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key]
            }
        }

        // 创建ajax实列 
        var xhr = createXHR();
        if (_default.method.toLowerCase() === 'get') {
            _default.url += _default.url.indexOf("?") > 0 ? "&_=" + Math.random() : "?_=" + Math.random();
        }
        // 配置请求参数 
        xhr.open(_default.method, _default.url, _default.async);

        // 监听请求状态 
        xhr.onreadystatechange = function () {
            // 请求成功  -- xhr.status
            if (/^2\d{2}$/.test(xhr.status)) {
                if (xhr.readyState === 2) {
                    // 函数存在，将这个函数执行，并且要把函数中的this变为第一个 
                    _default.getHead && _default.getHead.call(xhr);
                }
                // ajax处理进度为4 获取响应的主题内容
                if (xhr.readyState === 4) {
                    var jsonData = xhr.responseText;
                    if (_default.dataType && _default.dataType.toUpperCase() === 'JSON') {
                        // 转换json格式 
                        jsonData = "JSON" in window ? JSON.parse(jsonData) : eval('(' + jsonData + ')')
                    }
                    _default.success && _default.success.call(xhr, jsonData)
                }
            }
        }
        // 设置请求头信息 
        _default.setRequest ? xhr.setRequestHeader('Content-Type', _default.setRequest) : null;
        // 发送请求 
        xhr.send(_default.data)
    }
    // 将ajax方法赋值给widnow自定义的ajax属性 
    window.ajax = ajax

})(window)