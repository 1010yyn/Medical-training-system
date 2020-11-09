<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <div class="class-centre-table">
      <el-table
        style="width: 100%;padding-top: 15px;"
        :data="list"
        @row-click="openMessage"
      >
        <el-table-column
          label="标题"
          min-width="200"
          prop="title"
        >
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column
          label="发布科室"
          width="195"
          align="center"
          prop="office"
        >
          <template slot-scope="scope">{{ scope.row.office }}</template>
        </el-table-column>
        <el-table-column
          label="时间"
          min-width="100"
          align="center"
          prop="time"
        >
          <!-- 作用在于设置显示格式 -->
          <template slot-scope="{row}">
            <el-tag :type="row.time ">{{ row.time }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '通知中心',
      list: [{ message_id: '1111', title: '关于我院2020年国庆节、中秋节放假的通知', office: '科室1', time: '2020/10/01' }]
    }
  },
  methods: {
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
