<!--  -->
<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <p class="stems">{{ currentIndex+1 }}. {{ exam[currentIndex].question_items }}</p>
      <div class="img-container">
        <img
          class="image"
          :src="testpic1"
        >
      </div>
      <el-table
        style="width: 80%;margin:0 auto;margin-bottom:30px;"
        :data="answerList"
      >
        <el-table-column
          label="步骤"
          align="center"
          min-width="120"
          prop="index"
        >
          <template slot-scope="scope">步骤{{ scope.$index +1 }}</template>
        </el-table-column>
        <el-table-column
          label="答案"
          min-width="300"
          align="center"
          prop="answer"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleRecord(scope.$index)"
            />
            <el-button
              v-show="buttonStatus[scope.row.status]"
              type="success"
              icon="el-icon-phone-outline"
              circle
              @click="handleListen(scope.$index)"
            />
            <el-button
              v-show="buttonStatus[scope.row.status]"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index)"
            />
            <div id="exampage">
              <div class="result">{{result}}</div>
              <div class="voice-input-button-wrapper">
                <voice-input-button
                  appId="5f5c2cdf"
                  apiKey="6c355f2fdfbe2d89dd7eb4374b6cd853"
                  apiSecret="98941cfd0f3f0f6170f25b19fae26f0d"
                  v-model="result"
                  @record="showResult"
                  @record-start="recordStart"
                  @record-stop="recordStop"
                  @record-blank="recordNoResult"
                  @record-failed="recordFailed"
                  @record-ready="recordReady"
                  @record-complete="recordComplete"
                  interactiveMode="touch"
                  color="#fff"
                  tipPosition="top"
                >
                  <template slot="no-speak">
                    没听清您说的什么
                  </template>
                </voice-input-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="button">
        <div style="margin:30px;">
          <el-button
            type="primary"
            icon="el-icon-edit"
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
        <el-button-group>
          <!-- <el-button
            type="primary"
            icon="el-icon-arrow-left"
            @click="handlePrior(currentIndex)"
          >上一题</el-button> -->
          <el-button
            type="primary"
            @click="handleNext(currentIndex)"
          >
            下一题
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </el-button-group>
      </div>
    </el-card>
  </div>
</template>

<script>
import Recorder from 'js-audio-recorder'
import { getExam, saveAnswer } from '@/api/exam'
import voiceInputButton from 'voice-input-button2'

export default {
  name: 'ExamPage',
  components: { voiceInputButton },
  data() {
    return {
      result: '',
      title: 'ExamPage',
      exam_id: '',
      recorder: new Recorder(),
      player: new window.Audio(),
      currentIndex: 0, // 题号
      buttonStatus: [false, true], // 部分按钮显示状态
      rcdStat: 0, // 与aslist里面的rcdStat匹配确认停止的是否是同一个录音文件
      testpic1: require('@/icons/img/testpic1.jpg'),
      exam: [],
      answerList: [{ question_id: 0, answer: [], status: 0, rcdStat: 0 }]
    }
  },
  created() {
    this.exam_id = this.$route.params.exam_id
    this.title = this.$route.params.title
    console.log('获取试题' + this.exam_id + '数据')
    this.handleGetExam(this.exam_id)
  },
  methods: {
    // 添加--修改状态，list++，然后录音
    // 修改--直接重新录音
    handleRecord(index) {
      Recorder.getPermission().then(() => {
        console.log('给权限了')
        // 未录音/停止正在录制的音频【正确状态】
        console.log('index:' + index)
        console.log('录制前' + this.answerList[index].rcdStat + '' + this.rcdStat)
        if (this.rcdStat === this.answerList[index].rcdStat) {
          // 未录音状态
          if (this.rcdStat === 0) {
            if (this.answerList[index].status === 0) {
              // 修改状态
              this.answerList[index].status = 1
              // list添加
              this.answerList.push({ question_id: this.currentIndex, answer: [], status: 0, rcdStat: 0 })
            }
            alert('关闭对话框后开始录制回答。回答结束后，再次点击蓝色按钮结束录制！')
            // 修改录音状态标志
            this.answerList[index].rcdStat = 1
            this.rcdStat = 1
            console.log('开始录制')
            this.recorder.start()
          } else if (this.rcdStat === 1) { // 停止正在录制的音频
            // this.recorder.stop()
            this.answerList[index].answer = this.recorder.getWAVBlob()
            console.log(this.answerList[index].answer)
            // 录音状态标志置0
            this.answerList[index].rcdStat = 0
            this.rcdStat = 0
            console.log('录制结束')
          }
        } else {
          alert('当前录制回答非此步骤，请点击原步骤停止录制！')
        }
      }, (error) => {
        console.log(`${error.name} : ${error.message}`)
      })
    },
    // 播放录音
    handleListen(index) {
      console.log('试听音频')
      this.player.src = window.URL.createObjectURL(this.answerList[index].answer)
      this.player.play()
    },
    // 删除录音
    handleDelete(index) {
      this.answerList.splice(index, 1)
    },
    // 下一题
    handleNext(index) {
      if (this.exam[index + 1]) {
        // 保存音频数据
        this.handleSend(this.answerList)
        this.recorder.destroy()
        // 清空answerList
        this.answerList = []
        this.answerList.push({ question_id: index + 1, answer: [], status: 0, rcdStat: 0 })
        // 切换题目
        this.currentIndex++
      } else {
        alert('已是最后一题！')
      }
    },
    // 上一题
    // handlePrior(index) {
    //   console.log(this.currentIndex)
    //   if (index === 0) {
    //     alert('已是第一题！')
    //   } else {
    //     this.handleSend(this.answerList)
    //     this.currentIndex--
    //   }
    // },
    // 获取试题数据
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
      .img-container {
        text-align: center;
        margin: 30px;
        .image {
          margin: 0 auto;
        }
      }
      .button {
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
    }
  }
}
</style>
