<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <div class="class-centre-table">
      <el-table style="width: 100%;padding-top: 15px;" :data="list">
        <el-table-column label="标题" min-width="200" prop="title">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="发布科室" min-width="195" align="center" prop="office">
          <template slot-scope="scope">{{ scope.row.office }}</template>
        </el-table-column>
        <el-table-column label="时间" min-width="100" align="center" prop="time">
          <!-- 作用在于设置显示格式 -->
          <template slot-scope="{ row }">{{ row.time }}</template>
        </el-table-column>
        <el-table-column label="管理" min-width="180" align="center" prop="manage">
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

export default {
  data() {
    return {
      title: '通知管理',
      list: [
        {
          message_id: '11111',
          title: '12313',
          office: 'wewqewq',
          time: '2332r'
        },
        {
          message_id: '12354',
          title: '123dwrewr3',
          office: 'weerqqewqedfvfhdewq',
          time: '213432332r'
        }
      ]
    }
  },
  methods: {
    handleModify(index) {
      // 跳转至编辑message页面
      console.log(index)
      this.$router.push({ name: 'MessageModifyPage', params: { message_id: this.list[index].message_id } })
    },
    handleDelete(index) {
      // TODO--删除
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
