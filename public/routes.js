const routes = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/index', name: 'home', component: () => import('src/pages/CriarConta.vue') },
      { path: '/DadosTabela', name: 'dados', component: () => import('pages/DadosTabela.vue') },
      { path: '/LoginInicio', name: 'Login', component: () => import('src/pages/LoginInicio.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: '/index',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
