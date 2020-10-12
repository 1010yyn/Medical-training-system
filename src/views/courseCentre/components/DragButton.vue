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
          if (l < 340) {
            l = 340
          }
          if (t < 170) {
            t = 170
          }
          // 限定右边界的距离(当l=父元素宽-子元素宽时，刚好子元素放在父元素最右边)
          if (l > 1200 - oDiv.clientWidth) {
            l = 1200 - oDiv.clientWidth
          }
          // 限定下边界的距离(当t=父元素高-子元素高时，刚好子元素放在父元素最下边)
          if (t > 650 - oDiv.clientHeight) {
            t = 650 - oDiv.clientHeight
          }

          // 移动当前元素
          oDiv.style.left = l + 'px'
          oDiv.style.top = t + 'px'
        }
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
        // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false
      }
    }
  },
  props: {
    button:
    {
      type: Object, default: () => {
        return {
          X: '',
          Y: ''
        }
      }
    }
  },
  data() {
    return {
      //   text: '双击显示案件详情',
      left: 300,
      top: 165,
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
  top: 170px; 
  left: 340px;
  padding-left: 15px;
  padding-top: 8px;
  cursor: pointer;
  opacity: 0.7;
  z-index: 888;
}
.btn-bg-img {
  width: 50px;
  height: 50px;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602521013896&di=d09bd8f47bf96a02042920ab22bdf8b2&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F17%2F08%2F27%2Fcbd94e5249b61a7676b962680fc6ab6f.jpg");
  background-size: cover;
}
.button-box:hover {
  color: white;
  opacity: 1;
}

.font-box {
  width: 80px;
  color: #3193ef;
  text-align: center;
}
</style>
