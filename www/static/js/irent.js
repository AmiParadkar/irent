var iRentApp={serviceRoot:"http://irentservice.herokuapp.com/",initialize:function(){this.bindEvents()},bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,!1)},onDeviceReady:function(){iRentApp.receivedEvent("deviceready")},receivedEvent:function(e){var t=document.getElementById(e),i=t.querySelector(".listening"),n=t.querySelector(".received");i.setAttribute("style","display:none;"),n.setAttribute("style","display:block;"),console.log("Received Event: "+e)}};
angular.module("iRent",["ngRoute","iRent.Controllers"]).config(["$routeProvider",function(t){console.log("inside app.js"),t.when("/",{templateUrl:"partials/productList.html",controller:"prodCtrl"}).when("/register",{templateUrl:"partials/register.html",controller:"userRegisterCtrl"}).when("/signIn",{templateUrl:"partials/login.html",controller:"userLoginCtrl"}).when("/home",{templateUrl:"partials/productList.html",controller:"prodCtrl"}).when("/product",{templateUrl:"partials/productList.html",controller:"prodCtrl"}).when("/product/:prodId",{templateUrl:"partials/productDetail.html",controller:"prodDetailCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location","$http",function(t,r,l){}]);
angular.module("iRent").controller("prodCtrl",["$scope","$rootScope","$http",function(o,e,t){o.serviceRoot=iRentApp.serviceRoot,console.log("=========="+o.serviceRoot),t.get(iRentApp.serviceRoot+"/iRentService/product/all").success(function(e){console.log("=========="+iRentApp.serviceRoot+"/iRentService/product/all"),console.log("prod Data -&",e),o.prods=e,console.log("prod size ="+e.length)})}]).controller("prodDetailCtrl",["$scope","$rootScope","$http","$routeParams",function(o,e,t,r){o.serviceRoot=iRentApp.serviceRoot;var c=r.prodId;t.get(iRentApp.serviceRoot+"/iRentService/product/"+c).success(function(e){console.log(e),o.prod=e,console.log("prod name ="+e.prodName)})}]);
angular.module("iRent.Controllers",[]).controller("userCtrl",["$scope","$rootScope","$http",function(e,r,s){s.get(iRentApp.serviceRoot+"/iRentService/user/Alice").success(function(r){console.log("data&&&&&&&",r),e.user=r})}]).controller("userRegisterCtrl",["UserService","$scope","$rootScope","$http","FlashService",function(e,r,s,t,o){r.error=!1,r.errorMsg="",r.submit=function(){var s=r.user.username;r.user.password;r.error=!1,r.errorMsg="",e.GetByUsername(s).then(function(s){alert(s),_.isUndefined(s)||_.isEmpty(s)?e.Create(r.user).then(function(e){e.success?alert("success"):alert("error")}):(alert("Already exits"),s.message="User Name already exits. Please select a different user name",o.Error(s.messge),r.error=!0,r.errorMsg="User Name already exits. Please select a different user name")})}}]).controller("userLoginCtrl",["$scope","$rootScope","$http","$location",function(e,r,s,t){}]);
!function(){"use strict";function e(e){function n(){function n(){var n=e.flash;n&&(n.keepAfterLocationChange?n.keepAfterLocationChange=!1:delete e.flash)}e.$on("$locationChangeStart",function(){n()})}function t(n,t){e.flash={message:n,type:"success",keepAfterLocationChange:t}}function o(n,t){e.flash={message:n,type:"error",keepAfterLocationChange:t}}var a={};return a.Success=t,a.Error=o,n(),a}angular.module("iRent").factory("FlashService",e),e.$inject=["$rootScope"]}();
!function(){"use strict";function e(e,r,t,n){function u(){return e.get(f+"all").then(l,g("Error getting all users"))}function i(r){return e.get(f+r).then(l,g("Error getting user by id"))}function o(r){return console.log("url = "+f+r),e.get(f+r).then(l,g("Error getting user by username"))}function c(r){return console.log("url = "+f+"create"),e.post(f+"create",r).then(l,g("Error creating user"))}function s(r){return e.put(f+r.id,r).then(l,g("Error updating user"))}function a(e){return delete(f+e).then(l,g("Error deleting user"))}function l(e){return alert("Inside handleSuccess"),e.data}function g(e){return function(){return alert("Inside handeError"),{success:!1,message:e}}}var d={},f=iRentApp.serviceRoot+"/iRentService/user/";return d.GetAll=u,d.GetById=i,d.GetByUsername=o,d.Create=c,d.Update=s,d.Delete=a,d}angular.module("iRent").factory("UserService",e),e.$inject=["$http","$timeout","$filter","$q"]}();