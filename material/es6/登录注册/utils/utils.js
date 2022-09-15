var utils = function () {
    //属于标准浏览器  不成立就是在IE6~8
    var flag = "getComputedStyle" in window;

    //类数组转为数组
    function likeArray(likeData) {
        if (flag) {
            return Array.prototype.slice.call(likeData, 0);
        } else {
            var arr = [];
            for (var i = 0; i < likeData.length; i++) {
                arr[i] = likeData[i];
            }
            return arr;
        }
    }

    /* 
        获取经过浏览器渲染的样式 
        @param eleObj:元素对象
        @param attr:样式属性
        @returns 样式值
    */
    function getStyle(eleObj, attr) {
        return eleObj.currentStyle ? eleObj.currentStyle[attr] : window.getComputedStyle(eleObj)[attr];
    }

    /*
        简单的匀速运动
        @param eleObj:元素对象
        @param attr:样式属性
        @param step:步长
        @param target:目标值
        @param interval:时间间隔
    */
    function move(eleObj, attr, step, target, interval) {
        window.clearInterval(eleObj.timer);
        step = parseFloat(getStyle(eleObj, attr)) < target ? step : -step;
        eleObj.timer = window.setInterval(function () {
            var speed = parseFloat(getStyle(eleObj, attr)) + step;
            if ((speed >= target && step > 0) || (speed <= target && step < 0)) {
                speed = target;
                window.clearInterval(eleObj.timer);
            }
            eleObj.style[attr] = speed + 'px';

        }, interval);
    }

    /*
        生成n-m之间的随机数
        @param n:起始值 number
        @param attr:终值 number
        @returns 随机数值 number
    */

    function getRandomNumber(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            throw new TypeError("请输入数值");
        }
        if (n > m) {
            var temp;
            temp = n;
            n = m;
            m = temp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }


    /*
        补零
        @param time:时间
        @returns 补零后的字符串
    */
    function zero(time) {
        return time < 10 ? "0" + time : time;
    }


    /* 
        冒泡排序:对数组进行排序 
        @param arr:数组
        @param bool:布尔值   true:升序  false:降序
        @returns arr
    */
    function bubbleSort(arr, bool) {
        var flag = false;
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - 1 - i; j++) {
                if (bool ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]) {
                    var temp;
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    flag = true;
                }
            }
            if (flag) {
                flag = false;
            } else {
                break;
            }
        }
        return arr;
    }


    /* 
        快速排序:对数组进行排序 
        @param arr:数组
        @returns arr
    */
    function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        var point = Math.floor(arr.length / 2);
        var pointValue = arr.splice(point, 1)[0];
        var left = [],
            right = [];
        for (var i = 0; i < arr.length; i++) {
            var cur = arr[i];
            cur < pointValue ? left.push(cur) : right.push(cur);
        }
        return quickSort(left).concat(pointValue, quickSort(right));
    }



    /* 
        数组去重:对数组进行去重 
        @param arr:数组
        @returns arr
    */
    function arrNoRepeat(arr) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var cur = arr[i];
            if (obj[cur] === cur) {
                arr[i] = arr[arr.length - 1];
                arr.length--;
                i--;
                continue;
            }
            obj[cur] = cur;
        }
        return arr;
    }


    /*
    获取所有直接子元素（不传递标签名 就获取所有的直接子元素  传递进行过滤）
    @param eleObj:元素对象
    @param tagName:标签名 
    @returns array  
    */
    function getChildren(eleObj, tagName) {
        var nodes = eleObj.childNodes,
            arr = []; //存储获取到元素
        for (var i = 0; i < nodes.length; i++) {
            var curNode = nodes[i];
            // 不传递标签名 就获取所有的直接子元素  传递进行过滤
            if (typeof tagName === "undefined") {
                if (curNode.nodeType === 1) {
                    arr.push(curNode);
                }
            } else {

                if ((curNode.nodeType === 1) && (curNode.nodeName.toUpperCase() === tagName.toUpperCase())) {
                    arr.push(curNode);
                }
            }
        }
        return arr;
    }


    /*
    获取第一个子元素
    @param eleObj:元素对象 
    @returns eleObj 
    */

    function firtChild(eleObj) {
        return getChildren(eleObj).length != 0 ? getChildren(eleObj)[0] : null;
    }


    /*
    获取第一个子元素
    @param eleObj:元素对象 
    @returns eleObj 
    */

    function lastChild(eleObj) {
        return getChildren(eleObj).length != 0 ? getChildren(eleObj)[getChildren(eleObj).length - 1] : null;
    }


    /*
    获取上一个哥哥元素
    @param eleObj:元素对象 
    @returns eleObj 
    */
    function prev(eleObj) {
        var pre = eleObj.previousSibling;
        while (pre && pre.nodeType != 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }


    /*
    获取下一个弟弟元素
    @param eleObj:元素对象 
    @returns eleObj 
    */
    function next(eleObj) {
        var nex = eleObj.nextSibling;
        while (nex && nex.nodeType != 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }


    /*
    获取所有的哥哥元素
    @param eleObj:元素对象 
    @returns array 
    */
    function prveAll(eleObj) {
        var pre = prev(eleObj); //获取当前对象的哥哥元素 
        var arr = []; //返回数组的集合
        while (pre) {
            arr.unshift(pre);
            pre = prev(pre);
        }

        return arr;
    }


    /*
    获取所有的弟弟元素
    @param eleObj:元素对象 
    @returns array 
    */
    function nextAll(eleObj) {
        var nex = next(eleObj); //获取当前对象的哥哥元素 
        var arr = []; //返回数组的集合
        while (nex) {
            arr.push(nex);
            nex = next(nex);
        }
        return arr;
    }


    /*
    获取上一个哥哥元素及下一个弟弟元素
    @param eleObj:元素对象 
    @returns array 
    */
    function siblings(eleObj) {
        var arr = [];
        prev(eleObj) ? arr.push(prev(eleObj)) : null;
        next(eleObj) ? arr.push(next(eleObj)) : null;

        return arr;
    }


    /*
    所有所有的相邻元素
    @param eleObj:元素对象 
    @returns array 
    */
    function siblingsAll(eleObj) {
        return prveAll(eleObj).concat(nextAll(eleObj));
    }


    //DOM2事件绑定兼容处理
    function eventBind(eleObj, eventType, callBack, boolean) {
        if (eleObj.addEventListener) {
            eleObj.addEventListener(eventType, callBack, boolean);
        } else {
            eleObj.attachEvent('on' + eventType, callBack);
        }
    }


    // DOM2事件取消事件绑定兼容处理
    function unEventBind(eleObj, eventType, callBack, boolean) {
        if (eleObj.removeEventListener) {
            eleObj.removeEventListener(eventType, callBack, boolean);
        } else {
            eleObj.detachEvent('on' + eventType, callBack);
        }
    }


    // 设置或获取浏览器的盒子模型  不传值就是获取  传递了就设置
    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        } else {
            document.documentElement[attr] = document.body[attr] = value;
        }
    }


    /*
    减速运动
    @param eleObj:元素对象 
    @param styleObj:样式对象集合  属性：目标值
    @param interval:事件间隔
    @param callBack:回调函数
    */
    function bufferMove(eleObj, styleObj, interval, callBack) {
        window.clearInterval(eleObj.timer);
        eleObj.timer = window.setInterval(function () {
            var flag = true; //默认值是true
            for (var styleAttr in styleObj) {
                var cur = styleAttr === "opacity" ? parseFloat(getStyle(eleObj, styleAttr) * 100) :
                    parseFloat(
                        getStyle(
                            eleObj, styleAttr));
                var speed = (styleObj[styleAttr] - cur) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if (cur !== styleObj[styleAttr]) {
                    flag = false;
                }

                if (styleAttr === "opacity") {
                    eleObj.style.opacity = (cur + speed) / 100;
                    eleObj.style.filter = "alpha(opacity=" + (cur + speed) + ")";
                } else {
                    eleObj.style[styleAttr] = (cur + speed) + 'px';
                }
            }

            if (flag) {
                window.clearInterval(eleObj.timer);
                console.log('哈喽');
                callBack && callBack.call(eleObj);
            }
        }, interval);
    }
    /*
    className:类名
    context:上下文 也就是通过父级获取
    */
    function getClass(className, context) {
        context = context || document;
        var arr = [];
        if (flag) {
            var likeArrays = context.getElementsByClassName(className);
            return likeArray(likeArrays);
        } else {
            // 获取所有的HTML元素
            var curEles = document.getElementsByTagName("*");
            for (var i = 0; i < curEles.length; i++) {
                if (curEles[i].className === className) {
                    arr[arr.length] = curEles[i];
                }
            }
            return arr;
        }
    }
    //->hasClass:验证当前元素中是否包含className这个样式类名
    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }
    //->addClass:给元素增加样式类名
    function addClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (!this.hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
    }
    //->removeClass:给元素移除样式类名
    function removeClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }
    return {
        likeArray: likeArray,
        getStyle: getStyle,
        move: move,
        getRandomNumber: getRandomNumber,
        zero: zero,
        bufferMove,
        bufferMove,
        getClass: getClass,
        win: win,
        arrNoRepeat: arrNoRepeat,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        quickSort: quickSort,
        bubbleSort: bubbleSort,
        eventBind: eventBind,
        unEventBind: unEventBind,
        siblingsAll: siblingsAll,
        siblings: siblings,
        nextAll: nextAll,
        next: next,
        prev: prev,
        prveAll: prveAll,
        lastChild: lastChild,
        firtChild: firtChild
    }
}();