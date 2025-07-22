const demoList = () => import('./demoList/index.vue')
const layout = () => import('./layout/index.vue')

import { DemoItemsRoute } from './items/items.route.js'

export function DemoRoute() {
  return [
    {
      path: '/demolist',
      name: 'demolist',
      component: demoList,
    },
    {
      path: '/demo',
      name: 'demo',
      component: layout,
      children: [...DemoItemsRoute()],
    },
  ]
}
