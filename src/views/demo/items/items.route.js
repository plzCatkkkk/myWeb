const SketchpadSimple = () => import('./sketchpad-simple/index.vue')
const CodeRain = () => import('./codeRain/index.vue')
const StarrySky = () => import('./starry-sky/index.vue')
const Test = () => import('./test/index.vue')

export function DemoItemsRoute() {
  return [
    {
      path: 'sketchpad-simple',
      name: 'Sketchpad Simple',
      component: SketchpadSimple,
    },
    {
      path: 'codeRain',
      name: 'Code Rain',
      component: CodeRain,
    },
    {
      path: 'starrySky',
      name: 'Starry Sky',
      component: StarrySky,
    },
    {
      path: 'test',
      name: 'Test',
      component: Test,
    },
  ]
}
