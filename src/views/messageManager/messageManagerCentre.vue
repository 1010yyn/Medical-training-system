<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <div class="class-centre-table">
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="addMessage"
      >添加新通知</el-button>
      <el-table
        style="width: 100%;padding-top: 15px;"
        :data="list"
      >
        <el-table-column
          label="标题"
          min-width="200"
          prop="title"
        >
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column
          label="发布科室"
          min-width="195"
          align="center"
          prop="office"
        >
          <template slot-scope="scope">{{ scope.row.office }}</template>
        </el-table-column>
        <el-table-column
          label="时间"
          min-width="100"
          align="center"
          prop="time"
        >
          <!-- 作用在于设置显示格式 -->
          <template slot-scope="{ row }">{{ row.time }}</template>
        </el-table-column>
        <el-table-column
          label="管理"
          min-width="180"
          align="center"
          prop="manage"
        >
          <template slot-scope="scope">
            <el-button
              plain
              type="primary"
              @click="handleModify(scope.$index)"
            >修改</el-button>
            <el-button
              plain
              type="danger"
              @click="handleDelete(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { deleteMessage } from '@/api/message'

export default {
  data() {
    return {
      title: '通知管理',
      list: [
        {
          message_id: '11111',
          title: '关于我院2020年国庆节、中秋节放假的通知',
          office: '科室1',
          time: '2020/10/01'
        }
      ]
    }
  },
  methods: {
    addMessage() {
      // TODO--添加通知
      this.$router.push({ name: 'MesasgeAddPage' })
    },
    handleModify(index) {
      // 跳转至编辑message页面
      console.log(index)
      this.$router.push({ name: 'MessageModifyPage', params: { message_id: this.list[index].message_id } })
    },
    handleDelete(index) {
      // 删除message
      const data = { type: 'deleteMessage', message_id: this.list[index].message_id }
      deleteMessage(data).then((response) => {
        console.log(response)
        if (response.data === true) {
          this.list.splice(index, 1)// 从列表中删去
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
