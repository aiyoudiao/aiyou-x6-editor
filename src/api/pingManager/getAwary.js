// export const getHttpAwaryUrl = () => 'http://10.50.22.234:8080'
export const getHttpAwaryUrl = (type = 'lpf') => {
    if (type === 'lpf') {
        return ''
    } else if (type === 'dll') {
        return 'http://10.50.22.234:9406'
    }
}
export const getWebsocketAwaryUrl = () => 'ws://10.50.22.234:8080' 
// export const getWebsocketAwaryUrl = () => 'ws://10.50.22.142:9402' 