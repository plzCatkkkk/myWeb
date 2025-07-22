const sketchpad = () => import('./sketchpad/index.vue')

export function DemoItemsRoute() {
  return [
    {
      path: 'sketchpad',
      name: 'sketchpad',
      component: sketchpad,
    },
  ]
}
