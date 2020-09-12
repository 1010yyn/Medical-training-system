<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <el-form ref="message" class="class-centre-form" :model="message" label-width="120px">
        <el-form-item label="标 题">
          <el-input v-model="message.message_title" />
        </el-form-item>
        <el-form-item label="科 室">
          <el-input v-model="message.office" />
        </el-form-item>
        <el-form-item label="正 文">
          <el-input v-model="message.text" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getMessage, modifyMessage } from '@/api/message'
export default {
  data() {
    return {
      title: '修改通知',
      message_id: '',
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.message_id = this.$route.params.message_id
    console.log('message:' + this.message_id)
    this.getMessage(this.message_id)
  },
  methods: {
    getMessage(message_id) {
      const data = { type: 'getMessage', message_id: message_id }
      getMessage(data).then((response) => {
        console.log(response)
        this.message = response.data
      })
    },
    // 修改message
    onSubmit() {
      const data = { type: 'modifyMessage', message_id: this.message.message_id, message_title: this.message.message_title, office: this.message.office, text: this.message.text }
      modifyMessage(data).then((response) => {
        console.log(response.data)
        if (response.data === true) {
          console.log('修改成功')
          this.$router.push({ name: 'MessageManager' })
        } else {
          console.log('修改失败')
        }
      }
      )
    },
    // 取消修改
    onCancel() {
      this.$router.push({ name: 'MessageManager' })
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
      margin: 30px;
    }
    .class-centre-card {
      margin-right: 30px;
      margin-left: 30px;
      min-height: 600px;
      .class-centre-form {
        margin-right: 60px;
      }
    }
  }
}
</style>
