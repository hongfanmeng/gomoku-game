(function(e){function t(t){for(var o,a,i=t[0],c=t[1],s=t[2],f=0,v=[];f<i.length;f++)a=i[f],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&v.push(r[a][0]),r[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);l&&l(t);while(v.length)v.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],o=!0,i=1;i<n.length;i++){var c=n[i];0!==r[c]&&(o=!1)}o&&(u.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},r={app:0},u=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var l=c;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var o=n("85ec"),r=n.n(o);r.a},1:function(e,t){},"1f7e":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e.gameOver?n("h1",[e._v("Game Over : "+e._s(e.gameOver))]):1==e.round?n("h1",[e._v("Black's Round")]):2==e.round?n("h1",[e._v("White's Round")]):n("h1",[e._v("Waiting for new player...")]),n("GoBoard")],1)},u=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"GoBoard"},e._l(15,(function(t){return n("div",{key:t,staticClass:"row"},e._l(15,(function(o){return n("Cell",{key:o,ref:t+"-"+o,refInFor:!0,attrs:{x:t,y:o,hoverStatus:e.color}})})),1)})),0)},i=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"cell",class:{active:(e.isHover||e.status)&&e.hoverStatus,black:1==e.status,white:2==e.status,hoverBlack:1==e.hoverStatus&&0==e.status,hoverWhite:2==e.hoverStatus&&0==e.status},on:{mouseover:function(t){return e.mouseOver()},mouseleave:function(t){return e.mouseLeave()},click:function(t){return e.click()}}})},s=[],l=(n("a9e3"),{name:"Cell",props:{x:Number,y:Number,hoverStatus:Number},data:function(){return{status:0,isHover:0}},methods:{mouseOver:function(){this.isHover=1},mouseLeave:function(){this.isHover=0},click:function(){window.socket.emit("position",{x:this.x,y:this.y})},setStatus:function(e){this.status=e}}}),f=l,v=(n("75ac"),n("2877")),d=Object(v["a"])(f,c,s,!1,null,"ceeda3de",null),p=d.exports,h={name:"GoBoard",components:{Cell:p},data:function(){return{color:0}},mounted:function(){var e=this;window.socket.on("position",(function(t){var n=t.x+"-"+t.y;e.$refs[n][0].setStatus(t.status)})),window.socket.on("color",(function(t){e.color=t}))},methods:{}},m=h,b=(n("e797"),Object(v["a"])(m,a,i,!1,null,"b1413db4",null)),w=b.exports,y={name:"App",components:{GoBoard:w},data:function(){return{round:0,gameOver:""}},created:function(){var e=this;window.socket.on("round",(function(t){e.round=t}))},mounted:function(){var e=this;window.socket.on("gameOver",(function(t){-1==t&&0==t?e.gameOver="Your opponent has disconnected":1==t?e.gameOver="Black Win":2==t&&(e.gameOver="White Win")}))}},O=y,g=(n("034f"),Object(v["a"])(O,r,u,!1,null,null,null)),_=g.exports,k=n("8055"),x=n.n(k);o["a"].config.productionTip=!1,window.socket=x()("/"),new o["a"]({render:function(e){return e(_)}}).$mount("#app")},"75ac":function(e,t,n){"use strict";var o=n("1f7e"),r=n.n(o);r.a},"85ec":function(e,t,n){},bf08:function(e,t,n){},e797:function(e,t,n){"use strict";var o=n("bf08"),r=n.n(o);r.a}});
//# sourceMappingURL=app.5fd51570.js.map