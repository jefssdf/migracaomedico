<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Agendamentos Pendente</div>
      </q-card-section>

      <q-separator></q-separator>

      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        :pagination="pagination"
      >
        <template v-slot:body-cell-naturalPersonName="props">
          <q-td :props="props">
            {{ props.row.naturalPersonName }}
          </q-td>
        </template>
        <template v-slot:body-cell-naturalPersonPhone="props">
          <q-td :props="props">
            {{ props.row.naturalPersonPhone }}
          </q-td>
        </template>
        <template v-slot:body-cell-createdAt="props">
          <q-td :props="props">
            {{ props.row.createdAt }}
          </q-td>
        </template>
        <template v-slot:body-cell-hora="props">
          <q-td :props="props">
            {{ props.row.hora }}
          </q-td>
        </template>
        <template v-slot:body-cell-serviceName="props">
          <q-td :props="props">
            {{ props.row.serviceName }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" align="right">
            <q-btn color="green" label="Confirmar" @click="confirmAppointment(props.row)" class="q-mr-xs" />
            <q-btn color="negative" label="Cancelar" @click="cancelAppointment(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      columns: [
        { name: 'naturalPersonName', required: true, label: 'Nome', align: 'left', field: row => row.naturalPersonName, format: val => `${val}`, sortable: true },
        { name: 'naturalPersonPhone', align: 'center', label: 'Contatos', field: 'naturalPersonPhone', sortable: true },
        { name: 'createdAt', align: 'center', label: 'Data', field: 'createdAt', sortable: true },
        { name: 'hora', align: 'center', label: 'Hora', field: 'hora', sortable: true },
        { name: 'serviceName', align: 'center', label: 'Serviço', field: 'serviceName', sortable: true },
        { name: 'actions', align: 'right', label: '', field: 'actions' }
      ],
      rows: [],
      pagination: {
        page: 1,
        rowsPerPage: 5
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const response = await axios.get('http://localhost:5123/naturalPerson/')
        this.rows = response.data.map(item => {
          const dateTime = new Date(item.createdAt)
          return {
            ...item,
            createdAt: dateTime.toLocaleDateString(), // Format the date
            hora: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Format the time
          }
        })
      } catch (error) {
        console.error('Falha ao buscar dados:', error)
      }
    },
    async confirmAppointment (row) {
      try {
        await axios.post(`http://localhost:5123/naturalPerson/${row.id}/confirm`)
        this.rows = this.rows.filter(r => r.id !== row.id)
      } catch (error) {
        console.error('Falha ao confirmar agendamento:', error)
      }
    },
    async cancelAppointment (row) {
      try {
        await axios.post(`http://localhost:5123/naturalPerson/${row.id}/cancel`)
        this.rows = this.rows.filter(r => r.id !== row.id)
      } catch (error) {
        console.error('Falha ao cancelar agendamento:', error)
      }
    }
  }
}
</script>

<style scoped>
.q-pa-md {
  padding: 18px;
}

.button-confirm {
  background-color: #4caf50;
  color: white;
  font-size: 10px;
  border-radius: 30px;
}

.button-cancel {
  background-color: #c10015;
  color: white;
  font-size: 10px;
  border-radius: 30px;
}

.button-spacing {
  margin-right: 5px;
}

.text-h6 {
  color: #26a69a;
}
</style>
