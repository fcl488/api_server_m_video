<template>
  <div>
    <div class="header">
      <van-nav-bar title="首页" />
      <div class="search-box">
        <van-search v-model="keyword" @search="onSearch" placeholder="请输入搜索关键词" />
      </div>
    </div>

    <div class="content">
      <h1>经典推荐</h1>
      <div class="video-list" justify="space-between">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            offset="100"
          >
            <van-row :gutter="[20, 20]">
              <van-col span="12" v-for="item in videos" :key="item.videoId">
                <videoCard
                  :url="item.carver"
                  :title="item.videoName"
                  @click="toVideoPage(item.videoId)"
                ></videoCard>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
        <!-- <van-empty v-if="true" image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
          description="无法找到对应视频" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import videoCard from '@/components/videoCard/index.vue'
import videoApi from '@/api/video'
import { videoList } from '@/api/video/videoType'
import navStore from '@/store/modules/navbarModules'
let navStores = navStore()

onMounted(() => {
  getRecommendVideo()
  navStores.changeActive(0)
})

let $router = useRouter()
const keyword = ref<string>('')
const refreshing = ref<boolean>(false)
const finished = ref<boolean>(true)
const loading = ref<boolean>(false)
const videos = ref<videoList[]>()
const onRefresh = () => {
  getRecommendVideo()
  refreshing.value = false
}
const onLoad = () => {
  getRecommendVideo()
  loading.value = false
  finished.value = true
}

const getRecommendVideo = async () => {
  let res = await videoApi.getRecommendVideo()
  videos.value = res.data.list
}

const onSearch = () => {
  $router.push({
    path: 'search',
    query: {
      keyword: keyword.value
    }
  })
}

const toVideoPage = (id: number) => {
  console.log(id)
  $router.push({
    path: 'video',
    query: {
      id: id
    }
  })
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 99;
}

.content {
  margin-bottom: 50px;

  h1 {
    font-size: 0.4rem;
    margin-left: 0.1rem;
  }

  .video-list {
    margin-top: 0.2rem;
    padding: 0 0.1rem;
  }
}
</style>
