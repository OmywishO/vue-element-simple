import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
{
  path: '/404',
  component: _import('errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: _import('errorPage/401'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'home',
  children: [{
    path: 'home',
    component: _import('home/index'),
    name: 'home',
    meta: {
      title: 'home',
      icon: 'icon-shouye',
      noCache: true
    }
  }]
},
{
  path: '',
  component: Layout,
  redirect: 'permission',
  meta: {
    roles: ['admin']
  }, // you can set roles in root nav
  children: [{
    path: 'permission',
    component: _import('permission/index'),
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin'] // or you can only set roles in sub nav
    }
  }]
}
]
// 重新设置 '/' 以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。
function pathFilter (arr, path) {
  if (arr && arr.length > 0) {
    return '/' + path
  } else {
    return path
  }
}
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
/**
 * 动态路由生成
 * @param {Array} aMenu 后台路由数据
 */
export const formatRoutes = (aMenu) => {
  const aRouter = []
  aMenu.forEach(oMenu => {
    const {
      path,
      component,
      name,
      icon,
      meta,
      hidden,
      children
    } = oMenu
    if (component) {
      const oRouter = {
        path: pathFilter(children, path),
        component: ((resolve) => {
          let componentPath = ''
          if (component === 'Layout') {
            return Layout
          } else {
            componentPath = component
            return _import(componentPath)
          }
        })(),
        name: name,
        icon: icon,
        hidden: hidden,
        meta: meta,
        children: children ? formatRoutes(children) : ''
      }
      aRouter.push(oRouter)
    }
  })
  return aRouter
}
export const asyncRouterMap = []
