<!--  -->
<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <el-card class="class-centre-card">
      <el-carousel
        class="class-centre-frame"
        height="580px"
      >
        <el-carousel-item
          v-for="item in courseList"
          :key="item.pic"
        >
          <el-image
            class="image"
            :src="item"
            fit="scale-down"
          />
        </el-carousel-item>
      </el-carousel>
      <div
        id="container"
        class="card"
      >
        <div
          class="card-header"
          style="display: flex; flex-direction: row"
        >
          <h5 class="m-0">上次学习位置</h5>
          <el-button
            id="add_action"
            type="primary"
            class="card add_action"
            style="margin-left：5px"
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
        <div class="card-header">
          <h5 class="m-0">编辑视频流程</h5>
        </div>
        <div class="card-body">
          <!--<h6 class="card-title">Special title treatment</h6>-->
          <el-button
            class="card add_section"
            type="primary"
            circle
          >+</el-button>
          <li class="flow_item">
            <div class="card flow"></div>
            <el-button
              class="card add_section"
              type="primary"
              circle
            >+</el-button>
          </li>
          <li class="flow_item">
            <div class="card flow"></div>
            <el-button
              class="card add_section"
              type="primary"
              circle
            >+</el-button>
          </li>
          <li class="flow_item">
            <div class="card flow"></div>
            <el-button
              class="card add_section"
              type="primary"
              circle
            >+</el-button>
          </li>
          <!--<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
          <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
        </div>

      </div>

    </el-card>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
// import './starter_page'
// import pdf from 'vue-pdf'

