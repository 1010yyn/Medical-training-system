<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <el-table>
        <el-table-column
          label="题号"
          min-width="200"
          prop="index"
        ><template slot-scope="scope">{{ scope.index }}</template></el-table-column>
        <el-table-column
          label="回答"
          min-width="200"
          prop="score"
        ><template slot-scope="scope">{{ scope.$index }}</template></el-table-column>
        <el-table-column
          label="分数"
          min-width="200"
          prop="title"
        >5</el-table-column>
      </el-table>

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
