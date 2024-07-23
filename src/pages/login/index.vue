<template>
  <div>
    <div class="top">
      <div class="title">LOGIN</div>
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="account" name="account" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div class="footer">
      <div class="tip">
        <span>没有账号</span>
        &nbsp;
        <a href="#/regist">去注册</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import userApi from '@/api/user'
import { loginDTO } from '@/api/user/loginType'
import userStore from '@/store/modules/userModules'
import { useRouter } from 'vue-router'

onMounted(() => {
  getPublicKey()
})

let $router = useRouter()
let systemUserStore = userStore()
const account = ref<string>('')
const password = ref<string>('')
const publicKey = ref<string>('')
const onSubmit = (values: loginDTO) => {
  systemUserStore.login(values, publicKey.value).then(() => {
    $router.push('home')
  })
};

const getPublicKey = () => {
  userApi.getPublicKey().then(res => {
    publicKey.value = res.data
  })
}
</script>

<style lang="scss" scoped>
.top {
  margin-top: 100px;
  .title {
    display: flex;
    justify-content: center;
    font-size: 1rem;
  }
}
.footer {
  display: flex;
  justify-content: center;
}
</style>
