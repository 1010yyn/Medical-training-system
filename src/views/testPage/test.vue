<template>
  <div class="container">
    <li
      v-for="item in list"
      :key="item"
    >
      <div
        v-show="item.isShow"
        class="show"
        :style="{backgroundImage:'url(https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg)'}"
      >
      </div>
    </li>
    <CC
      v-for="item in bt"
      :key="item.t"
    />
  </div>
</template>

<script>
import CC from './eij'
export default {
  components: { CC },
  data() {
    return {
      list: [{ name: '1', isShow: true, pic: require('@/sample/pic1.jpg'), bt: [{ t: 1 }, { t: 2 }] }, { name: '2', isShow: false, pic: require('@/sample/pic2.jpg') }, { name: '3', isShow: false, pic: require('@/sample/pic3.jpg') }, { name: '4', isShow: false, pic: require('@/sample/pic4.jpg') }],
      bt: [{ t: 1 }, { t: 2 }]
    }
  }
}
</script>

<style  lang='scss'  scoped>
.container {
  list-style: none;
  .show {
    float: left;
    height: 700px;
    width: 1000px;
  }
  .frame {
    height: 700px;
    width: 1000px;
  }
}
</style>
