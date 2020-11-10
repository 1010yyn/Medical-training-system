用户整体信息
<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col
          :span="6"
          :xs="24"
        >
          <!-- <user-card :user="user" /> -->
        </el-col>
        <el-col
          :span="24"
          :xs="24"
        >
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane
                label="修改个人信息"
                name="infoModify"
              >
                <el-form
                  ref="user"
                  class="class-centre-form"
                  :model="user"
                  label-width="120px"
                >
                  <el-form-item label="头 像">
                    <el-image
                      :src="head1"
                      style="width:200px; height:200px;"
                    />
                  </el-form-item>
                  <el-form-item label="UID">
                    <el-input v-model="user.user_id" />
                  </el-form-item>
                  <el-form-item label="用户名">
                    <el-input v-model="user.login_id" />
                  </el-form-item>
                  <el-form-item label="密 码">
                    <el-input v-model="user.password" />
                  </el-form-item>
                  <el-form-item label="姓 名">
                    <el-input v-model="user.user_name" />
                  </el-form-item>
                  <el-form-item label="手机号">
                    <el-input v-model="user.user_phone" />
                  </el-form-item>
                  <el-form-item label="性 别">
                    <el-input v-model="user.sex" />
                  </el-form-item>
                  <el-form-item label="职 称">
                    <el-input v-model="user.post" />
                  </el-form-item>
                  <el-form-item label="科 室">
                    <el-input v-model="user.office" />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="onSubmit"
                    >提交</el-button>
                    <el-button @click="onCancel">取 消</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane
                label="学习记录"
                name="CourseHistory"
              >
                <el-table :data="CourseHistory">
                  <el-table-column
                    label="课程名"
                    min-width="200"
                    prop="course_title"
                  >
                    <template slot-scope="scope">{{ scope.row.course_title }}</template>
                  </el-table-column>
                  <el-table-column
                    label="学习进度"
                    min-width="200"
                    prop="pace"
                  >
                    <template slot-scope="scope">{{ scope.row.completed/scope.row.sum*100 }}%</template>
                  </el-table-column>
                  <el-table-column
                    label="最后学习时间"
                    min-width="200"
                    prop="time_stamp"
                  >
                    <template slot-scope="scope">{{ scope.row.time_stamp }}</template>
                  </el-table-column>
                  <el-table-column
                    label="管理"
                    min-width="200"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-button
                        plain
                        type="primary"
                        @click="handleCourseModify(scope.$index)"
                      >管理</el-button>
                      <el-button
                        plain
                        type="danger"
                        @click="handleCourseDelete(scope.$index)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane
                label="考试记录"
                name="ExamHistory"
              >
                <el-table :data="ExamHistory">
                  <el-table-column
                    label="考试名"
                    min-width="200"
                    prop="exam_title"
                  >
                    <template slot-scope="scope">{{ scope.row.exam_title }}</template>
                  </el-table-column>
                  <el-table-column
                    label="分数"
                    min-width="200"
                    prop="title"
                  >80 </el-table-column>
                  <el-table-column
                    label="考试完成时间"
                    min-width="200"
                    prop="time_stamp"
                  >
                    <template slot-scope="scope">{{ scope.row.time_stamp }}</template>
                  </el-table-column>
                  <el-table-column
                    label="管理"
                    min-width="200"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-button
                        plain
                        type="primary"
                        @click="handleExamModify(scope.$index)"
                      >管理</el-button>
                      <el-button
                        plain
                        type="danger"
                        @click="handleExamDelete(scope.$index)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import UserCard from '../info/components/UserCard'
import { getExamHistory } from '@/api/exam'
import { getCourseHistory } from '@/api/course'
import { getInfo, modifyInfo } from '@/api/user'

export default {
  name: 'Profile',
  // components: { UserCard },
  data() {
    return {
      user: {},
      head1: require('@/icons/img/head1.jpg'),
      activeTab: 'infoModify', // 默认tab
      ExamHistory: [{}],
      CourseHistory: [{}]
    }
  },
  created() {
    this.getUser()
    this.handleGetCourseHistory()
    this.handleGetExamHistory()
  },
  methods: {
    getUser() {
      const data = { type: 'getInfo', user_id: '1' }
      getInfo(data).then((response) => {
        console.log('个人信息：')
        console.log(response)
        this.user = response.data[0]
      })
    },
    // 修改用户信息
    onSubmit() {
      const data = {
        type: 'updateInfo',
        user_id: this.user.user_id,
        login_id: this.user.login_id,
        password: this.user.password,
        user_name: this.user.user_name,
        user_phone: this.user.user_phone,
        sex: this.user.sex,
        post: this.user.post,
        office: this.user.office,
        head: ''
      }
      modifyInfo(data).then((response) => {
        console.log(response)
        if (response.data === true) {
          console.log('修改成功')
          // this.$router.push({ name: 'UserManager' })
        } else {
          console.log('修改失败')
        }
      })
    },
    onCancel() {
      // this.$router.push({ name: 'UserManager' })
    },
    // 获取考试记录数据
    handleGetExamHistory() {
      const data = { type: 'getExamHistory', user_id: '1' }
      getExamHistory(data).then((response) => {
        console.log('考试记录：')
        console.log(response)
        this.ExamHistory = response.data
      })
    },
    // 获取courseList
    handleGetCourseHistory() {
      const data = { type: 'getCourseHistory', user_id: '1' }
      getCourseHistory(data).then((response) => {
        console.log('课程记录')
        console.log(response)
        this.CourseHistory = response.data
      })
    },
    handleCourseModify(index) {

    },
    handleCourseDelete(index) {
      this.CourseHistory.splice(index, index + 1)
    },
    handleExamModify(index) {
      this.$router.push({ name: 'ExamUpdatePage' })
    },
    handleExamDelete(index) {
      this.ExamHistory.splice(index, index + 1)
    }
  }
}
</script>
