<template>
  <q-page>
    <q-calendar
      v-model="selectedDate"
      :options="options"
      :events="events"
      view="week"
    />
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      selectedDate: '2024-06-14',
      options: {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      },
      events: [
        {
          start: '2024-06-14T09:00:00', // Exemplo de início de evento às 09:00
          end: '2024-06-14T10:00:00', // Exemplo de fim de evento às 10:00
          title: 'Reunião com cliente'
        },
        {
          start: '2024-06-14T14:00:00', // Exemplo de início de evento às 14:00
          end: '2024-06-14T15:30:00', // Exemplo de fim de evento às 15:30
          title: 'Apresentação de projeto'
        }
        // Adicione mais eventos conforme necessário
      ]
    }
  }
}
</script>

<style>
/* Seu CSS personalizado aqui */
</style>
