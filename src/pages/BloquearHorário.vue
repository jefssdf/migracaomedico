<template>
  <DxScheduler
    id="scheduler"
    :data-source="appointments"
    text-expr="title"
    start-date-expr="startDate"
    end-date-expr="endDate"
    all-day-expr="dayLong"
    recurrence-rule-expr="recurrence"
    v-model:current-date="currentDate"
    current-view="week"
    time-zone="America/Sao_Paulo"
    :adaptivity-enabled="true"
  >
    <DxView
      type="day"
      :start-day-hour="7"
      :end-day-hour="20"
    />
    <DxView
      type="week"
      :start-day-hour="7"
      :end-day-hour="20"
    />
    <DxView type="month" />
    <DxEditing
      :allow-editing-time-zones="true"
      :allow-dragging="false"
    />
  </DxScheduler>
</template>

<script>
import axios from 'axios'
import { DxScheduler, DxView, DxEditing } from 'devextreme-vue/scheduler'

export default {
  components: {
    DxScheduler,
    DxView,
    DxEditing
  },
  data () {
    return {
      appointments: [],
      currentDate: new Date(),
      availableTimes: [] // Array para armazenar os availableTimes
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        console.log('Fetching data from API...')
        const response = await axios.get('http://localhost:5123/Schedule/5c22573d-b203-4f82-663c-08dc92c54b41')
        console.log('API response received:', response.data)

        const schedulings = response.data.schedulings
        const info = response.data.info
        this.availableTimes = response.data.availableTimes // Armazenar os availableTimes
        console.log('Schedulings:', schedulings)
        console.log('Info:', info)
        console.log('AvailableTimes:', this.availableTimes)

        this.appointments = schedulings.map(scheduling => {
          const schedulingDate = new Date(scheduling.schedulingDate)

          // Encontrar o info correspondente ao schedulingId
          const schedulingInfo = info.find(item => item.schedulingId === scheduling.schedulingId)

          if (schedulingInfo) {
            const { serviceDuration, naturalPersonName, serviceName } = schedulingInfo
            const durationParts = serviceDuration.split(':')
            const durationHours = parseInt(durationParts[0], 10)
            const durationMinutes = parseInt(durationParts[1], 10)

            // Definir a hora de início do agendamento
            const startDate = new Date(schedulingDate)

            // Calcular a hora de fim do agendamento usando serviceDuration
            const endDate = new Date(startDate)
            endDate.setHours(startDate.getHours() + durationHours, startDate.getMinutes() + durationMinutes, 0)

            const appointment = {
              title: `${serviceName} - ${naturalPersonName}`,
              startDate,
              endDate,
              dayLong: false,
              recurrence: null
            }

            console.log('Appointment mapped:', appointment)

            return appointment
          }

          // Caso não haja info para o schedulingId, retornar null ou lidar com isso de outra forma
          return null
        }).filter(appointment => appointment !== null) // Filtrar agendamentos nulos, se houver

        console.log('Appointments:', this.appointments)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
</script>

<style scoped>
#scheduler {
  height: 100%;
}
</style>
