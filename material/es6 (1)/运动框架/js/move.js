/* 
        运动函数 
        obj:元素对象 
        attr：元素属性 
        target：目标值
        callback：回调函数
        */
        function move (obj, json, callback) {
            clearInterval(obj.time)
            obj.time = setInterval(function () {
                var onOff = true; // 开关 -- 互斥锁 
                for (var attr in json) {
                    var target = json[attr]
                    var speed = 0
                    if (attr === 'opacity') {
                        speed = Math.round(getStyle(obj, attr) * 100); // 30
                    } else {
                        speed = parseInt(getStyle(obj, attr))
                    }

                    var dir = (target - speed) / 10; 
                    dir = dir > 0 ? Math.ceil(dir):Math.floor(dir)
                    speed += dir
                    if ((speed > target && dir > 0) || (speed < target && dir < 0)) {
                        speed = target
                    }
                  
                    if (attr === 'opacity') {
                        obj.style.opacity = speed / 100;
                        obj.style.filter = 'alpha(opacity=' + speed + ')'
                    } else {
                        obj.style[attr] = speed + 'px'
                    }
                    if (speed !== target) {
                        onOff = false
                    }
                }
                if (onOff) {
                    clearInterval(obj.time)
                    callback && callback()
                }
            }, 30)
        }

        // 获取非行间样式
        function getStyle (obj, attr) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(obj)[attr]
            } else {
                return obj.currentStyle[attr]
            }
        }
