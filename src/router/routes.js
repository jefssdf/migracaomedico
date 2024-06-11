const routes = [
  {
    path: '/AgendarConsultas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/ProdutosProcedimentos', name: 'ProdutosProcedimentos', component: () => import('pages/ProdutosProcedimentos.vue') },
      { path: '/Agendamentos', name: 'Agendamentos', component: () => import('pages/AgendamentosPendentes.vue') },
      { path: '/Agendados', name: 'Agendados', component: () => import('pages/AgendadosCliente.vue') },
      { path: '/ProdutosCadastrados', name: 'ProdutosCadastrados', component: () => import('pages/ProdutosCadastrados.vue') },
      { path: '/Horarios', name: 'Horarios', component: () => import('pages/HorariosDisponiveis.vue') }
    ]
  },
  {
    path: '/LoginInicio',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '/LoginInicio', name: 'Login', component: () => import('src/pages/LoginInicio.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: '/LoginInicio',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
