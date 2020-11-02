<!--  -->
<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <el-carousel
        v-show="showPPT"
        class="class-centre-frame"
        height="650px"
        style="width:100%"
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
      </el-carousel>
      <br>
      <el-button
        v-show="showPPT"
        type="primary"
        style="float:right;"
        @click="closePPT"
      >
        下一部分
      </el-button>
      <br>
      <br>
      <div
        v-show="!showPPT"
        id="container"
        class="card"
      >
        <h4> 1. 在如下场景中，若发生了紧急情况，而你是其中一位医生，接下来你该怎么做？请添加动作并点击录音按钮录制回答。</h4>
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
        v-show="!showPPT"
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
          <!-- <h5 class="m-0">编辑流程</h5> -->
        </div>
        <div class="card-body">
          <el-button
            class="card add_sections"
            type="primary"
            style="margin:10px;float:left"
            icon="el-icon-right"
            circle
            @click="onFirstClick"
          />
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
              @click="onclick(item)"
            />
          </li>
          <el-button
            type="success"
            style="margin:10px;"
            @click="exit"
          >完成学习</el-button>
        </div>
      </div>
      <image-cropper
        v-show="imagecropperShow"
        :key="imagecropperKey"
        :width="300"
        :height="300"
        url="https://httpbin.org/post"
        lang-type="en"
        @close="close"
        @crop-upload-success="cropSuccess"
      />
    </el-card>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import Frame from '@/components/Frame/Frame'
import ImageCropper from '@/components/ImageCropper'

export default {
  name: 'CoursePage',
  components: { Frame, ImageCropper },
  data() {
    return {
      title: 'CoursePage',
      currentFrame: '', // 当前展示场景Object
      course_id: '', // 当前课程编号
      showPPT: true, // 展示PPT组件状态
      imagecropperShow: false,
      imagecropperKey: 0,
      // TODO--图片路径
      list: [{ name: '-1', isShow: true, picpath: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2441934127,243987338&fm=26&gp=0.jpg', buttonLoc: [] }, { name: '0', isShow: false, picpath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603692431749&di=7d09db0071eaa2f6b253315003834043&imgtype=0&src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F80%2F91%2F68%2Fcce47d81_E809168_9705c518.jpg%2521%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fjpg', buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }, { name: '1', isShow: false, picpath: 'https://imglf5.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4UkovWDJMbEh2YU9heTd6aUxRN1lqMWhQUkFISTY3dCt3PT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg', buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }, { name: '2', isShow: false, picpath: 'https://imglf4.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4Y3ZHRDFhZG1zUHpteUlqbkZLNGVUSU1GK2N0eHUreDJRPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg', buttonLoc: [{ x: 1, Y: 1 }, { x: 2, y: 2 }] }, { name: '3', isShow: false, picpath: 'https://imglf4.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4Y0VkbndpM2QxVnFTWGxWcmpFR0tMVU9IdFlnUDRqYnRBPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg', buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }],
      courseList: [require('@/sample/pic1.jpg'), require('@/sample/pic2.jpg'), require('@/sample/pic3.jpg'), require('@/sample/pic4.jpg'), require('@/sample/pic5.jpg'), require('@/sample/pic6.jpg')]
    }
  },
  created() {
    this.course_id = this.$route.params
    this.currentFrame = this.list[0]
  },
  methods: {
    // 点击第一个场景前的添加按钮
    onFirstClick() {
      this.imagecropperShow = true
      console.log('点击第一个')
      var tmp = { name: 888, isShow: false, picpath: 'https://imglf4.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4Y0VkbndpM2QxVnFTWGxWcmpFR0tMVU9IdFlnUDRqYnRBPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg', buttonLoc: [] }// 在列表最前面添加一个元素
      this.list.unshift(tmp)
    },
    // 添加新场景
    onclick(item) {
      this.imagecropperShow = true
      console.log(item)
      var index = this.list.indexOf(item)
      var oldList = this.list.slice(0, index + 1)// 取当前添加位置及以前的list片
      var newList = this.list.slice(index + 1, this.list.length)// 取当前添加位置以后的list片
      console.log(oldList)
      console.log('索引：' + index)
      console.log(newList)
      var newItem = { name: '384', isShow: false, picpath: 'https://imglf4.lf127.net/img/K2JMZkxjQi9SLzR1c0JPd29NT1E4Y0VkbndpM2QxVnFTWGxWcmpFR0tMVU9IdFlnUDRqYnRBPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg', buttonLoc: [] }
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
    // 添加场景图
    addPic() {

    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    },
    // 添加录音按钮
    addButton(item) {
      console.log(this.currentFrame)
      item.buttonLoc.push({ x: '', y: '' })
    },
    closePPT() {
      this.showPPT = false
    },
    exit() {
      this.$router.push({ name: 'CourseList' })
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
      min-height: 650px;

      .class-centre-frame {
        el-carousel-item {
          margin: 0 auto;
        }
      }
    }
    .card-primary {
      list-style: none;
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
