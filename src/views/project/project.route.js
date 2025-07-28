const ProjectPage = () => import('./index.vue')

export function ProjectRoute() {
  return [
    {
      path: '/project',
      name: 'Project',
      component: ProjectPage,
    },
  ]
}
