<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <div class="class-centre-table">
      <el-table
        style="width: 100%;padding-top: 15px;"
        :data="exam_result"
      >
        <el-table-column
          label="工号"
          min-width="50"
          prop="user_id"
          align="center"
        />
        <el-table-column
          label="姓名"
          min-width="50"
          prop="user_name"
          align="center"
        />
        <el-table-column
          label="考试成绩"
          min-width="50"
          prop="exam_score"
          align="center"
        />
        <el-table-column
          label="管理"
          min-width="50"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <el-button
              plain
              type="primary"
              @click="handleModify(scope.$index)"
            >查看</el-button> -->
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
export default {
  data() {
    return {
      title: '考试结果管理',
      exam_result: [{ user_id: '1', user_name: '小王', exam_score: '88' }, { user_id: '2', user_name: '小杜', exam_score: '10' }]
    }
  },
  methods: {

    handleModify(index) {
      this.exam_result[index].exam_score = '100'
    },
    handleDelete(index) {
      this.exam_result.splice(index, index + 1)
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
