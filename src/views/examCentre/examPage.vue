<!--  -->
<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <p class="stems">{{ currentIndex+1 }}. {{ exam[currentIndex].question_items }}</p>
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="addButton(currentFrame)"
      >
        新建动作
      </el-button>
      <Frame
        v-for="item in list"
        v-show="item.isShow"
        :key="item"
        :button-loc="item.buttonLoc"
        :picpath="item.picpath"
        class="frame"
      />
      <div class="button">
        <div style="margin:30px;">
          <el-button
            type="primary"
            icon="el-icon-microphone"
            circle
          />添加/修改答案
          <el-button
            type="success"
            icon="el-icon-phone-outline"
            circle
          />试听答案
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
          />删除答案
        </div>
        <div class="card-body">
          <li
            v-for="item in list"
            :key="item"
            class="flow_item"
          >
            <div
              class="card flow"
              :style="{backgroundImage:'url('+item.picpath+')'}"
              @click="onSwitch(item)"
            ></div>
            <el-button
              class="card add_sections"
              type="primary"
              style="margin:10px;float:left"
              icon="el-icon-right"
              circle
            />
          </li>
          <el-button
            type="success"
            style="margin:10px;"
            @click="exit"
          >交卷</el-button>
        </div>
        <!-- <el-button-group>
          <el-button
            type="primary"
            @click="handleNext(currentIndex)"
          >
            下一题
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </el-button-group> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import Recorder from 'js-audio-recorder'
import Frame from '@/components/Frame/Frame'
import { getExam, saveAnswer } from '@/api/exam'

