import {
  formatRoutes,
  constantRouterMap
} from '@/router'
import http from '@/utils/request'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({
      commit
    }, data) {
      return new Promise(resolve => {
        const {
          roles
        } = data
        const other = {
          path: '*',
          redirect: '/404',
          hidden: true
        }
        http.get('/routers').then(res => {
          let arr = [{
            path: 'components',
            component: 'Layout',
            redirect: 'drag-dialog',
            name: 'components',
            meta: {
              title: 'components',
              icon: 'component'
            },
            children: [{
              path: 'back-to-top',
              component: 'components-demo/backToTop',
              name: 'backToTop-demo',
              meta: {
                title: 'backToTop'
              },
              children: [{
                path: 'back-to-top2',
                component: 'components-demo/backToTop',
                name: 'backToTop-demo2',
                meta: {
                  title: 'backToTop2'
                }
              }, {
                path: 'back-to-top3',
                component: 'components-demo/backToTop',
                name: 'backToTop-demo3',
                meta: {
                  title: 'backToTop3'
                }
              }]
            }, {
              path: 'drag-dialog',
              component: 'components-demo/dragDialog',
              name: 'dragDialog-demo',
              meta: {
                title: 'dragDialog'
              }
            }]
          }]
          let asyncRouter = formatRoutes(arr)
          let accessedRouters = []
          accessedRouters = accessedRouters.concat(asyncRouter)
          localStorage.setItem('asyncRouter', JSON.stringify(asyncRouter)) // 这里不推荐存储路由。仅为了演示
          accessedRouters = filterAsyncRouter(accessedRouters, roles)
          accessedRouters.push(other)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        })
      })
    }
  }
}

export default permission
