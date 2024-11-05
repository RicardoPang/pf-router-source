import { createMatcher } from './create-matcher';
import HashHistory from './history/hash';
import BrowserHistory from './history/history';
import install from './install';

class VueRouter {
  constructor(options = {}) {
    // 根据路由的配置参数进行格式化操作 {}
    // 创建一个匹配器 用于匹配记录
    // 根据用户传递的routes创建匹配关系 this.matcher需要提供两个方法
    // match 方法用来匹配规则
    // addRouters用来动态添加路由
    this.matcher = createMatcher(options.routes || []); // 两个方法 match addRouters

    switch (options.mode) {
      case 'hash': // hash window.location.hash
        this.history = new HashHistory(this);
        break;
      case 'history': // history.pushState popstate事件
        this.history = new BrowserHistory(this);
        break;
    }

    this.beforeEachHooks = [];
  }

  beforeEach(hooks) {
    this.beforeEachHooks.push(hooks);
  }

  push(to) {
    this.history.push(to);
  }

  match(location) {
    return this.matcher.match(location); // {path:'/about/a',matched:[]}
  }

  init(app) {
    const history = this.history;
    // 初始化时，应该先拿到当前路径，进行匹配逻辑

    // 让路由系统过度到某个路径
    const setupHashListener = () => {
      history.setupListener(); // 监听路径变化
    };
    history.transitionTo(
      // 父类提供方法负责跳转
      history.getCurrentLocation(), // 子类获取对应的路径
      // 跳转成功后注册路径监听，为视图更新做准备
      setupHashListener
    );

    history.listen((route) => {
      // 这个回调的目的是更新app._route 这个_route是一个响应式的变量
      app._route = route;
    });

    // 路径变化后需要渲染组件 有一个响应式变量 等这个变量变化了 就切换组件
  }

  addRoutes(routes) {
    this.matcher.addRoutes(routes);
  }
}

VueRouter.install = install; // 提供的install方法

export default VueRouter;
