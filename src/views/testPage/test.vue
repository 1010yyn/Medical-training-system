<template>
  <div class="container">
    <Frame
      v-for="item in list"
      v-show="item.isShow"
      :key="item"
      :buttonLoc="item.buttonLoc"
      class="frame"
    />
  </div>
</template>

<script>
import Frame from './eij'
export default {
  components: { Frame },
  data() {
    return {
      list: [{ name: '1', isShow: true, pic: require('@/sample/pic1.jpg'), buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }, { name: '2', isShow: false, pic: require('@/sample/pic2.jpg'), buttonLoc: [{ x: 1, y: 1 }, { x: 3, y: 3 }, { x: 2, y: 2 }] }]
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
