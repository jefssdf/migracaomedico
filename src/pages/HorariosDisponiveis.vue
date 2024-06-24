<template>
  <DxScheduler
    id="scheduler"
    :data-source="appointments"
    text-expr="title"
    all-day-expr="dayLong"
    recurrence-rule-expr="recurrence"
    :current-date.sync="currentDate"
    current-view="week"
    time-zone="America/Brasil"
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
import axios from 'axios';
import { DxScheduler, DxView, DxEditing } from 'devextreme-vue/scheduler';

export default {
  components: {
    DxScheduler,
    DxView,
    DxEditing
  },
  data() {
    return {
      appointments: [],
      currentDate: new Date(),
      availableTimes: [] // Array para armazenar os availableTimes
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:5123/Schedule/5c22573d-b203-4f82-663c-08dc92c54b41');
        const schedulings = response.data.schedulings;
        this.availableTimes = response.data.availableTimes; // Armazenar os availableTimes

        this.appointments = schedulings.map(scheduling => {
          const schedulingDate = new Date(scheduling.schedulingDate);
          const weekday = schedulingDate.getDay(); // Obter o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)

          // Encontrar o availableTime correspondente ao dia da semana
          const availableTimeOfDay = this.availableTimes.find(time => time.weekDayId === weekday);

          if (availableTimeOfDay) {
            const startTimeParts = availableTimeOfDay.startTime.split(':');
            const endTimeParts = availableTimeOfDay.endTime.split(':');

            // Definir a hora de início e fim do agendamento
            const startDate = new Date(schedulingDate);
            startDate.setHours(parseInt(startTimeParts[0], 10), parseInt(startTimeParts[1], 10), 0);

            const endDate = new Date(schedulingDate);
            endDate.setHours(parseInt(endTimeParts[0], 10), parseInt(endTimeParts[1], 10), 0);

            return {
              title: `Appointment ${scheduling.schedulingId}`,
              startDate,
              endDate
            };
          }

          // Caso não haja availableTime para o dia da semana, retornar null ou lidar com isso de outra forma
          return null;
        }).filter(appointment => appointment !== null); // Filtrar agendamentos nulos, se houver

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
}
</script>


<style>
#scheduler {
  height: 100%;
}
</style>
