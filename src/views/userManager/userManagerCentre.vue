<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <div class="class-centre-table">
      <el-button type="primary" icon="el-icon-edit" @click="addUser">添加新用户</el-button>
      <el-table style="width: 100%;padding-top: 15px;" :data="list">
        <el-table-column label="UID" min-width="200" align="center" prop="user_id">
          <template slot-scope="scope">{{ scope.row.user_id }}</template>
        </el-table-column>
        <el-table-column label="姓名" min-width="200" align="center" prop="user_name">
          <template slot-scope="scope">{{ scope.row.user_name }}</template>
        </el-table-column>
        <el-table-column label="科室" width="200" align="center" prop="office">
          <template slot-scope="scope">{{ scope.row.office }}</template>
        </el-table-column>
        <el-table-column label="管理" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button plain type="primary" @click="handleModify(scope.$index)">修改</el-button>
            <el-button plain type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { deleteUser, getUserList } from '@/api/user'
export default {
  data() {
    return {
      title: '用户管理',
      list: [{ user_id: '1', user_name: '12313', office: '康复科' }, { user_id: '2', user_name: '1fdsg13', office: '放射科' }]
    }
  },
  created() {
    this.initUserList()
  },
  methods: {
    initUserList() {
      const data = { type: 'getUserList' }
      getUserList(data).then((response) => {
        console.log(response.data)
        // this.list = response.data
      })
    },
    addUser() {
      // TODO--添加用户
      this.$router.push({ name: 'UserModifyPage' })
    },
    handleModify(index) {
      console.log('user_id:' + this.list[index].user_id)
      this.$router.push({ name: 'UserModifyPage', params: { user_id: this.list[index].user_id } })
    },
    handleDelete(index) {
      // 删除User
      const data = { type: 'deleteUser', message_id: this.list[index].user_id }
      deleteUser(data).then((response) => {
        console.log(response)
        if (response.data === true) {
          this.list.splice(index, 1)
          console.log('成功删除')
        } else {
          console.log('删除失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    .class-centre-table {
      margin-left: 60px;
      margin-right: 60px;
    }
  }
}
</style>
