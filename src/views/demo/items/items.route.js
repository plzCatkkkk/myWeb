const SketchpadSimple = () => import('./sketchpad-simple/index.vue')
const CodeRain = () => import('./codeRain/index.vue')

export function DemoItemsRoute() {
  return [
    {
      path: 'sketchpad-simple',
      name: 'SketchpadSimple',
      component: SketchpadSimple,
    },
    {
      path: 'codeRain',
      name: 'CodeRain',
      component: CodeRain,
    },
  ]
}
