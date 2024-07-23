import { defineStore } from 'pinia'
import loginApi from '@/api/user'
import { setToken, getToken } from '@/utils/token'
import { loginDTO } from '@/api/user/loginType'

// 引入登录接口
let userStore = defineStore('systemUser', {
  // 仓库存储数据的地方
  state: () => {
    return {
      token: '',
      userInfo: {},
    }
  },
  // 处理业务逻辑
  actions: {
    // 用户登录 async await
    async login(params: loginDTO, publicKey: string):Promise<string> {
      let res = await loginApi.login(params, publicKey)
      this.token = res.data.token
      setToken(res.data.token)
      return new Promise<string>((resolve) => {
        resolve('success')
      })
    },
    // 获取用户信息
    async userInfo() {
      // 发送请求获取用户信息
      let res: any = await loginApi.getInfo()
      this.userInfo = res.data
      console.log(res)
    },
  },
  getters: {
    getTokenInfo: (state) => {
      if(''===state.token) {
        state.token = getToken() as string
        return state.token
      }
      return state.token
    }
  },
})
export default userStore