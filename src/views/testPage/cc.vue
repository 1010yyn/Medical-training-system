// 悬浮按钮组件
<template>
  <div style="position:relative;">
    <div
      v-drag
      class="button-box"
      draggable="false"
    >
      <div
        class="btn-bg-img"
        @dblclick="openBox"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    drag(el) {
      const oDiv = el // 当前元素
      // let self = this // 上下文
      // 禁止选择网页上的文字
      document.onselectstart = function () {
        return false
      }
      oDiv.onmousedown = function (e) {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - oDiv.offsetLeft
        const disY = e.clientY - oDiv.offsetTop
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          var l = e.clientX - disX
          var t = e.clientY - disY

          // 限定左边界和上边界
          if (l < 0) {
            l = 0
          }
          if (t < 0) {
            t = 0
          }
          // 限定右边界的距离(当l=父元素宽-子元素宽时，刚好子元素放在父元素最右边)
          if (l > 1200 - oDiv.clientWidth) {
            l = 1200 - oDiv.clientWidth
          }
          // 限定下边界的距离(当t=父元素高-子元素高时，刚好子元素放在父元素最下边)
          if (t > 740 - oDiv.clientHeight) {
            t = 740 - oDiv.clientHeight
          }

          // 移动当前元素
          oDiv.style.left = l + 'px'
          oDiv.style.top = t + 'px'
        }
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
          // 返回当前坐标并保存
        }
        // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false
      }
    }
  },
  props: {
    border:
    {
      type: Object, default: () => {
        return {
          // button位置
          x: '',
          y: ''
          // 父组件位置和宽高
        }
      }
    }
  },
  data() {
    return {
      //   text: '双击显示案件详情',
      isOpen: false,
      isMove: false
    }
  },
  methods: {
    openBox() {
      console.log('双击')
    },
    // mousedowm(e) { // 鼠标按下时的鼠标所在的X，Y坐标
    //   this.mouseDownX = e.pageX
    //   this.mouseDownY = e.pageY
    //   // 初始位置的X，Y 坐标
    //   // this.initX = obj.offsetLeft;
    //   // this.initY = obj.offsetTop;
    //   console.log('e', e)
    //   // 表示鼠标已按下
    //   this.flag = true
    // },
    // mousemove(e) {
    //   if (this.flag) {
    //     console.log('e :', e)
    //   }
    // }
  }
}
</script>

<style scoped>
.button-box {
  width: 80px;
  border-radius: 50%;
  position: fixed;
  bottom: 80px;
  left: 80px;
  padding-left: 15px;
  padding-top: 8px;
  cursor: pointer;
  opacity: 0.7;
  z-index: 888;
}
.btn-bg-img {
  width: 80px;
  height: 80px;
  background-image: url("https://avatar-static.segmentfault.com/133/658/1336582159-5960866d44bce_big64");
  background-size: cover;
}
.button-box:hover {
  color: white;
  opacity: 1;
}
</style>
