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
          <q-td key="naturalPersonName" :props="props">
            {{ props.row.naturalPersonName }}
          </q-td>
          <q-td key="naturalPersonPhone" :props="props">
            {{ props.row.naturalPersonPhone }}
          </q-td>
          <q-td key="schedulingDate" :props="props">
            {{ props.row.schedulingDate }}
          </q-td>
          <q-td key="Hora" :props="props">
            {{ props.row.hora }}
          </q-td>
          <q-td key="serviceName" :props="props">
            {{ props.row.serviceName }}
          </q-td>
          <q-td align="center">
          <input type="checkbox" name="pago" v-model="Pago" value="foipago">
          <span> Foi pago</span>
          </q-td>
          <q-td q-td class="my-custom-padding" align="center"  >
            <q-btn color="green" label="Confirmar" @click="confirmarAgendamento(props.row)" class="q-mr-xs" />
            <q-btn  color="negative" label="Cancelar" @click="cancelarAgendamento(props.row)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
// eslint-disable-next-line import/named
import { ref, onMounted } from 'vue'
import { showLoading, hideLoading } from 'src/composables/UseApi.js'
import { Notify } from 'quasar'

export default {
  setup () {
    const router = useRouter()
    const isLoading = ref(true)
    const rows = ref([])
    const linhaSelecionada = ref(null)

    const columns = [

      {
        name: 'naturalPersonName',
        required: true,
        label: ' Nome ',
        align: 'left',
        field: row => row.naturalPersonName,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'naturalPersonPhone', align: 'center', label: 'Contatos', field: 'phoneNumber', sortable: true },
      { name: 'schedulingDate', label: 'Data', field: 'fat', sortable: true },
      { name: 'Hora', label: 'Hora', field: 'hora', sortable: true },
      { name: 'serviceName', label: 'Serviço', field: 'servico' }
    ]

    onMounted(async () => {
      try {
        const [naturalpersonResponse] = await Promise.all([
          fetch('http://localhost:5123/naturalPerson/')
        ])
        const naturalpersonData = await naturalpersonResponse.json()

        // Process data to separate date and time
        rows.value = naturalpersonData.map(item => {
          const dateTime = new Date(item.schedulingDate)
          return {
            ...item,
            schedulingDate: dateTime.toLocaleDateString(), // Format the date
            hora: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Format the time
          }
        })
        isLoading.value = false
      } catch (error) {
        Notify.create({ type: 'negative', message: 'Erro ao buscar dados da API' })
        console.error('Erro ao buscar dados da API:', error)
        isLoading.value = false
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
      Notify.create({ type: 'positive', message: 'Consulta confirmada com sucesso!' })
    }
    const cancelarAgendamento = async (row) => {
      try {
        const response = await fetch(`http://localhost:5123/naturalPerson/${row.id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          const index = rows.value.indexOf(row)
          if (index !== -1) {
            rows.value.splice(index, 1)
          }
          Notify.create({ type: 'positive', message: 'Consulta cancelada com sucesso!' })
        } else {
          Notify.create({ type: 'negative', message: 'Erro ao cancelar consulta' })
          console.error('Erro ao excluir agendamento:', response.statusText)
        }
      } catch (error) {
        Notify.create({ type: 'negative', message: 'Erro ao cancelar consulta' })
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
      hideLoading

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
