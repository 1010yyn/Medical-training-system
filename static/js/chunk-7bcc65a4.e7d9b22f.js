(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7bcc65a4"],{"39f0":function(t,e,n){"use strict";n.d(e,"d",(function(){return l})),n.d(e,"a",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"f",(function(){return c})),n.d(e,"e",(function(){return u})),n.d(e,"b",(function(){return d}));var a=n("829b"),r=n("4328"),i=n.n(r);function l(t){return Object(a["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(t),data:i.a.stringify(t)})}function o(t){return Object(a["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(t),data:i.a.stringify(t)})}function s(t){return Object(a["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(t),data:i.a.stringify(t)})}function c(t){return Object(a["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(t),data:i.a.stringify(t)})}function u(t){return Object(a["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(t),data:i.a.stringify(t)})}function d(t){return Object(a["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(t),data:i.a.stringify(t)})}},"404f":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"class-centre-container"},[n("h1",{staticClass:"class-centre-title"},[t._v(t._s(t.title))]),n("div",{staticClass:"class-centre-table"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.addExam}},[t._v("添加新考试")]),n("el-table",{staticStyle:{width:"100%","padding-top":"15px"},attrs:{data:t.list}},[n("el-table-column",{attrs:{label:"考试名称","min-width":"50",prop:"exam_title"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.exam_title))]}}])}),n("el-table-column",{attrs:{label:"发布科室","min-width":"50",align:"center",prop:"office"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.office))]}}])}),n("el-table-column",{attrs:{label:"起始时间","min-width":"50",align:"center",prop:"start"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.start))]}}])}),n("el-table-column",{attrs:{label:"结束时间","min-width":"50",align:"center",prop:"end"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.end))]}}])}),n("el-table-column",{attrs:{label:"管理","min-width":"100",align:"center",prop:"manage"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{plain:"",type:"primary"},on:{click:function(n){return t.handleModify(e.$index)}}},[t._v("修改")]),n("el-button",{attrs:{plain:"",type:"success"},on:{click:function(n){return t.handleResult(e.$index)}}},[t._v("管理")]),n("el-button",{attrs:{plain:"",type:"danger"},on:{click:function(n){return t.handleDelete(e.$index)}}},[t._v("删除")])]}}])})],1)],1)])},r=[],i=(n("a434"),n("39f0")),l={data:function(){return{title:"考试管理",list:[]}},created:function(){this.initExamList()},methods:{initExamList:function(){var t=this,e={type:"getExamList"};Object(i["d"])(e).then((function(e){console.log(e.data),t.list=e.data}))},addExam:function(){this.$router.push({name:"ExamAddPage"})},handleModify:function(t){console.log("exam_id:"+this.list[t].exam_id),this.$router.push({name:"ExamModifyPage",params:{exam_id:this.list[t].exam_id}})},handleResult:function(t){this.$router.push({name:"ResultModifyPage",params:{exam_id:this.list[t].exam_id}})},handleDelete:function(t){this.list.splice(t,t+1)}}},o=l,s=(n("f070"),n("2877")),c=Object(s["a"])(o,a,r,!1,null,"79177b1f",null);e["default"]=c.exports},a434:function(t,e,n){"use strict";var a=n("23e7"),r=n("23cb"),i=n("a691"),l=n("50c4"),o=n("7b0b"),s=n("65f0"),c=n("8418"),u=n("1dde"),d=n("ae40"),f=u("splice"),m=d("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,h=Math.min,y=9007199254740991,b="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!f||!m},{splice:function(t,e){var n,a,u,d,f,m,g=o(this),v=l(g.length),_=r(t,v),x=arguments.length;if(0===x?n=a=0:1===x?(n=0,a=v-_):(n=x-2,a=h(p(i(e),0),v-_)),v+n-a>y)throw TypeError(b);for(u=s(g,a),d=0;d<a;d++)f=_+d,f in g&&c(u,d,g[f]);if(u.length=a,n<a){for(d=_;d<v-a;d++)f=d+a,m=d+n,f in g?g[m]=g[f]:delete g[m];for(d=v;d>v-a+n;d--)delete g[d-1]}else if(n>a)for(d=v-a;d>_;d--)f=d+a-1,m=d+n-1,f in g?g[m]=g[f]:delete g[m];for(d=0;d<n;d++)g[d+_]=arguments[d+2];return g.length=v-a+n,u}})},a694:function(t,e,n){},f070:function(t,e,n){"use strict";var a=n("a694"),r=n.n(a);r.a}}]);