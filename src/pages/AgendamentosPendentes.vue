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
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            {{ props.row.name }}
          </q-td>
        </template>
        <template v-slot:body-cell-contatos="props">
          <q-td :props="props">
            {{ props.row.contatos }}
          </q-td>
        </template>
        <template v-slot:body-cell-data="props">
          <q-td :props="props">
            {{ props.row.data }}
          </q-td>
        </template>
        <template v-slot:body-cell-hora="props">
          <q-td :props="props">
            {{ props.row.hora }}
          </q-td>
        </template>
        <template v-slot:body-cell-serviço="props">
          <q-td :props="props">
            {{ props.row.serviço }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" align="right">
            <q-btn
              class="button-confirm button-spacing"
              flat
              label="Confirmar"
              @click="addRow(props.row)"
            ></q-btn>
            <q-btn
              class="button-cancel"
              flat
              label="Cancelar"
              @click="deleteRow(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
        { name: 'contatos', align: 'center', label: 'Contatos', field: 'contatos', sortable: true },
        { name: 'data', align: 'center', label: 'Data', field: 'data', sortable: true },
        { name: 'hora', align: 'center', label: 'Hora', field: 'hora', sortable: true },
        { name: 'serviço', align: 'center', label: 'Serviço', field: 'serviço', sortable: true },
        { name: 'actions', align: 'right', label: '', field: 'actions' }
      ],
      rows: [
        { id: 1, name: 'Alice', contatos: 99910, data: '21/05/2024', hora: '20:00', serviço: 'Advogado' },
        { id: 2, name: 'Bob', contatos: 99910, data: '21/05/2024', hora: '20:00', serviço: 'Advogado' },
        { id: 3, name: 'Charlie', contatos: 99910, data: '21/05/2024', hora: '20:00', serviço: 'Advogado' },
        { id: 4, name: 'Charlie', contatos: 99910, data: '21/05/2024', hora: '20:00', serviço: 'Advogado' }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5
      }
    }
  },
  methods: {
    addRow (row) {
      const newId = this.rows.length + 1
      this.rows.push({ id: newId, name: `Lucas ${newId}`, contatos: 99999999 + newId, data: `2${newId}/05/2024` + newId, hora: `20:0${newId}`, serviço: 'Advogado' })
    },
    deleteRow (row) {
      this.rows = this.rows.filter(r => r.id !== row.id)
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
.text-h6
{
  Color: #26a69a;
}
</style>
