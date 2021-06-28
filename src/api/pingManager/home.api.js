import request from '@/utils/request'
import { getHttpAwaryUrl } from './getAwary'

const SEARCH_TABLE_DATA_URL = ['/api/test/searchTopoList', getHttpAwaryUrl() + '/searchTopoList']
const DELETE_TABLE_DATA_URL = ['/api/test/searchTopoList', getHttpAwaryUrl() + '/searchTopoList']

//#region Ping配置管理首页


/**
 * 
 * 初始化页面数据
 */

export function getTableData(searchValue, pageSize, pageNumber) {
    const data = {
        queryParam: searchValue,
        pageSize: pageSize,
        pageNumber: pageNumber
    }
    return request({
        url: SEARCH_TABLE_DATA_URL,
        method: 'get',
        data: data
    })
}


/**
 * 
 * 删除表格行数据
 */

export function deleteTableData(requestId) {
    const data = {
        id: requestId
    }
    return request({
        url: DELETE_TABLE_DATA_URL,
        method: 'get',
        data: data
    })
}

//#endregion
