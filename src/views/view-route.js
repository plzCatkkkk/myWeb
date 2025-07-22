import { DemoRoute } from './demo/demo.route'
import { ProjectRoute } from './project/project.route'

export function routes() {
  return [...DemoRoute(), ...ProjectRoute()]
}
