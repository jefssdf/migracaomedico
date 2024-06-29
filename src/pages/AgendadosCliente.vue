<template>
  <q-spinner v-if="isLoading" />
  <div class="q-pa-md">
    <q-table
      flat bordered
      ref="tableRef"
      title="Agendados"
      :rows="rows"
      :columns="columns"
      :table-colspan="10"
      row-key="index"
      v-if="!isLoading"
      :rows-per-page-options="[5, 10]"
      v-model:pagination="pagination"
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
          <q-td class="my-custom-padding" align="center">
            <q-btn color="green" label="Finalizar" @click="confirmarAgendamento(props.row)" class="q-mr-xs" />
            <q-btn color="negative" label="Cancelar" @click="cancelarAgendamento(props.row)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Notify } from 'quasar'

export default {
  setup () {
    const isLoading = ref(true)
    const rows = ref([])
    const Pago = ref(false)

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
      { name: 'naturalPersonPhone', align: 'center', label: 'Contatos', field: 'naturalPersonPhone', sortable: true },
      { name: 'schedulingDate', label: 'Data', field: 'schedulingDate', sortable: true },
      { name: 'Hora', label: 'Hora', field: 'hora', sortable: true },
      { name: 'serviceName', label: 'Serviço', field: 'serviceName' }
    ]

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:5123/Scheduling/legalEntity/5c22573d-b203-4f82-663c-08dc92c54b41')
        const data = await response.json()
        // Process data to format date and time
        rows.value = data.map(item => {
          const dateTime = new Date(item.schedulingByIdResponse.schedulingDate)
          return {
            ...item,
            schedulingDate: dateTime.toLocaleDateString(), // Format the date
            hora: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format the time
            schedulingId: item.schedulingByIdResponse.schedulingId // Add schedulingId
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

    const confirmarAgendamento = async (row) => {
      try {
        const response = await fetch(`http://localhost:5123/Scheduling/ends/${row.schedulingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          Notify.create({ type: 'positive', message: 'Consulta finalizada com sucesso!' })
        } else {
          Notify.create({ type: 'negative', message: 'Erro ao confirmar consulta' })
          console.error('Erro ao atualizar agendamento:', response.statusText)
        }
      } catch (error) {
        Notify.create({ type: 'negative', message: 'Erro ao confirmar consulta' })
        console.error('Erro ao atualizar agendamento:', error)
      }
    }

    const cancelarAgendamento = async (row) => {
      try {
        const response = await fetch(`http://localhost:5123/Scheduling/cancel/${row.schedulingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
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
      confirmarAgendamento,
      cancelarAgendamento,
      isLoading,
      Pago
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
  text-align: right;
}
</style>
