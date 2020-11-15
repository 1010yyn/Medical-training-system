<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <el-form
        ref="message"
        class="class-centre-form"
        :model="message"
        label-width="120px"
      >
        <el-form-item label="标 题">
          <el-input v-model="exam.exam_title" />
        </el-form-item>
        <el-form-item label="科 室">
          <el-input v-model="exam.office" />
        </el-form-item>
        <el-form-item label="起始时间">
          <el-input v-model="exam.start" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="exam.end" />
        </el-form-item>
        <el-form-item>
          <el-tag>点击确定后进入课程编辑</el-tag>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >确定</el-button>
          <el-button @click="onCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '添加课程信息',
      id: '',
      exam: {},
      exam_id: '',
      timer: new Date(),
      CurrentTime: ''
    }
  },
  methods: {
    onSubmit() {
      // 生成course_id
      this.CurrentTime = this.timer.getFullYear() + '' + (this.timer.getMonth() + 1) + this.timer.getDate() + '01'
      console.log(this.CurrentTime)
      this.exam.exam_id = this.CurrentTime
      console.log(this.exam.exam_id)
      this.exam_id = this.CurrentTime
      this.$router.push({ name: 'FlowAddPage', exam_id: this.exam_id, type: 'new' })
    },
    onCancel() {
      this.$router.push({ name: 'ExamManager' })
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
    }
  }
}
</style>
