图片+button组件
<template>
  <div class="container">
    <div
      class="pic"
      :style="{backgroundImage:'url('+picpath+')'}"
    >
      <DragButton
        v-for="item in buttonLoc"
        :key="item"
        :x="item.x"
        :y="item.y"
      />
    </div>
  </div>
</template>

<script>
import DragButton from './DragButton'
export default {
  components: { DragButton },
  props: {
    // 图片路径
    picpath: {
      type: String,
      default: 'https://imglf5.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4UkovWDJMbEh2YU9heTd6aUxRN1lqMWhQUkFISTY3dCt3PT0.jpg?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg'
    },
    // 记录按钮位置
    buttonLoc: {
      type: Object,
      default: () => { [] }
    }
  },
  methods: {
    delete(item) {
      console.log('test parent')
      this.buttonLoc.remove(item)
    }
  }
}
</script>

<style  lang='scss'  scoped>
.container {
  margin-left: 250px;
  height: 400px;
  width: 800px;
  list-style: none;
  .pic {
    height: 400px;
    width: 800px;
    background-size: cover;
  }
}
</style>
