import Base from './base';

function getPathName() {
  return window.location.pathname;
}

class BrowserHistory extends Base {
  constructor(router) {
    super(router);
    this.cb = null;
  }
  push(to) {
    // window.history.pushState({}, '', to);
    // window.dispatchEvent(new PopStateEvent('popstate'), to);
    this.transitionTo(to, () => {
      // 先跳转 再去更改浏览器url路径
      window.history.pushState({}, '', to);
    });
  }
  getCurrentLocation() {
    return getPathName();
  }
  setupListener() {
    // 高版本浏览器下 可以使用popstate替换掉hashchange事件
    window.addEventListener('popstate', () => {
      // 可以监控到浏览器的前进后退事件
      this.transitionTo(getPathName());
    });
  }
}

export default BrowserHistory;
