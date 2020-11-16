<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <div class="class-centre-table">
      <el-button
        type="primary"
        @click="exit"
      >返回</el-button>
      <el-button
        plain
        type="success"
        style="float:right"
        @click="handleDownload"
      >导出excel表格</el-button>
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
            <el-button
              plain
              type="primary"
              @click="handleModify(scope.row)"
            >修改</el-button>
            <el-button
              plain
              type="danger"
              @click="handleDelete(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3>总人数：{{ exam_result.length }}</h3>
      <h3> 平均分：{{ average }}</h3>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      title: '考试结果管理',
      flag: true,
      exam_result: [{ user_id: '1', user_name: '小王', exam_score: 88 }, { user_id: '2', user_name: '小杜', exam_score: 10 }],
      average: 0,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      list: [{ user_id: '1', user_name: '小王', exam_score: 88 }, { user_id: '2', user_name: '小杜', exam_score: 10 }]
    }
  },
  created() {
    var sum = 0
    var i = 0
    while (this.exam_result[i]) {
      sum = sum + this.exam_result[i].exam_score
      console.log(this.exam_result[i].exam_score)
      i++
    }
    console.log(sum)
    this.average = sum / Number(this.exam_result.length)
    console.log(this.average)
  },
  methods: {
    handleModify(row) {
      this.$prompt('请输入修改后的成绩', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        row.exam_score = value
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleDelete(index) {
      this.exam_result.splice(index, index + 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['工号', '姓名', '考试成绩']
        const filterVal = ['user_id', 'user_name', 'exam_score']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    exit() {
      this.$router.push({ name: 'ExamManager' })
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
