import { Notification, Message, MessageBox } from 'element-ui'


/**
 * 非200的响应处理，统一输出错误信息
 * @param {*} code 
 * @param {*} msg 
 * @returns 返回true 表示处理了错误信息
 */
export function badResponseHandler(code, msg) {
    if (![200, '200'].includes(code)) {
        // Message({
        //     message: msg || (code + '!'),
        //     type: 'error',
        //     duration: 5 * 1000
        // })

        Notification({
            title: '错误',
            message: msg || (code + '!'),
            type: 'error',
            duration: 5 * 1000
        })

        return true
    }

    return false
}