<template>
  <div>
    <div class="container">
      <div class="img-box">
        <img :src="url" alt="" srcset="" />
      </div>
      <div class="video-area">
        <van-text-ellipsis rows="2" :content="title" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
interface Props {
  url: string
  title: string
}
const props = defineProps<Props>()
</script>

<script lang="ts">
export default {
  name: 'videoCard',
}
</script>

<style lang="scss" scoped>
.container {
  .img-box {
    height: 100px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .video-area {
    font-size: 16px;
    margin-top: 0.1rem;
    padding-left: 0.1rem;
  }
}
</style>
