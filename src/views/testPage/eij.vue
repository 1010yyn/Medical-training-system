图片+button组件
<template>
  <div class="container">
    <div
      class="pic"
      :style="{backgroundImage:'url('+picpath+')'}"
      ref="pics"
    ></div>
    <CC
      v-for="item in buttonLoc"
      :key="item"
      :x="item.x"
      :y="item.y"
    />
  </div>
</template>

<script>
import CC from './cc'
export default {
  components: { CC },
  props: {
    // 图片路径
    picpath: {
      type: String,
      default: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg'
    },
    // 记录按钮位置
    buttonLoc: {
      type: Object,
      default: () => { [] }
    }
  },
  created() {
    console.log('组件')
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
