// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import * as FastClick from "fastclick"
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import {getStore,setStore} from './config/mUtils';

// import Vant from 'vant';
// import 'vant/lib/vant-css/index.css';
// Vue.use(Vant);

FastClick.attach(document.body)



Vue.use(VueRouter)
const router = new VueRouter({
	routes
})


router.beforeEach((to, from, next) => {
	// to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    // next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
    // next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
    // next(‘/’)或者 next({ path: ‘/’ }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
	console.log(to);
	console.log(from);
	const userid=getStore('userid');
	if(!userid){
		if((to.name==undefined||to.name=='login')&&(from.name==null||from.name=='wode')){
			return next();
		}else{
			return next({name: 'login'})
		}
	}else{
		if(to.name=='login'&&from.name!=null&&(userid&&userid!=undefined&&userid!='undefined')){
			next(false);
			return;
		}else{
			next();
		}
	}
});


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

