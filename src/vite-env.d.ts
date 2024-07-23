/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{},{},any>
  export default component
}

declare module 'pxtovw'
declare module 'vue3-video-play'
declare module 'vue-video-play'
declare module 'vue3-video-play/dist/index.mjs'
declare module "encryptlong"