<template>
  <DxScheduler
    id="scheduler"
    :data-source="appointments"
    text-expr="title"
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
      availableTimes: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const response = await axios.get('http://localhost:5123/Schedule/5c22573d-b203-4f82-663c-08dc92c54b41')
        const schedulings = response.data.schedulings
        this.availableTimes = response.data.availableTimes

        this.appointments = schedulings.map(scheduling => {
          const schedulingDate = new Date(scheduling.schedulingDate)
          const weekday = schedulingDate.getDay()

          const availableTimeOfDay = this.availableTimes.find(time => time.weekDayId === weekday)

          if (availableTimeOfDay) {
            // Buscar informações do serviço correspondente ao scheduling.serviceId
            const serviceInfo = response.data.info.find(info => info.serviceId === scheduling.serviceId)

            if (serviceInfo && serviceInfo.serviceDuration) {
              const serviceDurationParts = serviceInfo.serviceDuration.split(':')
              const serviceDurationHours = parseInt(serviceDurationParts[0], 10)
              const serviceDurationMinutes = parseInt(serviceDurationParts[1], 10)

              const startDate = new Date(schedulingDate)
              const endDate = new Date(schedulingDate)
              endDate.setHours(startDate.getHours() + serviceDurationHours)
              endDate.setMinutes(startDate.getMinutes() + serviceDurationMinutes)

              return {
                title: `Appointment ${scheduling.schedulingId}`,
                startDate,
                endDate
              }
            } else {
              console.warn(`Service duration not available for schedulingId ${scheduling.schedulingId}. Skipping appointment.`)
            }
          } else {
            console.warn(`Available time not found for weekday ${weekday}. Skipping appointment.`)
          }

          return null
        }).filter(appointment => appointment !== null)
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
