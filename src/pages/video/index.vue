<template>
  <div>
    <div class="top">
      <div class="header">
        <!-- <van-nav-bar left-arrow @click-left="onClickLeft" /> -->
      </div>
      <div class="video-info">
        <div class="video-area">
          <video ref="videoRef" width="100%" height="100%" controls :poster="playInfo.carver">
            <source :src="playInfo.url"/>
          </video>
          <!-- <videoPlay width="100%" height="300px" title="冰河世纪" :src="options.src" :type="options.type" :autoPlay="false" /> -->
        </div>
        <div class="video-title"><van-text-ellipsis :content="videoInfo.videoName" /></div>
      </div>
    </div>
    <div class="ep-banner">选集</div>
    <div class="episodes">
      <div class="ep-item" v-for="item in episodes" :key="item.videoId">
        <van-button type="primary" @click="changeVideo(item.videoId)">{{ item.videoEpisode }}</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Hls from 'hls.js'
import 'vue3-video-play/dist/style.css' // 引入css
import { videoPlay } from 'vue3-video-play/dist/index.mjs'
import videoApi from '@/api/video'
import { videoInfoVO, episodeInfo, videoPlayInfo } from '@/api/video/videoType'
import { numberIdDTO } from '@/api/commonType'

onMounted(() => {
  initVideoInfo()
  initEpisodeInfo()
  initPlayInfo()
})

let $router = useRouter()
let $route = useRoute()

const videoRef = ref<any>()
const videoId = ref<number>($route.query.id ? Number($route.query.id) : 0)
const videoInfo = ref<videoInfoVO>({
  videoId: 0,
  videoName: '',
  category: [],
})
const episodes = ref<episodeInfo[]>([])
const playInfo = ref<videoPlayInfo>({
  videoId: 0,
  carver: '',
  url: '',
})

const onClickLeft = () => {
  $router.back()
}

const play = (url: string) => {
  console.log(videoRef.value.canPlayType('application/x-mpegURL'))
  if (videoRef.value.canPlayType('application/x-mpegURL')) {
    videoRef.value.src = url
  } else {
    let hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(videoRef.value)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoRef.value.play()
    })
  }
}

const initVideoInfo = async () => {
  let dto: numberIdDTO = {
    id: videoId.value,
  }
  videoInfo.value = (await videoApi.getVideoInfo(dto)).data
}

const initEpisodeInfo = async () => {
  let dto: numberIdDTO = {
    id: videoId.value,
  }
  episodes.value = (await videoApi.getEpisodeInfo(dto)).data
}

const initPlayInfo = async () => {
  let dto: numberIdDTO = {
    id: videoId.value,
  }
  playInfo.value = (await videoApi.getPlayInfo(dto)).data
  play(playInfo.value.url)
}

const changeVideo = async (id: number) => {
  let dto: numberIdDTO = {
    id: id,
  }
  playInfo.value = (await videoApi.getPlayInfo(dto)).data
  play(playInfo.value.url)
}
</script>

<style lang="scss" scoped>
.top {
  .video-info {
    // padding: 4px 0;
    .video-area {
      width: 100%;
      height: 200px;
    }

    .video-title {
      padding: 0 6px;
      font-size: 16px;
      margin-top: 8px;
    }
  }
}

.ep-banner {
  padding-left: 6px;
}

.episodes {
  display: flex;
  overflow-x: scroll;
  padding: 6px;

  &::-webkit-scrollbar {
    display: none;
  }

  .ep-item {
    margin: 0 2px;
  }
}
</style>
