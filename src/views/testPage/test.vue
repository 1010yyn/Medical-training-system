<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <cd
      v-for="item in list"
      :key="item"
      :text="list.text"
      :user_name="user_name"
    />
  </div>
</template>

<script>
import cd from '../answering/platform/components/replyItem'

export default {
  components: { cd },
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
    .blc {
      height: 100px;
    }
  }
}
</style>
