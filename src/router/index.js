import Vue from 'vue';
// import VueRouter from 'vue-router'; // 官方
import VueRouter from '../vue-router/index.js'; // 手写
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    children: [
      {
        path: 'a',
        component: {
          render() {
            return <h1>about a页面</h1>;
          },
        },
      },
      {
        path: 'b',
        component: {
          render() {
            return <h1>about b页面</h1>;
          },
        },
      },
    ],
  },
];

// 在创造路由的时候 将组件和路径进行格式化操作
// / => recored(component:Home)
// /about => recored(component:About)
// /about/a => recored(component:a)
// /about/b => recored(component:b)
const router = new VueRouter({
  mode: 'history',
  routes,
});

router.addRoutes([
  {
    path: '/about',
    children: [
      {
        path: 'xxx',
        component: {
          render: function () {
            return <h1>xxx</h1>;
          },
        },
      },
    ],
  },
]);

router.beforeEach((from, to, next) => {
  setTimeout(() => {
    console.log(from, to);
    next();
  }, 1000);
});

export default router;
