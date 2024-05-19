<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <h1 class="text-h5">Listagem de Produtos</h1>
      <q-card class="q-mt-md">
        <q-card-section>
          <div v-for="(cliente, index) in clientes" :key="index" class="flex justify-between items-center q-mb-md">
            <q-paragraph class="q-ma-none">{{ cliente.nome }}</q-paragraph>
            <div>
              <q-btn @click="editarCliente(index)" color="primary" label="Editar" class="q-mr-md" />
              <q-btn @click="removerCliente(index)" color="negative" label="Remover" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="mostrarModal" persistent class="larger-dialog">
      <q-card>
        <q-card-section>
          <h2 class="text-h6">Editar Cliente</h2>
          <q-input v-model="clienteEditado.nome" label="Descrição" />
          <q-input v-model="clienteEditado.senha" label="Codigo"  />
          <q-input v-model="clienteEditado.cnpj" label="Preço" type="number" prefix="R$"/>
        </q-card-section>
        <q-card-actions align ="right">
          <q-btn label="Cancelar" color="negative" @click="fecharModal" />
          <q-btn label="Salvar" color="primary" @click="salvarCliente" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      clientes: [
        { nome: 'Prótese', senha: '1010', cnpj: '100' },
        { nome: 'Limpesa', senha: '1011', cnpj: '100' },
        { nome: 'Consulta', senha: '1011', cnpj: '100' }
      ],
      mostrarModal: false,
      clienteEditado: {
        nome: '',
        senha: '',
        cnpj: ''
      },
      clienteIndexEditado: null
    }
  },
  methods: {
    editarCliente (index) {
      this.clienteEditado = { ...this.clientes[index] }
      this.clienteIndexEditado = index
      this.mostrarModal = true
    },
    fecharModal () {
      this.mostrarModal = false
      this.clienteEditado = { nome: '', senha: '', cnpj: '' }
      this.clienteIndexEditado = null
    },
    salvarCliente () {
      console.log('Salvar alterações do cliente:', this.clienteEditado)
      if (this.clienteIndexEditado !== null) {
        this.clientes[this.clienteIndexEditado] = { ...this.clienteEditado }
      }
      this.fecharModal()
    },
    removerCliente (index) {
      console.log('Remover cliente:', this.clientes[index])
    }
  }
})
</script>

<style scoped>

.larger-dialog .q-card {
  max-width: 600px;
  border-radius: 0px;
}
</style>
