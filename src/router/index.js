import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/courseList',
    children: [
      {
        path: 'courseList',
        name: 'CourseList',
        component: () => import('@/views/courseCentre/courseList'),
        meta: { title: '课程培训', icon: 'el-icon-s-management' }
      },
      {
        path: 'coursePage',
        name: 'CoursePage',
        component: () => import('@/views/courseCentre/coursePage'),
        meta: { title: '课程培训', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/examCentre',
    component: Layout,
    children: [
      {
        path: 'examList',
        name: 'ExamList',
        component: () => import('@/views/examCentre/examList'),
        meta: { title: '考试中心', icon: 'form' }
      },
      {
        path: 'examPage',
        name: 'ExamPage',
        component: () => import('@/views/examCentre/examPage'),
        meta: { title: '考试中心', noCache: true },
        hidden: true
      },
      {
        path: 'examResult',
        name: 'ExamResult',
        component: () => import('@/views/examCentre/examResult'),
        meta: { title: '考试结束', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/answering',
    component: Layout,
    meta: { title: '答疑中心', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'questionList',
        name: 'QuestionList',
        component: () => import('@/views/answering/platform/questionList'),
        meta: { title: '答疑平台', icon: 'el-icon-chat-line-square' }
      },
      {
        path: 'questionPage',
        name: 'QuestionPage',
        component: () => import('@/views/answering/platform/questionPage'),
        meta: { title: '答疑平台', noCache: true },
        hidden: true
      },
      {
        path: 'quiz',
        name: 'Quiz',
        component: () => import('@/views/answering//quiz/index'),
        meta: { title: '提问', icon: 'el-icon-tickets' }
      }
    ]
  },

  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'messageList',
        name: 'MessageList',
        component: () => import('@/views/message/messageList'),
        meta: { title: '通知中心', icon: 'el-icon-message-solid' }
      },
      {
        path: 'messagePage',
        name: 'MessagePage',
        component: () => import('@/views/message/messagePage'),
        meta: { title: '通知中心', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/info',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Info',
        component: () => import('@/views/info/index'),
        meta: { title: '个人中心', icon: 'el-icon-user' }
      }
    ]
  }, {
    path: '/messageManager',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'MessageManager',
        component: () => import('@/views/messageManager/messageManagerCentre'),
        meta: { title: '通知管理', icon: 'el-icon-bell' }
      },
      {
        path: 'modifyPage',
        name: 'MessageModifyPage',
        component: () => import('@/views/messageManager/modifyPage'),
        meta: { title: '通知管理', noCache: true },
        hidden: true
      },
      {
        path: 'addPage',
        name: 'MesasgeAddPage',
        component: () => import('@/views/messageManager/addMessage'),
        meta: { title: '通知管理', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/courseManager',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'CourseManager',
        component: () => import('@/views/courseManager/courseManagerCentre'),
        meta: { title: '课程管理', icon: 'el-icon-collection' }
      },
      {
        path: 'courseAddPage',
        name: 'CourseAddPage',
        component: () => import('@/views/courseManager/addPage'),
        meta: { title: '课程管理', noCache: true },
        hidden: true
      },
      {
        path: 'flowAddPage',
        name: 'FlowAddPage',
        component: () => import('@/views/courseManager/addFlowPage'),
        meta: { title: '流程管理', noCache: true },
        hidden: true
      },
      {
        path: 'courseModifyPage',
        name: 'CourseModifyPage',
        component: () => import('@/views/courseManager/courseModifyPage'),
        meta: { title: '课程管理', noCache: true },
        hidden: true
      },
      {
        path: 'flowModifyPage',
        name: 'FlowModifyPage',
        component: () => import('@/views/courseManager/flowModifyPage'),
        meta: { title: '流程管理', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/examManager',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ExamManager',
        component: () => import('@/views/examManager/examManagerCentre'),
        meta: { title: '考试管理', icon: 'el-icon-document' }
      },
      {
        path: 'examAddPage',
        name: 'ExamAddPage',
        component: () => import('@/views/examManager/addPage'),
        meta: { title: '考试管理' },
        hidden: true
      },
      {
        path: 'questionAddPage',
        name: 'QuestionAddPage',
        component: () => import('@/views/examManager/addQuestionPage'),
        meta: { title: '考试管理', noCache: true },
        hidden: true
      },
      {
        path: 'modifyPage',
        name: 'ExamModifyPage',
        component: () => import('@/views/examManager/modifyPage'),
        meta: { title: '考试管理', noCache: true },
        hidden: true
      },
      {
        path: 'modifyQuestionPage',
        name: 'QuestionModifyPage',
        component: () => import('@/views/examManager/modifyQuestionPage'),
        meta: { title: '考题管理', noCache: true },
        hidden: true
      },
      {
        path: 'moidfyResultPage',
        name: 'ResultModifyPage',
        component: () => import('@/views/examManager/modifyResultPage'),
        meta: { title: '考试管理', noCache: true },
        hidden: true

      }
    ]
  }, {
    path: '/userManager',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'UserManager',
        component: () => import('@/views/userManager/userManagerCentre'),
        meta: { title: '用户管理', icon: 'el-icon-s-custom' }
      },
      {
        path: 'addUserPage',
        name: 'AddUserPage',
        component: () => import('@/views/userManager/AddUserPage'),
        meta: { title: '用户管理', noCache: true },
        hidden: true
      },
      {
        path: 'infoViewPage',
        name: 'UserInfoView',
        component: () => import('@/views/userManager/infoView'),
        meta: { title: '用户管理', noCache: true },
        hidden: true
      },
      {
        path: 'examModifyPage',
        name: 'ExamUpdatePage',
        component: () => import('@/views/userManager/ExamUpdatePage'),
        meta: { title: '用户管理', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'TestPage',
        component: () => import('@/views/testPage/test'),
        meta: { title: '测试', icon: 'el-icon-s-open' }
      }
    ]

  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
