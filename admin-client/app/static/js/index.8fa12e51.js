(window.webpackJsonp=window.webpackJsonp||[]).push([["index"],{"0a0d":function(e,t,n){"use strict";n.r(t);n("a4d3"),n("4de4"),n("4160"),n("e439"),n("dbb4"),n("b64b"),n("d3b7"),n("ac1f"),n("5319"),n("159b"),n("96cf");var r=n("2fa7"),o=n("5880"),i=n("f8c8"),a={methods:{initData:function(){var e=echarts.init(document.getElementById("main"));e.setOption({tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{orient:"vertical",x:"left",data:["直接访问","邮件营销","联盟广告","视频广告","搜索引擎"]},series:[{name:"访问来源",type:"pie",radius:["50%","70%"],avoidLabelOverlap:!1,label:{normal:{show:!1,position:"center"},emphasis:{show:!0,textStyle:{fontSize:"30",fontWeight:"bold"}}},labelLine:{normal:{show:!1}},data:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:1548,name:"搜索引擎"}]}]}),window.addEventListener("resize",(function(){e.resize()}))}},mounted:function(){this.initData()}},c=n("2877");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(n,!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var l={components:{MyEcharts:Object(c.a)(a,(function(){var e=this.$createElement;return(this._self._c||e)("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"main"}})}),[],!1,null,null,null).exports},data:function(){return{input:""}},methods:s({},Object(o.mapMutations)(["addNum","removeUserInfo","removeToken"]),{test:function(){this.addNum(1)},loginOut:function(){this.removeUserInfo(),this.removeToken(),this.$router.replace("/login")},testToken:function(){var e;return regeneratorRuntime.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(Object(i.c)());case 2:e=t.sent,console.log(e);case 4:case"end":return t.stop()}}))}}),created:function(){},mounted:function(){},computed:s({},Object(o.mapState)(["num"])),watch:{}},f=Object(c.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"index"},[n("el-button",{on:{click:e.test}},[e._v("ww")]),n("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}}),n("p",[e._v(e._s(e.num))]),n("el-button",{on:{click:e.testToken}},[e._v("用户信息")]),n("el-button",{on:{click:e.loginOut}},[e._v("退出")]),n("my-echarts")],1)}),[],!1,null,null,null);t.default=f.exports},"2fa7":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("85d3"),o=n.n(r);function i(e,t,n){return t in e?o()(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},"85d3":function(e,t,n){e.exports=n("9a13")},f8c8:function(e,t,n){"use strict";var r=n("cebe"),o=n.n(r);function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return"post"===(n=n.toLowerCase())?o.a.post(e,t):"get"===n?o.a.get(e,{params:t}):"delete"===n?o.a.delete(e,t):"put"===n?o.a.put(e,t):(console.error("未知的method"+n),!1)}n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return u}));var a=function(e){return i("/login",e,"post")},c=function(e){return i("/register",e,"post")},u=function(e){return i("/user/info",e,"get")}}}]);