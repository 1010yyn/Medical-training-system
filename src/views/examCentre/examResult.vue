<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <div class="text">
        <h1 class="finish_text">恭喜你完成本场考试!</h1>
        <h2 class="exam_title">考试一</h2>
        <h3 class="exam_office">第一科室</h3>
        <el-table
          class="table"
          :data="result"
        >
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            min-width="180"
          />
          <el-table-column
            prop="id"
            label="工号"
            align="center"
            min-width="180"
          />
        </el-table>
        <el-table
          class="table"
          :data="result"
        >
          <el-table-column
            prop="office"
            label="科室"
            align="center"
            min-width="180"
          />
          <el-table-column
            prop="score"
            label="成绩"
            align="center"
            min-width="180"
          />
        </el-table>
        <br>
        <br>
        <el-button
          type="success"
          @click="question"
        >提问</el-button>
        <el-button
          type="primary"
          @click="exit"
        >退出</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '考试结束',
      result: [{ name: '张三', id: '1030415208', office: '口腔科', score: 80 }]
    }
  },
  methods: {
    question() {
      this.$router.push({ name: 'Quiz' })
    },
    exit() {
      this.$router.push({ name: 'ExamList' })
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
      margin-bottom: 30px;
    }
    .class-centre-card {
      margin-right: 30px;
      margin-left: 30px;
      min-height: 600px;
      list-style: none;

      .text {
        text-align: center;
        margin: 40px;

        .finish_text {
          color: #409eff;
        }
        .exam_title {
          color: #304156;
          margin: 40px;
        }
        .exam_office {
          color: darkgray;
        }
        .table {
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
