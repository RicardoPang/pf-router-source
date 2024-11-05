import { createRoute } from '../create-matcher';

function runQueue(queue, from, to, callback) {
  // 异步迭代队列需要采用递归的方式来实现
  function next(index) {
    // koa express原理一致
    if (index >= queue.length) {
      return callback();
    }
    let hook = queue[index]; // from to next
    hook(from, to, () => next(index + 1));
  }
  next(0);
}

class Base {
  constructor(router) {
    this.router = router;
    // current值一变化 就需要重新渲染

    // 如何将current变成响应式
    // _route.current = current
    this.current = createRoute(null, {
      // 无法暴露到外部
      path: '/',
    });
  }

  // 核心逻辑
  transitionTo(location, listener) {
    // 根据路径匹配到记录
    let route = this.router.match(location);

    runQueue(this.router.beforeEachHooks, this.current, route, () => {
      // 让数组中的钩子组合起来依次调用 都调用完毕执行自己的逻辑
      this.updateRoute(route); // 用最新的route更新current和_route
      // window.location.hash window.addEventListener
      listener && listener(); // 完成后调用用户回调
    });
  }
  updateRoute(route) {
    // 更新路由即可
    this.current = route;
    this.cb && this.cb(route); // hack 钩子
  }
  listen(cb) {
    // 设置一个回调方法
    this.cb = cb;
  }
}

export default Base;