export default {
  name: 'CoursePage',
  // components: { pdf },
  data() {
    return {
      title: 'CoursePage',
      img: require('@/icons/img/head1.jpg'),
      course_id: '',
      list: [{ name: '1' }, { name: '2' }],
      courseList: [require('@/sample/pic1.jpg'), require('@/sample/pic2.jpg'), require('@/sample/pic3.jpg'), require('@/sample/pic4.jpg'), require('@/sample/pic5.jpg'), require('@/sample/pic6.jpg'), require('@/sample/pic7.jpg'), require('@/sample/pic8.jpg'), require('@/sample/pic9.jpg'), require('@/sample/pic10.jpg'), require('@/sample/pic11.jpg')]
    }
  },
  created() {
    this.course_id = this.$route.params
  }, mounted() {
    /* 元素对象部分*/
    // 获取所有的流程预览项目
    const lis = document.querySelectorAll('li.flow_item')
    // 增加一个活动的按钮
    const add_action = document.querySelector('#add_action')
    // 放置背景图片,编辑按钮位置的容器
    var container = document.querySelector('#container')
    console.log(container)


    // 左边的边栏
    var aside = document.querySelector('.main-sidebar')
    // 增加flow的编辑栏
    var edit_flow = document.querySelector('#edit_flow')
    // 增加一个flow的按钮
    const add_btns = document.querySelectorAll('button.add_section')


    /* 监听器设置部分*/
    // 活动按钮的事件监听器
    /* add_action.addEventListener('click', addPly)*/
    // 增加flow事件
    for (let i = 0; i < add_btns.length; i++) {
      add_btns[i].addEventListener('click', addSection)
    }

    container.onclick = function (ev) {
      var ev1 = ev || window.event
      var target = ev1.target || ev1.srcElement
      switch (target.className) {
        case 'card add_action':
          var ply = addPly()
          ply.children[1].addEventListener('mousedown', dragOrClick)
          if (currentPlyButton) hideFloatDiv(event)
          break
        case 'ply_button':
          currentPlyButton = target.parentNode
          showFloatDiv(event)
          break
        case 'layer':
          hideFloatDiv(event)
          break
        case 'remove_ply':
          removePly(target.parentNode)
          break
      }
    }

    aside.onclick = function (ev) {
      var ev1 = ev || window.event
      var target = ev1.target || ev1.srcElement
      switch (target.id) {
        case 'test_flow':
          showTest(event)
          break
        case 'test_flow_i':
          showTest(event)
          break
        case 'test_flow_p':
          showTest(event)
          break
      }
    }

    function addSection() {
      //  增加新的节（包括节点和按钮），为节点设置空白背景
      var li = document.createElement('li')
      li.setAttribute('class', 'flow_item')
      li.innerHTML = '<div class="card flow"></div><button class="card add_section">+</button>'
      li.children[0].style['background-image'] = 'url("https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg")'
      li.children[0].style.height = '30px'
      li.children[1].addEventListener('click', addSection)
      insertAfter(li, this)
    }
    function insertAfter(newEl, targetEl) {
      var parentEl = targetEl.parentNode
      if (parentEl.lastChild === targetEl) {
        parentEl.appendChild(newEl)
      } else {
        parentEl.insertBefore(newEl, targetEl.nextSibling)
      }
    }
    // 追踪到所有li
    for (let i = 0; i < lis.length; i++) {
      // alert('url(/static/images/test_img/bg' + String(i+1) +'.jpg)')
      lis[i].children[0].style['background-image'] = 'url(/static/images/test_img/bg' + String(i + 1) + '.jpg)'
      // lis[i].children[0].style['background-size'] = '100px,100px'
      lis[i].children[0].addEventListener('click', showImageOutside)
    }
    // 下面变量用于储存当前页面图片的宽高比
    var presentImageHeightWidthDivision = 1.1
    // 当前活动的layer1的id
    var currentlayer1 = ' '
    function showImageOutside() {
      var video = document.querySelector('#video-card')
      var container = document.querySelector('#container')
      const layers = document.querySelectorAll('div.layer')
      let exist_flat = false
      let n = 1
      var bgImage = this.style['background-image']
      // 当前没有layer1,创建
      if (!layers) {
        var layer1 = document.createElement('div')
        layer1.setAttribute('class', 'layer')
        currentlayer1 = 'layer' + String(n++ + layers.length)
        layer1.setAttribute('id', currentlayer1)
        layer1.style.display = 'none'
        container.appendChild(layer1)
        layer1.style['background-image'] = bgImage
        var url = bgImage.substring(5, bgImage.length - 2)
        var image = new Image()
        image.src = url
        image.onload = function nextStep() {
          presentImageHeightWidthDivision = image.height / image.width
          // alert(image.width)
          // const layer1 = document.querySelector('#video-card')
          var width = container.clientWidth
          var height = parseInt(width * presentImageHeightWidthDivision)
          video.children[1].style['display'] = 'none'

          /* var floatMenu = document.createElement('div')
          var close_float = document.createElement('div')
          floatMenu.setAttribute('class','float')
          close_float.setAttribute('class','close_float')
          floatMenu.appendChild(close_float)
          layer1.appendChild(floatMenu)*/

          layer1.style['background-image'] = bgImage
          layer1.style['background-origin'] = 'center'
          // layer1.style['-moz-background-size'] = '100%'
          layer1.style['background-size'] = '100%'
          layer1.style['height'] = height + 'px'
          layer1.style['width'] = width + 'px'
          add_action.style['display'] = 'block'
          layer1.style['position'] = 'relative'
          layer1.style.display = 'block'
        }
      }

      // 如果已经有layer1
      for (let i = 0; i < layers.length; i++) {
        layers[i].style.display = 'none'
        if (layers[i].style['background-image'] === bgImage) {
          exist_flat = true
          layers[i].style.display = 'block'
          currentlayer1 = layers[i].getAttribute('id')
        }
      }
      // 不存在,创建layer1
      if (!exist_flat) {
        // var layer1 = document.createElement('div')
        layer1.setAttribute('class', 'layer')
        currentlayer1 = 'layer' + String(n++ + layers.length)
        layer1.setAttribute('id', currentlayer1)
        layer1.style.display = 'none'
        container.appendChild(layer1)
        layer1.style['background-image'] = bgImage
        // var url = bgImage.substring(5, bgImage.length - 2)
        // var image = new Image()
        image.src = url
        image.onload = function nextStep() {
          presentImageHeightWidthDivision = image.height / image.width
          // alert(image.width)
          // const layer1 = document.querySelector('#video-card')
          var width = container.clientWidth
          var height = parseInt(width * presentImageHeightWidthDivision)
          video.children[1].style['display'] = 'none'

          layer1.style['background-image'] = bgImage
          layer1.style['background-origin'] = 'center'
          // layer1.style['-moz-background-size'] = '100%'
          layer1.style['background-size'] = '100%'
          layer1.style['height'] = height + 'px'
          layer1.style['width'] = width + 'px'
          add_action.style['display'] = 'block'
          layer1.style['position'] = 'relative'
          layer1.style.display = 'block'
        }
      }
    }

    // 窗口变化时,重塑大小
    window.onresize = function resizeVideoCard() {
      const layer1 = document.querySelector('#' + currentlayer1)
      const contain = document.querySelector('#container')
      var width = contain.clientWidth
      // alert('重塑后的宽度' + width)
      var height = parseInt(width * presentImageHeightWidthDivision)
      layer1.style['height'] = height + 'px'
      layer1.style['width'] = width + 'px'
      layer1.style['background-origin'] = 'center'
      // layer1.style['-moz-background-size'] = '100%'
      layer1.style['background-size'] = '100%'
    }

    var currentPlyButton
    function addPly() {
      console.log('currentlayer1:' + currentlayer1)
      const layer1 = document.querySelector('#' + currentlayer1)
      var ply = document.createElement('div')
      ply.setAttribute('class', 'ply')
      if (layer1) {
        layer1.appendChild(ply)
      } else {
        alert('尚未创建场景')
      }

      /* <div class='ply' style='left: 18.6354% top: 25.2294%'>
          <div class='float' style='left: 33px top: 33px display: block'>
              <button class='card operation inner_button'>操作</button>
              <button class='card next_step inner_button'>下一步</button>
          </div>
          <div class='ply_button'>
              <div class='remove_ply'></div>
          </div>
      </div>*/

      var button = document.createElement('div')
      button.setAttribute('class', 'ply_button')

      var floatMenu = document.createElement('div')
      floatMenu.setAttribute('class', 'float')
      var operation = document.createElement('button')
      operation.setAttribute('class', 'card start_recording inner_button')
      operation.innerHTML = '开始'
      var next_step = document.createElement('button')
      next_step.setAttribute('class', 'card end_recording inner_button')
      next_step.innerHTML = '结束'
      floatMenu.appendChild(operation)
      floatMenu.appendChild(next_step)
      ply.appendChild(floatMenu)
      ply.appendChild(button)
      button.innerHTML = '<div class="remove_ply"></div>'
      return ply
    }

    function showFloatDiv(event) {
      const float_div = currentPlyButton.children[0]
      // const close_float = currentPlyButton.children[0]
      float_div.style.left = '33px'
      float_div.style.top = '33px'
      float_div.style.display = 'block'
      soundRecord()
    }

    function soundRecord() {
      if (navigator.mediaDevices) {
        //  获取打开麦克风权限，以及stream对象
        navigator.mediaDevices.getUserMedia({
          audio: {
            sampleRate: 16000,
            channelCount: 1,
            volume: 1.0
          }
        }).then((stream) => {
          var chunks = []
          //  创建MediaRecorder对象，需要传入stream对象
          var mediaRecorder = new MediaRecorder(stream)
          // var floatDiv = document.querySelector('.float')
          var startBtn = document.querySelector('.start_recording')
          var stopBtn = document.querySelector('.end_recording')
          //  开始
          startBtn.onclick = () => {
            //  开始录音
            mediaRecorder.start()
          }
          //  结束
          stopBtn.onclick = () => {
            //  停止录音
            mediaRecorder.stop()
          }

          //  添加事件监听
          mediaRecorder.onstart = () => {
            console.log('start', mediaRecorder.state)
          }
          mediaRecorder.onstop = () => {
            console.log('stop', mediaRecorder.state)
            //  数据块合成blob对象
            // let blob = new Blob(chunks, {type: 'audio/wav'})
            const blob = new Blob(chunks, { type: 'audio/pcm' })
            console.log(blob)

            var sendData = new FormData()
            sendData.append('sound', blob)
            console.log(sendData)
            // $.ajax({
            //     type: 'post',
            //     // dataType: 'form',
            //     url: '/parse_sound',
            //     data: sendData,
            //     contentType: false,
            //     processData: false,
            //     success: function (result) {
            //         var response_data = document.createElement('div')
            //         response_data.innerText = result
            //         floatDiv.appendChild(response_data)
            //     }
            // })
          }


          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
          }
        }).catch((e) => {
          console.log(e)
        })
      }
    }

    function hideFloatDiv(event) {
      const float_div = currentPlyButton.children[0]
      float_div.style.display = 'none'
    }

    function removePly(target) {
      var ply = target.parentNode
      ply.parentNode.removeChild(ply)
    }

    // 全局变量储存坐标，应该有更好的方法。
    // 使用这种方法是，所有按钮的初始坐标应该一致，必须使用absolute格式。
    var target_first_move = true
    var dataList = new Array(4)
    function dragOrClick(event) {
      currentPlyButton = this.parentNode
      var target = event.target.parentNode
      var parent_node = target.parentNode
      //  计时器起点
      var firstTime = new Date().getTime()
      if (target_first_move) {
        dataList[0] = event.pageX
        dataList[1] = event.pageY
      }

      //  获取外部样式表中值的写法，内部样式用obj.style.attr
      //  获取元素大小信息，以便输出百分比坐标
      var parent_node_height = window.getComputedStyle(parent_node, false)['height']
      var parent_node_width = window.getComputedStyle(parent_node, false)['width']
      parent_node_height = parent_node_height.slice(0, parent_node_height.indexOf('px'))
      parent_node_width = parent_node_width.slice(0, parent_node_width.indexOf('px'))
      var target_height = window.getComputedStyle(target, false)['height']
      var target_width = window.getComputedStyle(target, false)['width']
      target_height = target_height.slice(0, target_height.indexOf('px'))
      target_width = target_width.slice(0, target_width.indexOf('px'))


      window.onmousemove = function (event) {
        target_first_move = false
        var x = event.pageX
        var y = event.pageY
        dataList[2] = (x - dataList[0]) / parent_node_width * 100
        dataList[3] = (y - dataList[1]) / parent_node_height * 100
        var limit_x = (parent_node_height - target_height / 2) / parent_node_height * (100 - 2)
        var limit_y = (parent_node_width - target_width / 2) / parent_node_width * 100 - 1

        //  button不能超出layer1层,当某一方向出界时，另一方向仍然正常滑动，防止视觉上的卡顿
        if (dataList[2] >= 0 && dataList[3] >= 0 && dataList[2] <= limit_x && dataList[3] <= limit_y) {
          target.style.left = dataList[2] + '%'
          target.style.top = dataList[3] + '%'
        } else if (dataList[2] < 0 && dataList[3] >= 0 && dataList[2] <= limit_x && dataList[3] <= limit_y) {
          target.style.left = 0 + '%'
          target.style.top = dataList[3] + '%'
        } else if (dataList[2] >= 0 && dataList[3] < 0 && dataList[2] <= limit_x && dataList[3] <= limit_y) {
          target.style.left = dataList[2] + '%'
          target.style.top = 0 + '%'
        } else if (dataList[2] >= 0 && dataList[3] >= 0 && dataList[2] > limit_x && dataList[3] <= limit_y) {
          target.style.left = limit_x + '%'
          target.style.top = dataList[3] + '%'
        } else if (dataList[2] >= 0 && dataList[3] >= 0 && dataList[2] <= limit_x && dataList[3] > limit_y) {
          target.style.left = dataList[2] + '%'
          target.style.top = limit_y + '%'
        }
      }

      window.onmouseup = function (event) {
        window.onmousemove = null
        window.onmouseup = null
        //  计时器终点，按下与抬起间隔小于200ms，认为时点击，呼出窗口
        var lastTime = new Date().getTime()
        if ((lastTime - firstTime) < 200) {
          showFloatDiv(event)
        }
      }
    }

    function showTest(event) {
      // 全部的Ply按钮
      var all_ply = document.querySelectorAll('div.ply')
      for (let i = 0; i < lis.length; i++) {
        lis[i].children[1].style.display = 'none'
      }
      edit_flow.children[1].children[0].style.display = 'none'
      console.log('length:' + all_ply.length)
      for (let i = 0; i < all_ply.length; i++) {
        console.log('removed')
        all_ply[i].removeEventListener('mousedown', dragOrClick)
        all_ply[i].children[0].style.display = 'none'
      }
    }
  },
  methods: {
    onclick(item) {
      this.list.push({})
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
      .image {
        height: 100%;
        width: 100%;
      }
      .card-primary {
        direction: row;
        list-style-type: none;
        .li {
          display: inline;
        }
        img {
          height: 60px;
        }
        .el-button {
          margin-bottom: 10px;
        }
        .el-row {
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .el-col {
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
