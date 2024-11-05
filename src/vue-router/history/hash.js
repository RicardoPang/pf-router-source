import Base from './base';

function ensureSlash() {
  if (!window.location.hash) {
    window.location.hash = '/';
  }
}

function getHash() {
  return window.location.hash.slice(1);
}

class HashHistory extends Base {
  constructor(route) {
    super(route);
    ensureSlash();
  }
  push(to) {
    window.location.hash = to;
  }
  getCurrentLocation() {
    return getHash();
  }
  setupListener() {
    window.addEventListener('hashchange', () => {
      // 监听hash值的变化 hash变化后再调用transitionTo方法
      this.transitionTo(getHash());
    });
  }
}

export default HashHistory;
