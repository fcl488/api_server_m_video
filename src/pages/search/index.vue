<template>
  <div>
    <div class="header">
      <van-nav-bar title="搜索" />
      <div class="search-box">
        <van-search v-model="keyword" @search="onSearch" placeholder="请输入搜索关键词" />
      </div>
    </div>


    <div class="content">
      <div class="video-list" justify="space-between">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="100">
            <van-row :gutter="[20, 20]">
              <van-col span="12" v-for="item in videos" :key="item.videoId">
                <videoCard :url="item.carver" :title="item.videoName" @click="toVideoPage(item.videoId)"></videoCard>
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
import { useRoute, useRouter } from 'vue-router'
import videoCard from '@/components/videoCard/index.vue'
import videoApi from '@/api/video'
import { videoList, searchVideoDTO } from '@/api/video/videoType'
import navStore from '@/store/modules/navbarModules'
let navStores = navStore()

onMounted(() => {
  queryVideo()
  navStores.changeActive(1)
})

let $route = useRoute()
let $router = useRouter()

const keyword = ref<string>($route.query.keyword ? $route.query.keyword as string : '')
const categoryId = ref<number|null>($route.query.categoryId ?  Number($route.query.categoryId) : null)
const refreshing = ref<boolean>(false)
const finished = ref<boolean>(false)
const loading = ref<boolean>(false)
const sortWay = ref<number>(-1)
const page = ref<number>(1)
const limit = ref<number>(20)
const videos = ref<videoList[]>([])
const total = ref<number>(0)

const onRefresh = () => {
  baseInfoReset()
  queryVideo()
  refreshing.value = false
}
const onLoad = () => {
  if(total.value <= videos.value.length) {
    finished.value = true
    return
  }
  page.value = page.value + 1
  queryVideo()
}

const onSearch = () => {
  baseInfoReset()
  queryVideo()
}

const queryVideo = async () => {
  if((keyword.value === null || keyword.value === '') && categoryId.value === null) {
    return
  }
  const dto: searchVideoDTO = {
    cpId: null,
    chId: null,
    thId: null,
    keyword: keyword.value,
    categoryId: categoryId.value,
    sortWay: sortWay.value,
    page: page.value,
    limit: limit.value
  }
  let res = await videoApi.searchVideo(dto)
  videos.value.push(...res.data.list)
  total.value = Number(res.data.total)
}

const baseInfoReset = () => {
  page.value = 1
  limit.value = 20
  videos.value = []
  total.value = 0
  sortWay.value = -1
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
  margin: 6px 0 50px 0;

  h1 {
    font-size: .4rem;
  }

  .video-list {
    margin-top: .2rem;
    padding: 0 .1rem;
  }
}
</style>
