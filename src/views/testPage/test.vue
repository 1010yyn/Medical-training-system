<template>
  <div class="class-centre-container">
    <h1 class="class-centre-title">{{ title }}</h1>
    <p style="text-align: center; margin: 50px 0 20px">使用 scoped-slot 自定义数据项</p>
    <div style="text-align: center">
    </div>
  </div>
</template>

<script>

export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value4: [1],
      title: '测试页面',
      list: [{ name: '1', isShow: true, pic: require('@/sample/pic1.jpg'), buttonLoc: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }, { name: '2', isShow: false, pic: require('@/sample/pic2.jpg'), buttonLoc: [{ x: 1, y: 1 }, { x: 3, y: 3 }, { x: 2, y: 2 }] }],
      courseList: [require('@/sample/pic1.jpg'), require('@/sample/pic2.jpg'), require('@/sample/pic3.jpg'), require('@/sample/pic4.jpg'), require('@/sample/pic5.jpg'), require('@/sample/pic6.jpg')]
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>

<style  lang='scss'  scoped>
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
    .blc {
      height: 100px;
    }
  }
}
</style>
