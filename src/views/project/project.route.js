const projectPage = () => import('./index.vue')

export function ProjectRoute() {
  return [
    {
      path: '/project',
      name: 'project',
      component: projectPage,
    },
  ]
}
