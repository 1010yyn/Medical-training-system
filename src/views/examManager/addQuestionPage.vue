<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <el-form
        ref="exam"
        class="class-centre-form"
        :model="exam"
        label-width="120px"
      >
        <el-form-item>
          <h3 class="stems">第{{ currentIndex+1 }}题</h3>
        </el-form-item>
        <el-form-item label="题 干">
          <el-input
            v-model="exam[currentIndex].question_items"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="场景图">
          <el-input
            v-model="exam[currentIndex].picpath"
            placeholder="请输入场景图地址链接"
          />
        </el-form-item>
        <el-form-item>
          <el-image :src="exam[currentIndex].picpath" />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-arrow-left"
              @click="handlePrior(currentIndex)"
            >上一题</el-button>
            <el-button
              type="primary"
              @click="onSubmit"
            >提交</el-button>
            <el-button
              type="primary"
              @click="onDelete(currentIndex)"
            >删除</el-button>
            <el-button
              type="primary"
              @click="onCancel"
            >取消</el-button>
            <el-button
              type="primary"
              @click="handleNext(currentIndex)"
            >
              下一题
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '添加试题',
      id: '', // 考试编号
      exam: [{ question_items: '', picpath: '' }],
      exam_info: '',
      currentIndex: 0 // 当前编辑题号
    }
  },
  methods: {
    handleNext(index) {
      this.exam.push({ question_items: '', picpath: '' })
      this.currentIndex++
    },
    handlePrior(index) {
      this.currentIndex--
    },
    onSubmit() {
      // TODO--上传数据
      this.$router.push({ name: 'ExamManager' })
    },
    onDelete(index) {
      this.exam.splice(index, index)
      this.currentIndex = index - 1
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
