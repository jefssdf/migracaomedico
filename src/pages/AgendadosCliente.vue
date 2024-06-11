<template>
  <q-spinner v-if="isLoading" />
  <div class="q-pa-md">
    <q-table
      style
      flat bordered
      ref="tableRef"
      title="Agendados"
      :rows="rows"
      :columns="columns"
      :table-colspan="9"
      row-key="index"
      v-if="!isLoading"
      >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="contatos" :props="props">
            {{ props.row.contatos }}
          </q-td>
          <q-td key="Data" :props="props">
            {{ props.row.Data }}
          </q-td>
          <q-td key="Hora" :props="props">
            {{ props.row.hora }}
          </q-td>
          <q-td key="Serviço" :props="props">
            {{ props.row.servico }}
          </q-td>
          <q-td q-td class="my-custom-padding" align="right"  >
            <q-btn color="green" label="Confirmar" @click="confirmarAgendamento(props.row)" class="q-mr-xs" />
            <q-btn  color="negative" label="Cancelar" @click="cancelarAgendamento(props.row)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="mostrarDialogo" persistent>
    <q-card>
      <q-card-section>
        <h2 class="text-h6">Opções de Agendamento</h2>
        <q-checkbox v-model="opcao1" label="Foi pago" />
        <div class="q-pa-md" style="max-width: 300px">
        <q-input
        v-model="text"
        filled
        type="textarea"
    />
  </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancelar" color="negative" @click="fecharDialogo" />
        <q-btn label="Enviar" color="green" @click="salvarOpcoes(props.row)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { showLoading, hideLoading } from 'src/composables/UseApi.js'

export default {
  setup () {
    const router = useRouter()
    const isLoading = ref(true)
    const rows = ref([])
    const mostrarDialogo = ref(false)
    const opcao1 = ref(false)
    const text = ref('')
    const linhaSelecionada = ref(null)

    const columns = [

      {
        name: 'name',
        required: true,
        label: ' Nome ',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'contatos', align: 'center', label: 'Contato', field: 'contatos', sortable: true },
      { name: 'Data', label: 'Data', field: 'fat', sortable: true },
      { name: 'Hora', label: 'Hora', field: 'hora', sortable: true },
      { name: 'Serviço', label: 'Serviço', field: 'servico' }
    ]

    onMounted(async () => {
      try {
        const response = await fetch('https://6662e04562966e20ef0a6620.mockapi.io/Nomedoproficional')
        const data = await response.json()
        rows.value = data
        isLoading.value = false
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
      }
    })

    setTimeout(() => {
      isLoading.value = false
    }, 2000)

    const handleButtonClick = (row) => {
      row.pago = true
      router.push({ name: 'AgendarConsultas' })
    }
    const confirmarAgendamento = (row) => {
      linhaSelecionada.value = row
      mostrarDialogo.value = true
    }
    const salvarOpcoes = async (row) => {
      try {
        // Enviar os dados para a API
        const response = await fetch('https://6662e04562966e20ef0a6620.mockapi.io/produto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            opcao1: opcao1.value,
            descricao: text.value // Aqui você pode adicionar qualquer outro dado que deseja enviar
          })
        })

        if (response.ok) {
          mostrarDialogo.value = false

          // Remover o agendamento
          await cancelarAgendamento(row)
        } else {
          console.error('Erro ao enviar dados para a API:', response.statusText)
        }
      } catch (error) {
        console.error('Erro ao enviar dados para a API:', error)
      }
    }

    const fecharDialogo = () => {
      mostrarDialogo.value = false // Fechar o diálogo quando o botão "Cancelar" for clicado
    }

    const cancelarAgendamento = async (row) => {
      try {
        const response = await fetch(`https://6662e04562966e20ef0a6620.mockapi.io/Nomedoproficional/${row.id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          // Remover o item excluído da lista local
          const index = rows.value.indexOf(row)
          if (index !== -1) {
            rows.value.splice(index, 1)
          }
        } else {
          console.error('Erro ao excluir agendamento:', response.statusText)
        }
      } catch (error) {
        console.error('Erro ao excluir agendamento:', error)
      }
    }
    return {
      columns,
      rows,
      handleButtonClick,
      confirmarAgendamento,
      cancelarAgendamento,
      right: ref(false),
      isLoading,
      showLoading,
      hideLoading,
      mostrarDialogo,
      salvarOpcoes,
      fecharDialogo,
      opcao1,
      text: ref('')

    }
  }
}
</script>

<style>
.text-right {
  text-align: right;
}

button {
  display: block;
  width: 100%;
  height: 36px;
  border-radius: 30px;
  background-color: #26a69a;
  color: white;
  font-size: 15px;
  cursor: pointer;
}
.my-custom-padding {
  padding: 10%;
  text-align: r
  }
</style>
