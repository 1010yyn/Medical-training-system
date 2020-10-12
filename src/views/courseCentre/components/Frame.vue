图片+button组件
<template>
  <div
    class="container"
    v-show="isShow"
  >
    <div
      class="pic"
      :style="{backgroundImage:'url('+picpath+')'}"
    ></div>
    <DragButton
      v-for="item in buttonLoc"
      :key="item"
      :X="item.X"
      :Y="item.Y"
    />
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
      default: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg'
    },
    // 记录按钮位置
    buttonLoc: {
      type: Object,
      default: () => { [] },
    }
  },
  created() {
    console.log(frame.buttonLoc)
  }
}
</script>

<style  lang='scss'  scoped>
.container {
  height: 700px;
  width: 1000px;
  list-style: none;
  .pic {
    float: left;
    height: 700px;
    width: 1000px;
  }
}
</style>
