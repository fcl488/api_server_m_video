<template>
  <div>
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="block">
          <van-loading type="spinner" color="#1989fa" vertical>
            加载中...
          </van-loading>
        </div>
      </div>
    </van-overlay>
    <div class="header">
      <van-nav-bar title="分类" />
    </div>
    <div class="content" v-if="!show">
      <van-row gutter="2" v-if="categoryList.length > 0">
        <van-col span="6">
          <div class="left-bar">
            <van-sidebar v-model="active">
              <van-sidebar-item
                v-for="item in categoryList"
                :key="item.videoCategoryId"
                :title="item.videoCategoryName"
              />
            </van-sidebar>
          </div>
        </van-col>
        <van-col span="18">
          <div class="right-area">
            <div
              v-if="
                categoryList[active].children.length > 0 &&
                categoryList[active].children[0].children.length > 0
              "
            >
              <div v-for="item in categoryList[active].children">
                <van-divider>{{ item.videoCategoryName }}</van-divider>
                <van-grid :border="false" :column-num="2" :gutter="10">
                  <van-grid-item
                    icon="photo-o"
                    v-for="el in item.children"
                    :text="el.videoCategoryName"
                    @click="toSearch(el.videoCategoryId)"
                  />
                </van-grid>
              </div>
            </div>
            <div v-else>
              <van-grid :border="false" :column-num="2" :gutter="10">
                <van-grid-item
                  icon="photo-o"
                  v-for="item in categoryList[active].children"
                  :text="item.videoCategoryName"
                  @click="toSearch(item.videoCategoryId)"
                />
              </van-grid>
            </div>
          </div>
        </van-col>
      </van-row>
      <van-empty v-else description="暂无分类信息" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import categoryApi from '@/api/category'
import { categoryVO } from '@/api/category/categoryTypes'
import navStore from '@/store/modules/navbarModules'
import { useRouter } from 'vue-router'

let navStores = navStore()
onMounted(() => {
  queryAllCategory()
  navStores.changeActive(2)
})

let $router = useRouter()
const show = ref<boolean>(true)
const active = ref<number>(0)
const categoryList = ref<categoryVO[]>([])

const queryAllCategory = () => {
  categoryApi.queryAll().then((res) => {
    console.log(res)
    categoryList.value = res.data
    show.value = false
  })
}

const toSearch = (id: number) => {
  $router.push({
    path: 'search',
    query: {
      categoryId: id,
    },
  })
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #191919;
}
.header {
  position: sticky;
  top: 0;
  z-index: 99;
}

.content {
  margin-bottom: 1rem;

  .left-bar {
    position: sticky;
    top: 48px;
    // z-index: 99;
    height: calc(100vh - 100px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .right-area {
    margin: 10px 0;
  }
}
</style>
