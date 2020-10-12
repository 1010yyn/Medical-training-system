<template>
  <div class="container">
    <CC
      class="frame"
      v-for="item in list"
      :key="item"
      :buttonLoc="item.buttonLoc"
      v-show="item.isShow"
    />
  </div>
</template>

<script>
import CC from './eij'
export default {
  components: { CC },
  data() {
    return {
      // TODO--修改图片路径
      list: [{ name: '1', isShow: true, pic: require('@/sample/pic1.jpg'), buttonLoc: [{ X: 1, Y: 1 }, { X: 2, Y: 2 }] }, { name: '2', isShow: false, pic: require('@/sample/pic2.jpg'), buttonLoc: [{ X: 1, Y: 1 }, { X: 3, Y: 3 }, { X: 2, Y: 2 }] }],
    }
  }
}
</script>

<style  lang='scss'  scoped>
.container {
  .frame {
    height: 700px;
    width: 1000px;
  }
}
</style>
