webpackJsonp([2],{"/y5L":function(t){t.exports={open:"open__3ZFh8",red:"red__BAwuh",border:"border__10Tic",closed:"closed__da5Sc",buttonO:"buttonO__3L-Ce",buttonC:"buttonC__1M_zU",close:"close__1CeDy",textfieldC:"textfieldC__17Xmk",opacityOut:"opacityOut__1mHWX",textfieldO:"textfieldO__fq1br",opacity:"opacity__1cVBV"}},Egei:function(t,e,n){"use strict";function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=n("KM04"),l=n("CQvC"),u=n("dVzz"),p=n("/y5L"),f=n.n(p),h=function(t){function e(){var e=o(this,t.call(this));return e.click=function(){console.log("CLICK"),e.setState({state:!e.state.state})},e.state={state:!1},e}return r(e,t),e.prototype.render=function(){return Object(s.h)("div",{class:this.state.state?f.a.open:f.a.closed},Object(s.h)("div",{class:[f.a.border,f.a.red]},"test"),this.state.state&&Object(s.h)("input",{class:this.state.state?f.a.textfieldO:f.a.textfieldC,type:"text",placeholder:"Search for activity"}),Object(s.h)("div",{class:this.state.state?f.a.buttonO:f.a.buttonC,onClick:this.click}))},e}(s.Component),d=n("VgWl"),b=n.n(d),_=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch(t,{method:"POST",mode:"cors",cache:"no-cache",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(t){return t.text()})};n.d(e,"default",function(){return O});var y=Object(s.h)(h,null),O=function(t){function e(){c(this,e);var n=a(this,t.call(this));return n.click=function(){return n.signIn()},n.changeEmail=function(t){return n.setState({email:t})},n.changePassword=function(t){return n.setState({password:t})},n.signIn=function(){console.log(n.state);var t={email:n.state.email,password:n.state.password};console.log(t),_("https://api.cityguidr.com/users/login",t).then(function(t){console.log(t?JSON.parse(t):{})}).catch(function(t){return console.log(t)})},n.state={email:null,password:null},n}return i(e,t),e.prototype.render=function(){return Object(s.h)("div",{class:b.a.content},y,Object(s.h)("h1",{class:b.a.header},"Cityguidr"),Object(s.h)("div",{class:b.a.textfield},Object(s.h)(l.a,{placeholder:"Email",value:this.state.email,onChange:this.changeEmail})),Object(s.h)("div",{class:b.a.textfield},Object(s.h)(l.a,{type:"pass",placeholder:"Password",value:this.state.password,onChange:this.changePassword})),Object(s.h)("div",{class:b.a.buttonHolder},Object(s.h)(u.a,{title:"Sign in",onClick:this.click})))},e}(s.Component)},VgWl:function(t){t.exports={header:"header__3W39W",content:"content__UuVou",textfield:"textfield__3bHCT",buttonHolder:"buttonHolder__2kk5N"}}});
//# sourceMappingURL=route-signIn.chunk.e3376.js.map