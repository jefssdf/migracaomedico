<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <h1 class="text-h5">Listagem de Produtos</h1>
      <q-card class="q-mt-md">
        <q-card-section>
          <div v-for="(produto, index) in produtos" :key="index" class="produto-item q-mb-md">
            <div class="produto-detalhes">
              <q-paragraph class="q-ma-none q-mb-md">
                <strong>Nome:</strong> {{ produto.name }}
              </q-paragraph>
              <div></div>
              <q-paragraph class="q-ma-none q-mb-xs">
                <strong>Descrição:</strong> {{ produto.description }}
              </q-paragraph>
            </div>
            <div class="produto-acoes">
              <q-btn @click="editarProduto(index)" color="primary" label="Editar" class="q-mr-md" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="mostrarModal" persistent class="larger-dialog">
      <q-card>
        <q-card-section>
          <h2 class="text-h6">Editar Produto</h2>
          <q-input v-model="produtoEditado.name" label="Nome" />
          <q-input v-model="produtoEditado.description" label="Descrição" />
          <q-input v-model.number="produtoEditado.duration" label="Duração (minutos)" type="number" prefix="Min" />
          <q-input v-model.number="produtoEditado.price" label="Preço" type="number" prefix="R$" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" color="negative" @click="fecharModal" />
          <q-btn label="Salvar" color="primary" @click="salvarProduto" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import useNotify from 'src/composables/UserNotify'

export default defineComponent({
  setup () {
    const { notifyError, notifySuccess } = useNotify()

    const produtos = ref([])
    const mostrarModal = ref(false)
    const produtoEditado = ref({
      serviceId: '',
      name: '',
      description: '',
      duration: 0,
      price: 0
    })
    const produtoIndexEditado = ref(null)

    const carregarProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5123/Service/LegalEntityId/5c22573d-b203-4f82-663c-08dc92c54b41')
        produtos.value = response.data.map(produto => ({
          ...produto,
          duration: convertToMinutes(produto.duration)
        }))
      } catch (error) {
        notifyError('Erro ao carregar produtos')
        console.error('Erro ao carregar produtos:', error)
      }
    }

    const convertToMinutes = (duration) => {
      const [hours, minutes] = duration.split(':').map(Number)
      return hours * 60 + minutes
    }

    const convertToHHMMSS = (minutes) => {
      const hours = Math.floor(minutes / 60).toString().padStart(2, '0')
      const mins = (minutes % 60).toString().padStart(2, '0')
      return `${hours}:${mins}:00`
    }

    const editarProduto = (index) => {
      produtoEditado.value = { ...produtos.value[index] }
      produtoIndexEditado.value = index
      mostrarModal.value = true
    }

    const fecharModal = () => {
      mostrarModal.value = false
      produtoEditado.value = { serviceId: '', name: '', description: '', duration: 0, price: 0 }
      produtoIndexEditado.value = null
    }

    const salvarProduto = async () => {
      if (produtoIndexEditado.value !== null) {
        try {
          const produto = {
            serviceId: produtoEditado.value.serviceId,
            name: produtoEditado.value.name,
            description: produtoEditado.value.description,
            duration: convertToHHMMSS(produtoEditado.value.duration),
            price: produtoEditado.value.price,
            legalEntityId: produtoEditado.value.legalEntityId
          }
          await axios.put(`http://localhost:5123/Service/${produto.serviceId}`, produto)
          produtos.value[produtoIndexEditado.value] = { ...produto }
          notifySuccess('Produto salvo com sucesso')
          await carregarProdutos() // Recarrega os produtos após salvar
        } catch (error) {
          notifyError('Erro ao salvar produto')
          console.error('Erro ao salvar produto:', error)
        }
      }
      fecharModal()
    }

    onMounted(() => {
      carregarProdutos()
    })

    return {
      produtos,
      mostrarModal,
      produtoEditado,
      produtoIndexEditado,
      carregarProdutos,
      editarProduto,
      fecharModal,
      salvarProduto
    }
  }
})
</script>

<style scoped>
.text-h5 {
  color: #3fa6b8;
}

.produto-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.produto-detalhes {
  flex-grow: 1;
}

.produto-acoes {
  display: flex;
  gap: 1rem;
}

.larger-dialog .q-card {
  max-width: 600px;
  border-radius: 0px;
}
</style>
