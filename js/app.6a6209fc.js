(function(e){function t(t){for(var i,a,c=t[0],s=t[1],d=t[2],l=0,f=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&f.push(r[a][0]),r[a]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i]);u&&u(t);while(f.length)f.shift()();return o.push.apply(o,d||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,c=1;c<n.length;c++){var s=n[c];0!==r[s]&&(i=!1)}i&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},r={app:0},o=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var u=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"654f":function(e,t,n){},"71d5":function(e,t,n){"use strict";n("654f")},"9cdc":function(e,t,n){"use strict";n("c701")},b2a3:function(e){e.exports=JSON.parse('[{"name":"Monday","days":[0],"periods":[{"name":"Teacher PLC Meetings","activityName":"Homeworktime","start":[7,10],"end":[8,10]},{"name":"0 Hour Intervention / Remediations Teacher Office Hours","start":[8,20],"end":[9,0]},{"name":"Break","start":[9,0],"end":[9,30]},{"name":"1st Period","start":[9,30],"end":[10,3]},{"name":"2nd Period","start":[10,8],"end":[10,41]},{"name":"3rd Period","start":[10,46],"end":[11,19]},{"name":"4th Period","start":[11,24],"end":[11,57]},{"name":"5th Period","start":[12,2],"end":[12,35]},{"name":"6th Period","start":[12,40],"end":[13,13]},{"name":"7th Period","start":[13,18],"end":[13,51]},{"name":"8th Period","start":[13,56],"end":[14,26]}]},{"name":"Tuesday/Thursday","days":[1,3],"periods":[{"name":"1st Period","start":[7,30],"end":[9,0]},{"name":"2nd Period","start":[9,10],"end":[10,40]},{"name":"Lunch","start":[10,40],"end":[11,15]},{"name":"3rd Period","start":[11,15],"end":[12,45]},{"name":"4th Period","start":[12,55],"end":[14,25]}]},{"name":"Wednesday/Friday","days":[2,4],"periods":[{"name":"5th Period","start":[7,30],"end":[9,0]},{"name":"6th Period","start":[9,10],"end":[10,40]},{"name":"Lunch","start":[10,40],"end":[11,15]},{"name":"7th Period","start":[11,15],"end":[12,45]},{"name":"8th Period","start":[12,55],"end":[14,25]}]}]')},b7d8:function(e,t,n){e.exports=n.p+"img/refresh.ec72cd9f.svg"},bcf3:function(e,t,n){"use strict";n("99af"),n("4de4"),n("4160"),n("caad"),n("c975"),n("d81d"),n("45fc"),n("b0c0"),n("2532"),n("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.run=t.between=t.days=t.updateNextDay=void 0;var i=n("9ab4"),r=n("1315"),o=i.__importDefault(n("b2a3")),a=function(e){return e<10?"0"+e:""+e};function c(e){(e||o.default).map((function(e){return e.periods.forEach((function(e){return e.interval=r.Interval.fromDateTimes(t.updateNextDay(r.DateTime.fromObject({hour:e.start[0],minute:e.start[1]})),t.updateNextDay(r.DateTime.fromObject({hour:e.end[0],minute:e.end[1]}))),e})),e}));var n,i=(e||o.default).map((function(e){return e.periods.forEach((function(e){return e.interval=r.Interval.fromDateTimes(r.DateTime.fromObject({hour:e.start[0],minute:e.start[1]}),r.DateTime.fromObject({hour:e.end[0],minute:e.end[1]})),e})),e}));return function(e){var o,c,s;if(n=void 0!=e&&void 0!=i[e]?i[e]:i.filter((function(e){return e.days.includes(t.days.indexOf(r.DateTime.local().weekdayLong))}))[0],void 0==n)o="No schedule for today",c="n/a",s="n/a";else if(r.DateTime.local().toMillis()<n.periods[0].interval.start.toMillis()||r.DateTime.local().toMillis()>n.periods[n.periods.length-1].interval.end.toMillis()){var d,u=t.updateNextDay(n.periods[0].interval.start).diffNow(["hour","minute","seconds"]);o="".concat(u.toObject().hours,":").concat(a(u.toObject().minutes),":").concat(a(Math.floor(u.toObject().seconds))),c="n/a",s=null===(d=n.periods[0])||void 0===d?void 0:d.name,1}else if(n.periods.some((function(e){return t.between(e.interval)}))){var l,f=n.periods.filter((function(e){return t.between(e.interval)}))[0],m=f.interval.end.diffNow(["hour","minute","seconds"]);o="".concat(m.toObject().hours,":").concat(a(m.toObject().minutes),":").concat(a(Math.floor(m.toObject().seconds))),c=null===f||void 0===f?void 0:f.name,s=(null===(l=n.periods[n.periods.indexOf(f)+1])||void 0===l?void 0:l.name)||"n/a",2}else{var b=n.periods[n.periods.indexOf(n.periods.filter((function(e){return e.interval.end.toMillis()<r.DateTime.local().toMillis()})).reverse()[0])+1],p=b.interval.start.diffNow(["hour","minute","seconds"]);o="".concat(p.toObject().hours,":").concat(a(p.toObject().minutes),":").concat(a(Math.floor(p.toObject().seconds))),c="Break",s=(null===b||void 0===b?void 0:b.name)||"n/a",3}return{timeLeft:"Time left: "+o,currentPeriodName:c,nextPeriodName:s}}}t.updateNextDay=function(e){return e.diffNow().milliseconds>0?e:e.plus(r.Duration.fromObject({day:1}))},t.days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],t.between=function(e){return e.start.toMillis()<r.DateTime.local().toMillis()&&e.end.toMillis()>r.DateTime.local().toMillis()},t.run=c,c()},c701:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23"),r=n("b7d8"),o=n.n(r),a=Object(i["e"])("div",{id:"changeButton"},[Object(i["e"])("img",{src:o.a})],-1);function c(e,t){var n=Object(i["l"])("HelloWorld"),r=Object(i["l"])("Timing");return Object(i["g"])(),Object(i["d"])("div",{id:"app",style:e.info},[Object(i["e"])("div",{id:"middle",style:e.gridStyle},[Object(i["e"])(n,{msg:"Welcome to Your Vue.js + TypeScript App"}),Object(i["e"])(r)],4),a],4)}n("99af");var s=n("d4ec"),d=n("bee2"),u=n("262e"),l=n("2caf"),f=n("9ab4"),m=n("ce1f"),b=(n("a15b"),n("d81d"),Object(i["o"])("data-v-791808d8"));Object(i["i"])("data-v-791808d8");var p={class:"clock"},v={id:"clock_outer",class:"noselect"},h={key:0,id:"clock_analog_inner"},g={id:"text"};Object(i["h"])();var y=b((function(e,t){var n=this;return Object(i["g"])(),Object(i["d"])("div",p,[Object(i["e"])("div",v,["analog"==this.type?(Object(i["g"])(),Object(i["d"])("div",h,[Object(i["e"])("div",{id:"inner",onClick:t[1]||(t[1]=function(){return n.change.apply(n,arguments)})},[(Object(i["g"])(),Object(i["d"])(i["a"],null,Object(i["k"])([0,1,2,3,4,5,6,7,8,9,10,11],(function(e){return Object(i["e"])("div",{class:"dash",key:e},Object(i["m"])(e),1)})),64)),Object(i["e"])("div",{id:"hr",style:"transform: rotate(".concat(360*this.time[0]/12+360*this.time[1]/60/12+90,"deg)")},null,4),Object(i["e"])("div",{id:"min",style:"transform: rotate(".concat(360*this.time[1]/60+360*this.time[2]/60/60+90,"deg)")},null,4)])])):(Object(i["g"])(),Object(i["d"])("div",{key:1,id:"clock_digital_inner",onClick:t[2]||(t[2]=function(){return n.change.apply(n,arguments)})},[Object(i["e"])("span",g,Object(i["m"])(this.time.map((function(e){return 10==Math.max(e,10)&&10!=e?"0"+e:e})).map((function(e,t){return 0==t&&e>12?e-12:e})).join(":"))+" "+Object(i["m"])(this.time[0]>12?"PM":"AM"),1)]))])])})),O=function(e){Object(u["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(s["a"])(this,n),e=t.apply(this,arguments),e.type="analog",e.time=[0,0,0],e.int=null,e.run=function(){var e=new Date;this.time=[e.getHours(),e.getMinutes(),e.getSeconds()],window.requestAnimationFrame(this.run.bind(this))},e}return Object(d["a"])(n,[{key:"mounted",value:function(){this.dash(),window.requestAnimationFrame(this.run.bind(this))}},{key:"dash",value:function(){for(var e=document.getElementsByClassName("dash"),t=0;t<e.length;t++){var n;e.item(t).style.transform="rotate(".concat(30*parseInt((null===(n=e.item(t))||void 0===n?void 0:n.innerHTML)||"0")+90,"deg)")}}},{key:"change",value:function(){"analog"==this.type?this.type="digital":this.type="analog","analog"==this.type&&window.setTimeout(this.dash,10)}},{key:"unmounted",value:function(){this.int&&clearInterval(this.int)}}]),n}(m["b"]);O=Object(f["__decorate"])([Object(m["a"])({props:{msg:String}})],O);var j=O;n("71d5");j.render=y,j.__scopeId="data-v-791808d8";var k=j,w=Object(i["o"])("data-v-715e1100"),P=w((function(e,t){return Object(i["g"])(),Object(i["d"])("span",{innerHTML:this.text()},null,8,["innerHTML"])})),M=n("bcf3"),T=function(e){Object(u["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(s["a"])(this,n),e=t.apply(this,arguments),e.timingData={timeLeft:"n/a",currentPeriodName:"n/a",nextPeriodName:"n/a"},e.int=null,e}return Object(d["a"])(n,[{key:"mounted",value:function(){var e=this;this.timing=M["run"](),this.timingData=this.timing(),this.int=setInterval(function(){e.timing=M["run"](),e.timingData=e.timing()}.bind(this),1e3)}},{key:"beforeUnmount",value:function(){null!=this.int&&clearInterval(this.int)}},{key:"text",value:function(){return"<i>Current: ".concat(this.timingData.currentPeriodName,", Next: ").concat(this.timingData.nextPeriodName,'</i><br><span id="time" style="font-size: 1.5em;">').concat(this.timingData.timeLeft,"</span>")}}]),n}(m["b"]);n("f589");T.render=P,T.__scopeId="data-v-715e1100";var D=T;n("fb6a");function x(e){"#"===e.slice(0,1)&&(e=e.slice(1));var t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16),r=(299*t+587*n+114*i)/1e3;return r>=128?"#000":"#fff"}var N=function(e){Object(u["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(s["a"])(this,n),e=t.apply(this,arguments),e.op=1,e.colors=1==e.op?["#667eea","#764ba2"]:["#cfd9df","#e2ebf0"],e.gridS="",e}return Object(d["a"])(n,[{key:"beforeMount",value:function(){var e;this.gridS="display: grid; grid-template: ".concat(1!=(null===(e=document.getElementById("middle"))||void 0===e?void 0:e.childElementCount)?"auto 1fr":"1fr"," / 1fr; row-gap: 50px")}},{key:"mounted",value:function(){var e;null===(e=this.$el)||void 0===e||e.style.setProperty("--mode",x(this.colors[1])+"b6")}},{key:"info",get:function(){return"\n      background: linear-gradient(45deg, ".concat(this.colors,") repeat;\n      color: ").concat(x(this.colors[1]),";\n      background-size: 100% 100%;\n      animation: AnimationName 30s ease infinite;\n    ")}},{key:"gridStyle",get:function(){return this.gridS}}]),n}(m["b"]);N=Object(f["__decorate"])([Object(m["a"])({components:{HelloWorld:k,Timing:D}})],N);var _=N;n("9cdc");_.render=c;var S=_,I=n("9483");Object(I["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var L=n("5502"),H=Object(L["a"])({state:{},mutations:{},actions:{},modules:{}});Object(i["c"])(S).use(H).mount("#app")},e76f:function(e,t,n){},f589:function(e,t,n){"use strict";n("e76f")}});
//# sourceMappingURL=app.6a6209fc.js.map