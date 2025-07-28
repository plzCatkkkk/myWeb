import { DemoRoute } from './demo/demo.route'
import { ProjectRoute } from './project/project.route'
import Entrance from './entrance.vue'

export function routes() {
  return [{ path: '/', name: 'Entrance', component: Entrance }, ...DemoRoute(), ...ProjectRoute()]
}
