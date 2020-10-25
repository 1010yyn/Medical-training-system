<!--  -->
<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <el-button
        class="exit"
        type="primary"
        @click="exit"
      >返回</el-button>
      <h1 class="message-title">{{ message.title }}</h1>
      <h3 align="center">{{ message.office }}</h3>
      <p class="message-content">{{ message.text }}</p>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      title: '通知',
      message_id: '',
      message: { title: '关于我院2020年国庆节、中秋节放假的通知', office: '一个科室', text: '根据国家规定，结合我院具体情况，现将我院2020年国庆节、中秋节放假安排通知如下：一、2020年国庆节、中秋节，医院决定放假调休8天，具体安排如下：（一）10月1日（国庆节、中秋节，星期四）至10月8日（星期四）放假调休；（二）9月27日（星期日）、10月10日（星期六）上班；（三）10月9日（星期五）起全院正常上班。二、放假期间，急诊24小时接诊，院本部门诊具体安排如下：（一）10月1日（国庆节、中秋节，星期四）至10月2日（星期五）、10月5日（星期一）至10月8日（星期四）、上午实行节假日门诊加强班；（二）10月3日（星期六）上午常规周六门诊，10月4日（星期日）上午实行节假日门诊；（三）9月27日（星期日）补10月5日（星期一）全天门诊，10月10日（星期六）补10月6日（星期二）全天门诊。闽南医院、皮肤病性病分院可结合分院具体情况进行安排。请各科室做好放假期间的排班、安全管理等工作。' }
    }
  },
  created() {
    this.message_id = this.$route.params.message_id
    this.getMessage()
  },
  methods: {
    // TODO--获取通知信息
    getMessage() {
    },
    exit() {
      this.$router.push({ name: 'MessageList' })
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
      .exit {
        margin-left: 10px;
        margin-bottom: 10px;
      }
      .message-title {
        text-align: center;
      }
      .message-content {
        margin: 30px;
      }
      el-button {
        text-align: center;
      }
    }
  }
}
</style>
