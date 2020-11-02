<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <div class="frame">
      <ReplyItem
        v-for="item in list"
        :key="item.text"
        :text="item.text"
        :time="item.time"
        :user="item.user"
      />
      <el-card
        class="block"
        style="text-align:center;"
      >
        <el-pagination
          layout="prev, pager, next"
          :total="50"
        />
      </el-card>
      <el-divider />
      <el-card class="ans-block">
        <p>请输入回帖内容：</p>
        <el-input
          v-model="ans"
          type="textarea"
          :cols="170"
          :rows="9"
          placeholder="请输入内容"
        />
        <el-button
          type="primary"
          style="float:right;margin:10px;"
          @click="submit"
        >提交</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import ReplyItem from './components/replyItem'

export default {
  name: 'QuestionPage',
  components: { ReplyItem },
  data() {
    return {
      title: 'questionPage',
      ans: '',
      me: {
        user_name: '小杨',
        post: '护士',
        email: 'yangxx@126.com',
        office: '传染科'
      },
      list: [{
        text: '请问核磁共振的特点是什么呢？',
        time: '2020/10/07',
        user: {
          user_name: '李四',
          post: '护士',
          email: 'dsafjkdsal@126.com',
          office: '口腔科'
        }
      }, {
        text: '磁共振的检查特点是它可以多序列多参数成像。可以通过选择不同的成像序列及成像参数来获得不同的组织信号，来提供更多的诊断信息。磁共振可以多方位成像，可以进行横断位，冠状位，矢状位及任意位置的直接采集成像。磁共振没有骨伪影的干扰，能够更好的显示颅后窝的病变。磁共振的软组织分辨力特别高，对神经，骨骼，关节，肌肉及韧带的病变显示得更为清楚。磁共振还拥有多种特殊的成像技术，能够更好的显示组织器官的结构及功能状态。磁共振无电离辐射，是一种特别安全的检查。',
        time: '2020/10/07',
        user: {
          user_name: '王五',
          post: '主治医师',
          email: '123324@126.com',
          office: '影像科'
        }
      }, {
        text: '楼上说的对',
        time: '2020/10/07',
        user: {
          user_name: '张三',
          post: '主治医师',
          email: '121dsafj24@126.com',
          office: '影像科'
        }
      }]
    }
  },
  methods: {
    submit() {
      this.list.push({ text: this.ans, time: '2020/11/02', user: this.me })
    }
  }
}
</script>

<style lang="scss" scoped>
.class-centre {
  &-container {
    margin: 30px;
    .class-centre-title {
      font-size: 25px;
      line-height: 46px;
      color: #409eff;
      border-bottom: solid 2px #409eff;
      margin: 30px;
    }
    .frame {
      margin: 30px;
      .block {
        margin-right: 10px;
        margin-left: 10px;
      }
      .ans-block {
        margin-right: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>
