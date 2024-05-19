<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="toolbar-green">
      <q-toolbar color="#24cb53">
        <q-toolbar-title style="color: white;">
          Agenda App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

const linksList = [
  {
    title: 'Login',
    caption: '',
    icon: 'home',
    route: { name: 'Login' }
  },
  {
    title: 'Agendar',
    caption: '',
    icon: 'home',
    route: { name: 'AgendarConsultas' }
  },
  {
    title: 'Criar Conta',
    caption: '',
    icon: 'home',
    route: { name: 'criar' }
  }
]

export default defineComponent({
  name: 'LoginLayout',

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
</style>
