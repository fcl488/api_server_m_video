<template>
  <div>
    <div class="container">
      <!-- <div class="header">
        <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
      </div> -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <van-tabbar v-model="navStores.active" active-color="#ee0a24">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="list-switching">分类</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import navStore from '@/store/modules/navbarModules'
let navStores = navStore()
const onClickLeft = () => {

}
</script>

<style lang="scss" scoped>
// .container {
//   .content {
//     padding: 0 .1rem .1rem .1rem;
//     background-color: var(--van-background-2);
//   }
// }
</style>
