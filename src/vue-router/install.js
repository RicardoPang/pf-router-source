// 此install方法实现了将根实例放到了_routerRoot
// 我们将router实例放到了根实例上

import RouterView from './components/router-view';
import RouterLink from './components/router-link';

// 我们可以通过组件的_routerRoot._router路由的实例 实现了路由实例的共享
export let Vue;
const install = (_Vue) => {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      // 给所有组件的生命周期都增加beforeCreate方法
      if (this.$options.router) {
        // 如果有router属性说明是根实例
        this._routerRoot = this; // 将根组件暴露到了this上
        this._router = this.$options.router;
        this._router.init(this); // this._router.history.current

        // 就是响应式中的defineReactive API 这个源码可能会变
        // 组件参数变化了 要重新渲染页面 页面内部改的是current
        // 页面渲染的时候 用的是this._route
        // 把这个current属性定义到_route上面去
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else if (this.$parent && this.$parent._routerRoot) {
        this._routerRoot = this.$parent._routerRoot; // 每个组件都可以通过this._routerRoot拿到根组件的实例
        // 可以通过this._routerRoot._router获取路由的实例
      }
    },
  });
  // 仅仅为了更加方便
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route; // 都是属性 对应的就是this.current
    },
  });
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router; // 存的都是方法 this.$router.addRoutes this.$router.push
    },
  });
  Vue.component('RouterLink', RouterLink);
  Vue.component('RouterView', RouterView);
};

export default install;
