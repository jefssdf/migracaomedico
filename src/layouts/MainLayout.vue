<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="toolbar-green">
      <q-toolbar color="#24cb53">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="menu-icon"
        />

        <q-toolbar-title style="color: white;">
          Agenda App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="drawer-green"
    >
      <q-list>
        <q-item-label
          header
          class="menu-header"
          style="font-size: 20px;"
        >
          Menus
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          class="menu-item"
          style="font-size: 18px;"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Produtos/Procedimentos',
    caption: '',
    icon: 'import_contacts',
    route: { name: 'ProdutosProcedimentos' }
  },
  {
    title: 'Agendados',
    caption: '',
    icon: 'library_books',
    route: { name: 'Agendados' }
  },
  {
    title: 'Produtos Cadastrados',
    caption: '',
    icon: 'inventory_2',
    route: { name: 'ProdutosCadastrados' }
  },
  {
    title: 'Bloquear Horário',
    caption: '',
    icon: 'schedule',
    route: { name: 'BloquearHorario' }
  },
  {
    title: 'Horarios',
    caption: '',
    icon: 'schedule',
    route: { name: 'Horarios' }
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style>
.toolbar-green { background-color: green; }
.menu-icon { color: white; }
.drawer-green { background-color: #ebebeb; color: rgb(0, 0, 0); }
.menu-header { color: black; }
.menu-item { color: black; }
.q-toolbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
