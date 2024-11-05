function createRouteMap(routes, oldMap) {
  const pathMap = oldMap || Object.create(null);
  routes.forEach((route) => {
    // 添加到路由记录 用户配置可能无限层级 稍后要递归调用此方法
    addRouteRecord(pathMap, route);
  });
  return {
    // 导出映射关系
    pathMap,
  };
}
// /about/a/b 三个组件 /about[recore] /about/a/[record2] /about/a/b[record3]
// /about/a/b -> 通过匹配到的记录向上查找parent属性将记录维护起来 [record1,record2]
function addRouteRecord(pathMap, route, parentRecord) {
  // /about/a 匹配几个组件?
  // 可以动态添加路由
  // 如果是子路由记录 需要增加前缀
  let path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path;
  // 提取需要信息
  let record = {
    // 稍后会添加一些路径
    path,
    component: route.component,
    parent: parentRecord,
    // meta props name ...
  };
  if (!pathMap[path]) {
    pathMap[path] = record;
  }
  if (route.children) {
    // 递归添加子路由
    route.children.forEach((childRoute) => {
      // 这里需要标记父亲是谁
      addRouteRecord(pathMap, childRoute, record);
    });
  }
}
export function createRoute(record, config) {
  let matched = [];
  if (record) {
    while (record) {
      matched.unshift(record); // 就将当前记录的父亲放到前面
      record = record.parent;
    }
  }

  return {
    path: config.path,
    matched,
  };
}
export const createMatcher = (routes) => {
  let { pathMap } = createRouteMap(routes); // {path:'/',record:{},path:'/about',record}
  function match(location) {
    // 路径对应的匹配路由是谁 matched:[about,aboutA] this.$routes.matched
    let record = pathMap[location];
    return createRoute(record, {
      // 根据记录创建对应的路由 {path:/about/a,matched:[about,aboutA]}
      path: location,
    });
  }
  function addRoutes(routes) {
    // 将新的routes 也增加到pathMap中
    return createRouteMap(routes, pathMap);
  }
  return {
    match,
    addRoutes,
    pathMap,
  };
};
