<!--  -->
<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <!-- <pdf src="D:\Users\yangy\Documents\GitHub\Medical-training-system\src\sample.pdf" /> -->
      <el-carousel
        class="class-centre-frame"
        height="580px"
      >
        <el-carousel-item
          v-for="item in courseList"
          :key="item.pic"
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
import 'video.js/dist/video-js.css'
// import pdf from 'vue-pdf'

export default {
  name: 'CoursePage',
  // components: { pdf },
  data() {
    return {
      title: 'CoursePage',
      course_id: '',
      courseList: [require('@/sample/pic1.jpg'), require('@/sample/pic2.jpg'), require('@/sample/pic3.jpg'), require('@/sample/pic4.jpg'), require('@/sample/pic5.jpg'), require('@/sample/pic6.jpg'), require('@/sample/pic7.jpg'), require('@/sample/pic8.jpg'), require('@/sample/pic9.jpg'), require('@/sample/pic10.jpg'), require('@/sample/pic11.jpg')]
    }
  },
  created() {
    this.course_id = this.$route.params
  },
  methods: {

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
      margin: 30px;
      min-height: 580px;
      .image {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
