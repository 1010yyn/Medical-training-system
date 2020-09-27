<!--  -->
<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <!-- <pdf src="D:\Users\yangy\Documents\GitHub\Medical-training-system\src\sample.pdf" /> -->
      <el-carousel
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
      </el-carousel>

      <div
        id="div1"
        @drop="drop(event)"
        @dragover="allowDrop(event)"
      ></div>
      <el-button
        draggable="true"
        type="primary"
        @ratechange="drag(event)"
      >
        添加
      </el-button>

      <el-divider />
      <div>
        <el-button
          class="add"
          icon="el-icon-plus"
          circle
          @click="onFirstClick"
        />
        <li
          v-for="item in list"
          :key="item.name"
          class="list"
        >
          <img
            class="atmosphere"
            :src="img"
          >
          <el-button
            class="add"
            icon="el-icon-plus"
            circle
            @click="onclick(item)"
          />
        </li>
      </div>
    </el-card>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'

export default {
  name: 'CoursePage',
  data() {
    return {
      title: 'CoursePage',
      course_id: '',
      img: require('@/icons/img/head1.jpg'),
      list: [{ name: 1 }, { name: 2 }, { name: 3 }],
      courseList: [require('@/sample/pic1.jpg'), require('@/sample/pic2.jpg'), require('@/sample/pic3.jpg'), require('@/sample/pic4.jpg'), require('@/sample/pic5.jpg'), require('@/sample/pic6.jpg'), require('@/sample/pic7.jpg'), require('@/sample/pic8.jpg'), require('@/sample/pic9.jpg'), require('@/sample/pic10.jpg'), require('@/sample/pic11.jpg')]
    }
  },
  created() {
    this.course_id = this.$route.params
  },
  methods: {
    onFirstClick() {
      console.log('点击第一个')
      var tmp = { name: 888 }// 在列表最前面添加一个元素
      this.list.unshift(tmp)
    },
    onclick(item) {
      console.log(item)
      var index = this.list.indexOf(item)
      var oldList = this.list.slice(0, index + 1)// 取当前添加位置及以前的list片
      var newList = this.list.slice(index + 1, this.list.length)// 取当前添加位置以后的list片
      console.log(oldList)
      console.log('索引：' + index)
      console.log(newList)
      const newItem = this.list[0]
      newItem.name = '324'// 一个测试
      this.list = oldList.concat(newItem, newList) // 已合并的方式插入新的item
      console.log(this.list)
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    drag(ev) {
      ev.dataTransfer.setData('Text', ev.target.id)
    },
    drop(ev) {
      var data = ev.dataTransfer.getData('Text')
      ev.target.appendChild(document.getElementById(data))
      ev.preventDefault()
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
      #div1 {
        width: 350px;
        height: 70px;
        padding: 10px;
        border: 1px solid #aaaaaa;
      }
      .image {
        height: 100%;
        width: 100%;
      }
      .add {
        float: left;
        margin-top: 10px;
        margin-right: 10px;
      }
      .list {
        display: inline-flex;
        list-style: none;
        margin-bottom: 15px;
        .atmosphere {
          height: 60px;
        }
        .add {
          float: left;
          margin: 10px;
        }
      }
    }
  }
}
</style>
