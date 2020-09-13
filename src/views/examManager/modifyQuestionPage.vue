<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <el-form ref="exam" class="class-centre-form" :model="exam" label-width="120px">
        <el-form-item>
          <h3 class="stems">第{{ currentIndex+1 }}题</h3>
        </el-form-item>
        <el-form-item label="题 干">
          <el-input v-model="exam[currentIndex].question_items" type="textarea" />
        </el-form-item>
        <el-form-item label="场景图">
          <el-image :src="testpic1" />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-arrow-left"
              @click="handlePrior(currentIndex)"
            >上一题</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button type="primary" @click="onCancel">取消</el-button>
            <el-button type="primary" @click="handleNext(currentIndex)">
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
import { getExam } from '@/api/exam'

export default {
  data() {
    return {
      title: '修改试题',
      id: '',
      exam: [],
      currentIndex: 0, // 题号
      testpic1: require('@/icons/img/testpic1.jpg')
    }
  },
  created() {
    this.id = this.$route.params.exam_id
    console.log('exam_id:' + this.id)
    this.GetQuestion(this.id)
  },
  methods: {
    GetQuestion(exam_id) {
      const data = { type: 'getExam', exam_id: exam_id }
      getExam(data).then((response) => {
        console.log(response)
        this.exam = response.data
      })
    },
    // 下一题
    handleNext(index) {
      if (this.exam[index + 1]) {
        // 切换题目
        this.currentIndex++
      } else {
        alert('已是最后一题！')
      }
    },
    // 上一题
    handlePrior(index) {
      console.log(this.currentIndex)
      if (index === 0) {
        alert('已是第一题！')
      } else {
        this.currentIndex--
      }
    },
    onSubmit() {
      // TODO-- 保存新题目数据，一条一条保存
      for (let i = 0; this.exam[i]; i++) {
        this.onSend()
      }
    },
    onCancel() {
      this.$router.push({ name: 'ExamManager' })
    },
    // TODO--保存单条题目
    onSend() {

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
