const Sketchpad = () => import('./sketchpad/index.vue')
const CodeRain = () => import('./codeRain/index.vue')

export function DemoItemsRoute() {
  return [
    {
      path: 'sketchpad',
      name: 'Sketchpad',
      component: Sketchpad,
    },
    {
      path: 'codeRain',
      name: 'CodeRain',
      component: CodeRain,
    },
  ]
}
