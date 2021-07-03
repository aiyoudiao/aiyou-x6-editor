export function merge(target, source) {
    //类型不一致返回target
    if (typeof target !== typeof source || (!target instanceof Array && !source instanceof Array)) {
        return target;
    }
    if (target instanceof Array) {
        target = target.concat(source);
    } else if (typeof target === 'object') {
        for (let key in target) {
            if (source[key]) {
                target[key] = merge(target[key], source[key]);
            }
        }
        for (let key in source) {
            if (!target[key]) {
                target[key] = source[key];
            }
        }
    } else {
        //除了object array类型其他都返回target
    }
    return target;
}

// 这一版合并，数组的话会直接替换
export function merge2(target, source) {
    //类型不一致返回target
    if (typeof target !== typeof source || (!target instanceof Array && !source instanceof Array)) {
        return target;
    }
    if (target instanceof Array) {
        target = source;
    } else if (typeof target === 'object') {
        for (let key in target) {
            if (source[key]) {
                target[key] = merge2(target[key], source[key]);
            }
        }
        // 追加
        for (let key in source) {
            if (!target[key]) {
                target[key] = source[key];
            }
        }
    } else {
        //除了object array类型其他都返回target
    }
    return target;
}

/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
export function clone(parent) {
    // 维护两个储存循环引用的数组
    const parents = [];
    const children = [];
    const isType = (obj, type) => {
        if (typeof obj !== 'object') return false;
        // 判断数据类型的经典方法：
        const typeString = Object.prototype.toString.call(obj);
        let flag;
        switch (type) {
            case 'Array':
                flag = typeString === '[object Array]';
                break;
            case 'Date':
                flag = typeString === '[object Date]';
                break;
            case 'RegExp':
                flag = typeString === '[object RegExp]';
                break;
            case 'Function':
                flag = typeString === '[object Function]';
                break;
            default:
                flag = false;
        }
        return flag;
    };

    const getRegExp = re => {
        var flags = '';
        if (re.global) flags += 'g';
        if (re.ignoreCase) flags += 'i';
        if (re.multiline) flags += 'm';
        return flags;
    };


    const _clone = parent => {
        if (parent === null) return null;
        if (typeof parent !== 'object') return parent;

        let child, proto;

        if (isType(parent, 'Array')) {
            // 对数组做特殊处理
            child = [];
        } else if (isType(parent, 'RegExp')) {
            // 对正则对象做特殊处理
            child = new RegExp(parent.source, getRegExp(parent));
            if (parent.lastIndex) child.lastIndex = parent.lastIndex;
        }
        else if (isType(parent, 'Date')) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime());
        }
        else if (isType(parent, 'Function')) {
            child = parent;
        }
        else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
        }

        // 处理循环引用
        const index = parents.indexOf(parent);

        if (index != -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index];
        }
        parents.push(parent);
        children.push(child);

        for (let i in parent) {
            // 递归
            child[i] = _clone(parent[i]);
        }

        return child;
    };
    return _clone(parent);
};

/**
 * 将blob转换成一个字符串
 * @param { Blob } blob 后端传递的blob对象
 * @return 返回的是一个Promise对象
 */
export function blobToText(blob) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            var content = reader.result;
            resolve(content);
        };
        reader.readAsText(blob);
    });
}

/**
 * 将一个文本按照相应的规则进行分割并重组
 * @param { 内容文本 } text
 * @return
 * 返回的是一个有规律的重组对象，
 * 通过front.num 可以获取当前是第几部分，
 * front.length 可以获取总长度，
 * 通过content 可以获取可用内容。
 */
export function sliceText6Bit(text) {
    const front = text.slice(0, 6);
    const content = text.slice(6);

    const num = front.slice(0, 3);
    const length = front.slice(3);

    return {
        front: {
            num,
            length,
        },
        content,
    };
}

/**
* 将一个blob按照相应的规则进行分割并重组
* @param { blob } text
* @return
* 返回的是一个有规律的重组对象，
* 通过front.num 可以获取当前是第几部分，
* front.length 可以获取总长度，
* 通过contentBlob 可以获取可用内容。
*/
export function sliceBlob6Bit(blob) {
    const front = blob.slice(0, 6);
    const contentBlob = blob.slice(6);

    const num = front.slice(0, 3);
    const length = front.slice(3);

    return {
        front: {
            num,
            length,
        },
        contentBlob,
    };
}


// 模拟数据进度的效果
export function mockProgress(invokeFn, iNumber) {
    const taskDetail = {
        complete: false,
    }
    setTimeout(() => {
        invokeFn()
        taskDetail.complete = true
    }, ~~(Math.random() * 1500) + iNumber * 500);

    return taskDetail
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    // const now = Date.now()

    // const diff = (now - d) / 1000

    // if (diff < 30) {
    //   return '刚刚'
    // } else if (diff < 3600) {
    //   // less 1 hour
    //   return Math.ceil(diff / 60) + '分钟前'
    // } else if (diff < 3600 * 24) {
    //   return Math.ceil(diff / 3600) + '小时前'
    // } else if (diff < 3600 * 24 * 2) {
    //   return '1天前'
    // }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * 将低的毫秒数转化为 日 时分秒
 * @param {*} cutTime 
 * @param {*} cFormat 
 * @returns 
 */
export function parseCutTime(cutTime, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{d} {h}:{i}:{s}'

    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
        time = parseInt(time)
    }

    const formatObj = {
        d: () => getResult(1000 * 60 * 60 * 24),
        h: () => getResult(1000 * 60 * 60),
        i: () => getResult(1000 * 60),
        s: () => getResult(1000),
    }

    function getResult(num) {
        if (cutTime < num) {
            return 0
        }

        const result = ~~(cutTime / num)
        cutTime = cutTime - result * num

        return result
    }

    const time_str = format.replace(/{(d|h|i|s|a)+}/g, (result, key) => {
        const valueFunc = formatObj[key]
        let value = valueFunc()
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export { badResponseHandler } from './response'