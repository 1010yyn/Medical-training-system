<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <div class="class-centre-table">
      <el-button type="primary" icon="el-icon-edit" @click="addExam">添加新考试</el-button>
      <el-table style="width: 100%;padding-top: 15px;" :data="list">
        <el-table-column label="考试名称" min-width="100" prop="exam_title">
          <template slot-scope="scope">{{ scope.row.exam_title }}</template>
        </el-table-column>
        <el-table-column label="发布科室" min-width="100" align="center" prop="office">
          <template slot-scope="scope">{{ scope.row.office }}</template>
        </el-table-column>
        <el-table-column label="起始时间" min-width="100" align="center" prop="start">
          <template slot-scope="scope">{{ scope.row.start }}</template>
        </el-table-column>
        <el-table-column label="结束时间" min-width="100" align="center" prop="end">
          <template slot-scope="scope">{{ scope.row.end }}</template>
        </el-table-column>
        <el-table-column label="管理" min-width="100" align="center" prop="manage">
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
      title: '考试管理',
      list: [{ exam_id: '2020082601', exam_title: '12313', office: 'wewqewq', start: '2332r', end: '456456' }, { exam_id: '2020082802', exam_title: '2fdgfds2', office: 'weerqqewqedfvfhdewq', start: '2332r', end: '456456' }]
    }
  },
  methods: {
    addExam() {
      this.$router.push({ name: 'ExamAddPage' })
    },
    handleModify(index) {
      console.log('exam_id:' + this.list[index].exam_id)
      this.$router.push({ name: 'ExamModifyPage', params: { exam_id: this.list[index].exam_id } })
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
