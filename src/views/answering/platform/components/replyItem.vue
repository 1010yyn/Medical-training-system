<template>
  <div class="item">
    <el-card
      class="left-info"
      shadow="always"
    >
      <el-avatar
        class="avatar"
        shape="square"
        :size="large"
        :src="squareUrl"
      />
      <el-form
        class="info-form"
        label-position="right"
        label-width="50px"
      >
        <el-form-item label="姓名">
          <span>{{ user.user_name }}</span>
        </el-form-item>
        <el-form-item label="职位">
          <span>{{ user.post }}</span>
        </el-form-item>
        <el-form-item label="科室">
          <span>{{ user.office }}</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <span>{{ user.email }}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card
      class="right-text"
      shadow="always"
    >
      <p style="float:right;color:lightgray;">发表时间：{{ time }}</p>
      <br>
      <br>
      <p class="message-content">{{ text }}</p>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '一个提问'
    },
    time: {
      type: String,
      default: '2020/10/04'
    },
    user: {
      type: Object,
      default: () => {
        return {
          user_name: '张三',
          post: '护士',
          email: '12345@126.com',
          office: '口腔科'
        }
      }
    }
  },
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      sizeList: ['large', 'medium', 'small']
    }
  }
}
</script>

<style lang='scss' scoped>
.item {
  height: 333px;
  margin: 10px;
  .left-info {
    float: left;
    text-align: center;
    width: 19.9%;
    height: inherit;
  }
  .right-text {
    float: right;
    width: 80%;
    height: inherit;
  }
}
</style>
