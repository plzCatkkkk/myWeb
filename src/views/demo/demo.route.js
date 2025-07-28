const DemoList = () => import('./demoList/index.vue')
const Layout = () => import('./layout/index.vue')

import { DemoItemsRoute } from './items/items.route.js'

export function DemoRoute() {
  return [
    {
      path: '/demolist',
      name: 'DemoList',
      component: DemoList,
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Layout,
      children: [...DemoItemsRoute()],
    },
  ]
}
