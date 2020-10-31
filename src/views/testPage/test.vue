<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <el-carousel
        class="class-centre-frame"
        height="650px"
        style="width:100%"
      >
        <el-carousel-item
          v-for="item in courseList"
          :key="item"
        >
          <el-image
            class="image"
            :src="item"
            fit="scale-down"
          />
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '测试页面',
      list: [{ name: '1', isShow: true, pic: require('@/sample/pic1.jpg'), buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }, { name: '2', isShow: false, pic: require('@/sample/pic2.jpg'), buttonLoc: [{ x: 1, y: 1 }, { x: 3, y: 3 }, { x: 2, y: 2 }] }],
      courseList: [require('@/sample/pic1.jpg'), require('@/sample/pic2.jpg'), require('@/sample/pic3.jpg'), require('@/sample/pic4.jpg'), require('@/sample/pic5.jpg'), require('@/sample/pic6.jpg')]
    }
  }
}
</script>

<style  lang='scss'  scoped>
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
    }
  }
}
</style>
