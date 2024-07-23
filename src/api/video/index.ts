import request from '@/utils/request'
import {
  getRecommendVideoResData,
  searchVideoDTO,
  searchVideoResData,
  getVideoInfoResData,
  getEpisodeInfoResData,
  getPlayInfoResData,
} from './videoType'
import { numberIdDTO } from '@/api/commonType'

enum API {
  RECOMMEND = '/web/cc/video/recommend',
  SEARCH = '/web/cc/video/search',
  INFO = '/web/cc/video/info',
  EPISODE_INFO = '/web/cc/video/episodeinfo',
  PLAY_INFO = '/web/cc/video/playinfo',
}

export default {
  getRecommendVideo() {
    return request.get<any, getRecommendVideoResData>(API.RECOMMEND)
  },
  searchVideo(params: searchVideoDTO) {
    return request.post<any, searchVideoResData>(API.SEARCH, params)
  },
  getVideoInfo(params: numberIdDTO) {
    return request.post<any, getVideoInfoResData>(API.INFO, params)
  },
  getEpisodeInfo(params: numberIdDTO) {
    return request.post<any, getEpisodeInfoResData>(API.EPISODE_INFO, params)
  },
  getPlayInfo(params: numberIdDTO) {
    return request.post<any, getPlayInfoResData>(API.PLAY_INFO, params)
  },
}
