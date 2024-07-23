import request from '@/utils/request'
import { loginResData, publicKeyResData, userInfoResData, loginDTO } from "./loginType"
import rsaUtil from '@/utils/rsaUtil'

enum API {
  LOGIN = '/user/login',
  GET_PUBLIC_KEY = '/user/get/publickey',
  GET_INFO = '/user/info'
}

export default {
  login(params: loginDTO, publicKey: string) {
    let o: loginDTO = {
      account: params.account,
      password: rsaUtil.encode(params.password, publicKey)
    }
    return request.post<any, loginResData>(API.LOGIN, o)
  },
  getPublicKey() {
    return request.get<any, publicKeyResData>(API.GET_PUBLIC_KEY)
  },
  getInfo() {
    return request.get<any, userInfoResData>(API.GET_INFO)
  }
}