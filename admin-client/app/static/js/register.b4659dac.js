(window.webpackJsonp=window.webpackJsonp||[]).push([["register"],{"73cf":function(e,r,t){"use strict";t.r(r);t("d3b7"),t("ac1f"),t("5319"),t("96cf");var s=t("f8c8"),o={data:function(){var e=this,r=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,16}$/;return{ruleForm:{username:"",password:"",checkPass:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"change"},{min:3,max:15,message:"长度在 3 到 15 个字符",trigger:"change"}],password:[{required:!0,validator:function(t,s,o){""===s?o(new Error("请输入密码")):r.test(s)?(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),o()):o(new Error("请输入8～16位字母、数字及特殊符号组合"))},trigger:"change"}],checkPass:[{required:!0,validator:function(r,t,s){""===t?s(new Error("请再次输入密码")):t!==e.ruleForm.password?s(new Error("两次输入密码不一致!")):s()},trigger:"change"}]}}},methods:{submitForm:function(e){var r=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;r.register()}))},resetForm:function(e){this.$refs[e].resetFields()},register:function(){var e,r,t,o,n;return regeneratorRuntime.async((function(a){for(;;)switch(a.prev=a.next){case 0:return e=this.ruleForm,r=e.username,t=e.password,o={username:r,password:t},a.next=4,regeneratorRuntime.awrap(Object(s.b)(o));case 4:200===(n=a.sent).data.code&&(n.data.data,this.$message.success("注册成功请登录"),this.$router.replace("/login"));case 6:case"end":return a.stop()}}),null,this)}}},n=(t("a894"),t("2877")),a=Object(n.a)(o,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login"},[t("div",{staticClass:"login-input-box"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{attrs:{autocomplete:"off"},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{type:"password",autocomplete:"off","show-password":""},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),t("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.checkPass,callback:function(r){e.$set(e.ruleForm,"checkPass",r)},expression:"ruleForm.checkPass"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("注册")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)])}),[],!1,null,null,null);r.default=a.exports},a894:function(e,r,t){"use strict";var s=t("db38");t.n(s).a},db38:function(e,r,t){},f8c8:function(e,r,t){"use strict";var s=t("cebe"),o=t.n(s);function n(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return"post"===(t=t.toLowerCase())?o.a.post(e,r):"get"===t?o.a.get(e,{params:r}):"delete"===t?o.a.delete(e,r):"put"===t?o.a.put(e,r):(console.error("未知的method"+t),!1)}t.d(r,"a",(function(){return a})),t.d(r,"b",(function(){return u})),t.d(r,"c",(function(){return i}));var a=function(e){return n("/login",e,"post")},u=function(e){return n("/register",e,"post")},i=function(e){return n("/user/info",e,"get")}}}]);