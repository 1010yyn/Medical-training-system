<!--  -->
<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <!-- <el-carousel
        class="class-centre-frame"
        height="580px"
      >
        <el-carousel-item
          v-for="item in courseList"
          :key="item"
        >
          <el-image
            class="image"
            :src="item"
            fit="scale-down"
          />
        </el-carousel-item>
      </el-carousel> -->
      <div
        id="container"
        class="card"
      >
        <div
          class="card-header"
          style="display: flex; flex-direction: row"
        >
          <p class="m-0">上次学习位置 </p>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="addButton(currentFrame)"
          >
            新建动作
          </el-button>
        </div>
        <div
          id="video-card"
          class="card-body"
          style="padding: 0"
        >
          <h6 class="card-title"></h6>
        </div>
      </div>

      <div
        id="edit_flow"
        class="card card-primary card-outline"
      >
        <Frame
          v-for="item in list"
          v-show="item.isShow"
          :key="item"
          :button-loc="item.buttonLoc"
          :picpath="item.picpath"
          class="frame"
        />
        <div class="card-header">
          <h5 class="m-0">编辑视频流程</h5>
        </div>
        <div class="card-body">
          <!--<h6 class="card-title">Special title treatment</h6>-->
          <el-button
            class="card add_sections"
            type="primary"
            style="margin:10px;float:left"
            circle
            @click="onFirstClick"
          >+</el-button>
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
              circle
              @click="onclick(item)"
            >+</el-button>
          </li>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import Frame from './components/Frame'


export default {
  name: 'CoursePage',
  components: { Frame },
  data() {
    return {
      title: 'CoursePage',
      currentFrame: '',
      img: require('@/icons/img/head1.jpg'),
      course_id: '',
      // TODO--图片路径
      list: [{ name: '1', isShow: true, picpath: "https://imglf5.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4UkovWDJMbEh2YU9heTd6aUxRN1lqMWhQUkFISTY3dCt3PT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg", buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }, { name: '2', isShow: false, picpath: "https://imglf4.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4Y3ZHRDFhZG1zUHpteUlqbkZLNGVUSU1GK2N0eHUreDJRPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg", buttonLoc: [{ x: 1, Y: 1 }, { x: 2, y: 2 }] }, { name: '3', isShow: false, picpath: "https://imglf4.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4Y0VkbndpM2QxVnFTWGxWcmpFR0tMVU9IdFlnUDRqYnRBPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg", buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }],
      courseList: [require('@/sample/pic1.jpg'), require('@/sample/pic2.jpg'), require('@/sample/pic3.jpg'), require('@/sample/pic4.jpg'), require('@/sample/pic5.jpg'), require('@/sample/pic6.jpg'), require('@/sample/pic7.jpg'), require('@/sample/pic8.jpg'), require('@/sample/pic9.jpg'), require('@/sample/pic10.jpg'), require('@/sample/pic11.jpg')]
    }
  },
  created() {
    this.course_id = this.$route.params
    this.currentFrame = this.list[0]
  },
  methods: {
    // 点击第一个场景前的添加按钮
    onFirstClick() {
      console.log('点击第一个')
      var tmp = { name: 888, isShow: false, picpath: "https://imglf4.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4Y0VkbndpM2QxVnFTWGxWcmpFR0tMVU9IdFlnUDRqYnRBPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg", buttonLoc: [] }// 在列表最前面添加一个元素
      this.list.unshift(tmp)
    },
    // 添加新场景
    onclick(item) {
      console.log(item)
      var index = this.list.indexOf(item)
      var oldList = this.list.slice(0, index + 1)// 取当前添加位置及以前的list片
      var newList = this.list.slice(index + 1, this.list.length)// 取当前添加位置以后的list片
      console.log(oldList)
      console.log('索引：' + index)
      console.log(newList)
      var newItem = { name: '384', isShow: false, picpath: "https://imglf4.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4Y0VkbndpM2QxVnFTWGxWcmpFR0tMVU9IdFlnUDRqYnRBPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg", buttonLoc: [] }
      this.list = oldList.concat(newItem, newList) // 以合并的方式插入新的item
      console.log(this.list)
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
    // 添加按钮
    addButton(item) {
      console.log(this.currentFrame)
      item.buttonLoc.push({ x: '', y: '' })
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
      margin: 30px;
    }
    .class-centre-card {
      margin: 30px;
      min-height: 580px;
      .card-primary {
        list-style: none;
        .show {
          float: left;
          height: 700px;
          width: 1000px;
        }
        .button {
          float: left;
          margin-top: 20px;
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
}
</style>
