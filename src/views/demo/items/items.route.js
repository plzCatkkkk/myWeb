const Sketchpad = () => import('./sketchpad/index.vue')

export function DemoItemsRoute() {
  return [
    {
      path: 'sketchpad',
      name: 'Sketchpad',
      component: Sketchpad,
    },
  ]
}
