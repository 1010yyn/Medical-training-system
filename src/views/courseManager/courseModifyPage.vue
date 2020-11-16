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
          <div>
            <el-transfer
              v-model="value4"
              filterable
              :left-default-checked="[2, 3]"
              :right-default-checked="[1]"
              :titles="['所有人员', '参试人员']"
              :button-texts="['取消', '加入']"
              :format="{ noChecked: '${total}', hasChecked: '${checked}/${total}'}"
              :data="data"
              style="text-align: left; display: inline-block"
              @change="handleChange"
            >
              <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
              <el-button
                slot="left-footer"
                size="small"
                class="transfer-footer"
              >操作</el-button>
              <el-button
                slot="right-footer"
                size="small"
                class="transfer-footer"
              >操作</el-button>
            </el-transfer>
          </div>
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
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `护士 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      title: '修改课程信息',
      id: '',
      exam: {},
      exam_id: '',
      timer: new Date(),
      CurrentTime: '',
      data: generateData(),
      value4: [1]
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
      this.$router.push({ name: 'FlowModifyPage', exam_id: this.exam_id, type: 'new' })
    },
    onCancel() {
      this.$router.push({ name: 'ExamManager' })
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
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