export default {
  name: 'ExamPage',
  components: { Frame },
  data() {
    return {
      currentFrame: '', // 当前展示场景Object
      title: 'ExamPage',
      exam_id: '',
      recorder: new Recorder(),
      player: new window.Audio(),
      currentIndex: 0, // 题号
      buttonStatus: [false, true], // 部分按钮显示状态
      rcdStat: 0, // 与aslist里面的rcdStat匹配确认停止的是否是同一个录音文件
      testpic1: require('@/icons/img/testpic1.jpg'),
      exam: [{ question_items: '在如下场景中，若发生了紧急情况，而你是其中一位医生，接下来你该怎么做？请添加动作并点击录音按钮录制回答。' }],
      answerList: [{ question_id: 0, answer: [], status: 0, rcdStat: 0 }],
      list: [{ name: '-1', isShow: true, picpath: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2441934127,243987338&fm=26&gp=0.jpg', buttonLoc: [] }, { name: '0', isShow: false, picpath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603692431749&di=7d09db0071eaa2f6b253315003834043&imgtype=0&src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F80%2F91%2F68%2Fcce47d81_E809168_9705c518.jpg%2521%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fjpg', buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }, { name: '1', isShow: false, picpath: 'https://imglf5.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4UkovWDJMbEh2YU9heTd6aUxRN1lqMWhQUkFISTY3dCt3PT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg', buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }, { name: '2', isShow: false, picpath: 'https://imglf4.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4Y3ZHRDFhZG1zUHpteUlqbkZLNGVUSU1GK2N0eHUreDJRPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg', buttonLoc: [{ x: 1, Y: 1 }, { x: 2, y: 2 }] }, { name: '3', isShow: false, picpath: 'https://imglf4.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4Y0VkbndpM2QxVnFTWGxWcmpFR0tMVU9IdFlnUDRqYnRBPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg', buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }]
    }
  },
  created() {
    this.currentFrame = this.list[0]
    // this.exam_id = this.$route.params.exam_id
    // this.title = this.$route.params.title
    // console.log('获取试题' + this.exam_id + '数据')
    // this.handleGetExam(this.exam_id)
  },
  methods: {
    // 添加录音按钮
    addButton(item) {
      console.log(this.currentFrame)
      item.buttonLoc.push({ x: '', y: '' })
    },
    // 切换场景
    onSwitch(item) {
      console.log(this.currentFrame)
      if (this.currentFrame) {
        this.currentFrame.isShow = false
      }
      item.isShow = true
      this.currentFrame = item
    },
    exit() {
      this.$confirm('你确定要交卷吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '交卷成功!'
        })
        this.$router.push({ name: 'ExamResult' })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消交卷'
        })
      })
    },
    // // 添加--修改状态，list++，然后录音
    // // 修改--直接重新录音
    // handleRecord(index) {
    //   Recorder.getPermission().then(() => {
    //     console.log('给权限了')
    //     // 未录音/停止正在录制的音频【正确状态】
    //     console.log('index:' + index)
    //     console.log('录制前' + this.answerList[index].rcdStat + '' + this.rcdStat)
    //     if (this.rcdStat === this.answerList[index].rcdStat) {
    //       // 未录音状态
    //       if (this.rcdStat === 0) {
    //         if (this.answerList[index].status === 0) {
    //           // 修改状态
    //           this.answerList[index].status = 1
    //           // list添加
    //           this.answerList.push({ question_id: this.currentIndex, answer: [], status: 0, rcdStat: 0 })
    //         }
    //         alert('关闭对话框后开始录制回答。回答结束后，再次点击蓝色按钮结束录制！')
    //         // 修改录音状态标志
    //         this.answerList[index].rcdStat = 1
    //         this.rcdStat = 1
    //         console.log('开始录制')
    //         this.recorder.start()
    //       } else if (this.rcdStat === 1) { // 停止正在录制的音频
    //         // this.recorder.stop()
    //         this.answerList[index].answer = this.recorder.getWAVBlob()
    //         console.log(this.answerList[index].answer)
    //         // 录音状态标志置0
    //         this.answerList[index].rcdStat = 0
    //         this.rcdStat = 0
    //         console.log('录制结束')
    //       }
    //     } else {
    //       alert('当前录制回答非此步骤，请点击原步骤停止录制！')
    //     }
    //   }, (error) => {
    //     console.log(`${error.name} : ${error.message}`)
    //   })
    // },
    // // 播放录音
    // handleListen(index) {
    //   console.log('试听音频')
    //   this.player.src = window.URL.createObjectURL(this.answerList[index].answer)
    //   this.player.play()
    // },
    // // 删除录音
    // handleDelete(index) {
    //   this.answerList.splice(index, 1)
    // },
    // // 下一题
    // handleNext(index) {
    //   if (this.exam[index + 1]) {
    //     // 保存音频数据
    //     this.handleSend(this.answerList)
    //     this.recorder.destroy()
    //     // 清空answerList
    //     this.answerList = []
    //     this.answerList.push({ question_id: index + 1, answer: [], status: 0, rcdStat: 0 })
    //     // 切换题目
    //     this.currentIndex++
    //   } else {
    //     alert('已是最后一题！')
    //   }
    // },
    // // 上一题
    // // handlePrior(index) {
    // //   console.log(this.currentIndex)
    // //   if (index === 0) {
    // //     alert('已是第一题！')
    // //   } else {
    // //     this.handleSend(this.answerList)
    // //     this.currentIndex--
    // //   }
    // // },
    // // 获取试题数据
    handleGetExam(exam_id) {
      const data = { type: 'getExam', exam_id: exam_id }
      getExam(data).then((response) => {
        console.log(response)
        this.exam = response.data
      })
    },
    // TODO--发送数据保存
    handleSend(answerList) {
      const data = { type: 'saveAnswer', answerList: this.answerList }
      saveAnswer(data).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.class-centre {
  &-container {
    margin: 30px;
    .class-centre-title {
      font-size: 25px;
      line-height: 46px;
      color: #409eff;
      border-bottom: solid 2px #409eff;
      margin-bottom: 30px;
    }
    .class-centre-card {
      margin-right: 30px;
      margin-left: 30px;
      list-style: none;
      .button {
        text-align: center;
      }
      .flow_item {
        float: left;
      }
      .flow {
        float: left;
        margin: 10px;
        height: 60px;
        width: 60px;
        background-size: cover;
      }
    }
  }
}
</style>
