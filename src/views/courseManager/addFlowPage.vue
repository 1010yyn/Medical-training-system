<!--  -->
<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <div
        id="container"
        class="card"
      >
        <el-button type="primary">返回</el-button>
        <el-button
          type="success"
          style="margin:10px;float:right;"
          @click="submit"
        >完成编辑</el-button>
        <br>
        <br>
        <el-form label-width="120px">
          <el-form-item label="场景描述">
            <el-input
              v-model="currentFrame.name"
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="场景图">
            <el-input
              v-model="currentFrame.picpath"
              placeholder="请输入场景图地址链接"
            />
          </el-form-item>
        </el-form>
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
          <!-- <h5 class="m-0">编辑流程</h5> -->
        </div>
        <div class="card-body">
          <el-button
            class="card add_sections"
            type="primary"
            style="margin:10px;float:left"
            icon="el-icon-plus"
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
              icon="el-icon-plus"
              circle
              @click="onclick(item)"
            />
          </li>

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
      title: 'CourseEditPage',
      currentFrame: '', // 当前展示场景Object
      course_id: '', // 当前课程编号
      imagecropperShow: false,
      imagecropperKey: 0,
      // TODO--图片路径
      list: [{ name: '第一个场景。在该场景中，你是一位护士，如果此时发生了紧急情况，那么你应该做些什么呢？请点击添加动作按钮添加动作，并录制回答。', isShow: true, picpath: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2441934127,243987338&fm=26&gp=0.jpg', buttonLoc: [] }],
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
      this.list.unshift(tmp)// 在list最前端添加
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
      var newItem = { name: '新场景', isShow: false, picpath: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00519-913.jpg', buttonLoc: [] }
      this.list = oldList.concat(newItem, newList) // 以合并的方式插入新的item
      console.log(this.list)
    },
    choose() {

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
