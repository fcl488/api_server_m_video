import { baseResult } from '@/api/baseType'

export interface videoList {
  videoId: number
  videoName: string
  carver: string
}

export interface videoListVO {
  list: videoList[],
  total: string
}

export interface searchVideoDTO {
  cpId: number | null
  chId: number | null
  thId: number | null
  keyword: string
  categoryId: number | null
  sortWay: number
  page: number
  limit: number
}

export interface videoInfoVO {
  videoId: number
  videoName: string
  category: string[]
}

export interface episodeInfo {
  videoId: number
  videoEpisode: string
  videoName: string
}

export interface videoPlayInfo {
  videoId: number
  carver: string
  url: string
}

export interface getRecommendVideoResData extends baseResult {
  data: videoListVO
}

export interface searchVideoResData extends baseResult {
  data: videoListVO
}

export interface getVideoInfoResData extends baseResult {
  data: videoInfoVO
}

export interface getEpisodeInfoResData extends baseResult {
  data: episodeInfo[]
}

export interface getPlayInfoResData extends baseResult {
  data: videoPlayInfo
}
