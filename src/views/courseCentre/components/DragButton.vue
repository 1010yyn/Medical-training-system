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
      <el-button
        v-show="isRecorded"
        type="success"
        icon="el-icon-caret-right"
        circle
        @click="handleListen"
      />
      <div id="exampage">
        <div class="result">{{ result }}</div>
        <div class="voice-input-button-wrapper">
          <voice-input-button
            v-model="result"
            app-id="5f5c2cdf"
            api-key="6c355f2fdfbe2d89dd7eb4374b6cd853"
            api-secret="98941cfd0f3f0f6170f25b19fae26f0d"
            interactive-mode="touch"
            color="#fff"
            tip-position="top"
            @record="showResult"
            @record-start="recordStart"
            @record-stop="recordStop"
            @record-blank="recordNoResult"
            @record-failed="recordFailed"
            @record-ready="recordReady"
            @record-complete="recordComplete"
          >
            <template slot="no-speak">
              没听清您说的什么
            </template>
          </voice-input-button>
        </div>
      </div>
      <el-button
        type="danger"
        circle
        icon="el-icon-delete"
        @click="onDelete"
      />
    </div>
  </div>
</template>
<script>
import voiceInputButton from 'voice-input-button2'
import Recorder from 'js-audio-recorder'
export default {
  components: { voiceInputButton },
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
    },
    rcd: []
  },
  data() {
    return {
      result: '',
      left: 300,
      top: 165,
      isRecorded: false,
      recorder: new Recorder(),
      player: new window.Audio(),
      rcdStat: 0, // 录音状态
      rcd: [],
      te: [{ a: 1, b: 2 }, { a: 4, b: 9 }]
    }
  },
  destroyed() {
    this.recorder.destroy()
  },
  methods: {
    openBox() {
      console.log('双击')
      this.isRecorded = true
      this.handleRecord()
    },
    recordReady() {
      console.info('按钮就绪!')
    },
    recordStart() {
      console.info('录音开始')
    },
    showResult(text) {
      console.info('收到识别结果：', text)
    },
    recordStop() {
      console.info('录音结束')
    },
    recordNoResult() {
      console.info('没有录到什么，请重试')
    },
    recordComplete(text) {
      console.info('识别完成! 最终结果：', text)
    },
    recordFailed(error) {
      console.info('识别失败，错误栈：', error)
    },
    handleRecord() {
      Recorder.getPermission().then(() => {
        console.log('给权限了')
        // 未录音/停止正在录制的音频【正确状态】
        // 未录音状态
        if (this.rcdStat === 0) {
          alert('关闭对话框后开始录制回答。回答结束后，再次点击蓝色按钮结束录制！')
          console.log('开始录制')
          // 修改录音状态标志
          this.rcdStat = 1
          this.recorder.start()
        } else if (this.rcdStat === 1) {
          this.rcd = this.recorder.getWAVBlob()
          this.rcdStat = 0
          console.log('录制结束')
        }
      }, (error) => {
        console.log(`${error.name} : ${error.message}`)
      })
    },
    // 播放录音
    handleListen() {
      console.log('试听音频')
      this.player.src = window.URL.createObjectURL(this.rcd)
      this.player.play()
    },
    onDelete() {
      this.$emit('Delete', 'delete')
      console.log(this.$parent)
      // this.$parent.delete(this)
      var index = this.list.findIndex(function (item) {
        return item.id == id;
      })
    }
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=886037056,2311123780&fm=26&gp=0.jpg");
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

#exampage {
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 400px;
}

.voice-input-button-wrapper {
  width: 42px;
  height: 42px;
  background-color: mediumpurple;
  border-radius: 50%;
}

.result {
  width: 100%;
  padding: 25px;
  border: #e2e2e2 1px solid;
  border-radius: 5px;
  line-height: 2;
  font-size: 16px;
  color: #727272;
  min-height: 24px;
  margin-bottom: 25px;
}
</style>
