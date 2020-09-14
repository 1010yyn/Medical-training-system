<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <div class="class-centre-table">
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="addExam"
      >添加新课程</el-button>
      <el-table
        style="width: 100%;padding-top: 15px;"
        :data="list"
      >
        <el-table-column
          label="标题"
          min-width="200"
          prop="course_title"
        >
          <template slot-scope="scope">{{ scope.row.course_title }}</template>
        </el-table-column>
        <el-table-column
          label="发布科室"
          min-width="100"
          align="center"
          prop="office"
        >
          <template slot-scope="scope">{{ scope.row.office }}</template>
        </el-table-column>
        <el-table-column
          label="起始时间"
          min-width="100"
          align="center"
          prop="start"
        >
          <template slot-scope="scope">{{ scope.row.start }}</template>
        </el-table-column>
        <el-table-column
          label="结束时间"
          min-width="100"
          align="center"
          prop="end"
        >
          <template slot-scope="scope">{{ scope.row.end }}</template>
        </el-table-column>
        <el-table-column
          label="管理"
          min-width="100"
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
import { getCourseList } from '@/api/course'
export default {
  data() {
    return {
      title: '课程管理',
      list: [{ course_id: '1111', course_title: '12313', office: 'wewqewq', start: '2332r' }, { course_title: '123dwrewr3', office: 'weerqqewqedfvfhdewq', start: '213432332r' }]
    }
  },
  created() {
    // 初始化课程列表
    this.initCourseList()
  },
  methods: {
    initCourseList() {
      const data = { type: 'getCourseList' }
      getCourseList(data).then((response) => {
        console.log(response.data)
        this.list = response.data
      })
    },
    openMessage(row, event, column) {
      this.$router.push({ name: 'MessagePage', params: { message_id: row.message_id } })
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
