import request from '@/utils/request'
import { queryCategoryResData } from './categoryTypes'

enum API {
  QUERY_ALL = '/web/cc/video/category/all/v2'
}

export default {
  queryAll() {
    return request.get<any, queryCategoryResData>(API.QUERY_ALL)
  }
}