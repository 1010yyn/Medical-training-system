(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0831f872"],{"39f0":function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return s})),n.d(t,"f",(function(){return u})),n.d(t,"e",(function(){return l})),n.d(t,"b",(function(){return d}));var r=n("829b"),a=n("4328"),i=n.n(a);function o(e){return Object(r["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(e),data:i.a.stringify(e)})}function c(e){return Object(r["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(e),data:i.a.stringify(e)})}function s(e){return Object(r["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(e),data:i.a.stringify(e)})}function u(e){return Object(r["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(e),data:i.a.stringify(e)})}function l(e){return Object(r["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(e),data:i.a.stringify(e)})}function d(e){return Object(r["a"])({url:"/MedicalServer/myServer",method:"post",param:i.a.stringify(e),data:i.a.stringify(e)})}},"95e1":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"class-centre-container"},[n("h1",{staticClass:"class-centre-title"},[e._v(e._s(e.title))]),n("el-card",{staticClass:"class-centre-card"},[n("el-form",{ref:"exam",staticClass:"class-centre-form",attrs:{model:e.exam,"label-width":"120px"}},[n("el-form-item",[n("h3",{staticClass:"stems"},[e._v("第"+e._s(e.currentIndex+1)+"题")])]),n("el-form-item",{attrs:{label:"题 干"}},[n("el-input",{attrs:{type:"textarea"},model:{value:e.exam[e.currentIndex].question_items,callback:function(t){e.$set(e.exam[e.currentIndex],"question_items",t)},expression:"exam[currentIndex].question_items"}})],1),n("el-form-item",{attrs:{label:"场景图"}},[n("el-input",{attrs:{placeholder:"请输入场景图地址链接"},model:{value:e.exam[e.currentIndex].picpath,callback:function(t){e.$set(e.exam[e.currentIndex],"picpath",t)},expression:"exam[currentIndex].picpath"}})],1),n("el-form-item",[n("el-image",{attrs:{src:e.exam[e.currentIndex].picpath}})],1),n("el-form-item",[n("el-button-group",[n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){return e.handlePrior(e.currentIndex)}}},[e._v("上一题")]),n("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onDelete(e.currentIndex)}}},[e._v("删除")]),n("el-button",{attrs:{type:"primary"},on:{click:e.onCancel}},[e._v("取消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleNext(e.currentIndex)}}},[e._v(" 下一题 "),n("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1)],1)],1)],1)],1)},a=[],i=(n("a434"),n("39f0")),o={data:function(){return{title:"修改试题",id:"",exam:[{question_items:""}],exam_info:"",currentIndex:0}},created:function(){this.id=this.$route.params.exam_id,console.log("exam_id:"+this.id),"new"!==this.$route.params.type?this.GetQuestion(this.id):(this.exam_info=this.$route.params.exam,console.log(this.exam_info))},methods:{GetQuestion:function(e){var t=this,n={type:"getExam",exam_id:e};Object(i["a"])(n).then((function(e){console.log(e),t.exam=e.data}))},handleNext:function(e){this.exam[e+1]?this.currentIndex++:alert("已是最后一题！")},handlePrior:function(e){console.log(this.currentIndex),0===e?alert("已是第一题！"):this.currentIndex--},onSubmit:function(){if("new"===this.$$route.params.type)this.onUpdate();else for(var e=0;this.exam[e];e++)this.onSend()},onCancel:function(){this.$router.push({name:"ExamManager"})},onDelete:function(e){this.exam.splice(e,e),this.currentIndex=e-1},onSend:function(){},onUpdate:function(){}}},c=o,s=(n("d302"),n("2877")),u=Object(s["a"])(c,r,a,!1,null,"22c6549c",null);t["default"]=u.exports},a434:function(e,t,n){"use strict";var r=n("23e7"),a=n("23cb"),i=n("a691"),o=n("50c4"),c=n("7b0b"),s=n("65f0"),u=n("8418"),l=n("1dde"),d=n("ae40"),m=l("splice"),f=d("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,h=Math.min,x=9007199254740991,y="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!m||!f},{splice:function(e,t){var n,r,l,d,m,f,v=c(this),b=o(v.length),g=a(e,b),_=arguments.length;if(0===_?n=r=0:1===_?(n=0,r=b-g):(n=_-2,r=h(p(i(t),0),b-g)),b+n-r>x)throw TypeError(y);for(l=s(v,r),d=0;d<r;d++)m=g+d,m in v&&u(l,d,v[m]);if(l.length=r,n<r){for(d=g;d<b-r;d++)m=d+r,f=d+n,m in v?v[f]=v[m]:delete v[f];for(d=b;d>b-r+n;d--)delete v[d-1]}else if(n>r)for(d=b-r;d>g;d--)m=d+r-1,f=d+n-1,m in v?v[f]=v[m]:delete v[f];for(d=0;d<n;d++)v[d+g]=arguments[d+2];return v.length=b-r+n,l}})},d302:function(e,t,n){"use strict";var r=n("d9401"),a=n.n(r);a.a},d9401:function(e,t,n){}}]);