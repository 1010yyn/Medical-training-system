<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <p>核磁共振成像特点是什么？</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionPage',
  data() {
    return {
      title: 'questionPage'
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
    .class-centre-card {
      margin-right: 30px;
      margin-left: 30px;
    }
  }
}
</style>
