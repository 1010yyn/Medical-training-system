<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <el-form ref="user" class="class-centre-form" :model="user" label-width="120px">
        <el-form-item label="头像">
          <el-image :src="head1" style="width:200px; height:200px;" />
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
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getInfo, modifyInfo } from '@/api/user'

export default {
  data() {
    return {
      title: '修改用户信息',
      head1: require('@/icons/img/head1.jpg'),
      id: '',
      user: ''
    }
  },
  created() {
    this.id = this.$route.params.user_id
    console.log('uesr_id:' + this.id)
    this.getUser(this.id)
  },
  methods: {
    // 获取用户信息
    getUser(id) {
      const data = { type: 'getInfo', user_id: this.id }
      getInfo(data).then((response) => {
        this.user = response.data[0]
      })
    },
    // 修改用户信息
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

<style lang='scss' scoped>
.class-centre {
  &-container {
    margin: 30px;
    .class-centre-title {
      font-size: 25px;
      line-height: 46px;
      color: #409eff;
      border-bottom: solid 2px #409eff;
      margin: 30px;
    }
    .class-centre-card {
      margin-right: 30px;
      margin-left: 30px;
      min-height: 600px;
      .class-centre-form {
        margin-right: 60px;
      }
    }
  }
}
</style>
