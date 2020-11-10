<template>
  <el-form
    ref="user"
    class="class-centre-form"
    :model="user"
    label-width="120px"
  >
    <el-form-item label="头 像">
      <el-image
        :src="head1"
        style="width:200px; height:200px;"
      />
    </el-form-item>
    <el-form-item label="UID">
      <el-input v-model="user.user_id" />
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="user.login_id" />
    </el-form-item>
    <el-form-item label="密 码">
      <el-input v-model="user.password" />
    </el-form-item>
    <el-form-item label="姓 名">
      <el-input v-model="user.user_name" />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="user.user_phone" />
    </el-form-item>
    <el-form-item label="性 别">
      <el-input v-model="user.sex" />
    </el-form-item>
    <el-form-item label="职 称">
      <el-input v-model="user.post" />
    </el-form-item>
    <el-form-item label="科 室">
      <el-input v-model="user.office" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit"
      >提交</el-button>
      <el-button @click="onCancel">取 消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { modifyInfo } from '@/api/user'
export default {
  data() {
    return {
      user: {}
    }
  },
  methods: {
    // TODO:修改代码内容，改为添加用户
    onSubmit() {
      const data = {
        type: 'updateInfo',
        user_id: this.user.user_id,
        login_id: this.user.login_id,
        password: this.user.password,
        user_name: this.user.user_name,
        user_phone: this.user.user_phone,
        sex: this.user.sex,
        post: this.user.post,
        office: this.user.office,
        head: ''
      }
      modifyInfo(data).then((response) => {
        console.log(response)
        if (response.data === true) {
          console.log('修改成功')
          this.$router.push({ name: 'UserManager' })
        } else {
          console.log('修改失败')
        }
      })
    },
    onCancel() {
      this.$router.push({ name: 'UserManager' })
    }
  }
}
</script>

<style>
</style>
