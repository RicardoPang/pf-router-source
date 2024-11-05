## 快速开始

```shell
git clone https://github.com/RicardoPang/pf-router-source.git

npm install

npm run server
```

## 路由有三种

- hash 路径 锚点，可以切换路径但是不刷新页面，好处是兼容性好，但是丑。服务器获取不到 hash 值，不能做服务端渲染（服务端渲染就是根据路径的不同渲染出一个字符串来返回给浏览器）
- h5 路由 h5 的 api 是可以覆盖掉 window.location 的，在 vue-router4 中不考虑兼容性的情况下全部采用 h5API 来实现的。如果刷新页面会真正的访问服务端资源，服务端没有这个资源所以会产生 404（服务端直接返回应用首页即可）好处是可以支持服务端渲染，而且美观，确定是刷新会产生 404 服务端配合一下就可以
- 内存路由 memoryHistory 不去更改 url 自己弄一个历史记录栈结构来管理 node 环境下可以使用 因为操作导航路径跳转 服务端渲染时会使用

[学习笔记](https://ricardopang.github.io/components/vue-router.html)
