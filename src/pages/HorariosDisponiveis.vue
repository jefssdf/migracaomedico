<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6" style="color: #3fa6b8">Adicionar Novo Horário</div>
        <q-icon name="event" id="icon-calendario" @click="toggleCalendar" style="cursor: pointer; color: #3fa6b8; font-size: 50px;" />
        <div v-if="showDateTimePickers" class="row q-col-gutter-md justify-end">
          <q-btn @click="addEvent" label="Adicionar" :style="{ backgroundColor: '#3fa6b8', color: 'white' }" class="q-mt-md" />
        </div>
        <div v-if="showDateTimePickers" class="row q-col-gutter-md">
          <q-input
              v-model="newEventDate"
              type="date"
              label="Data"
              :color="'#21BA45'"
              class="q-col-6"
            />
          <q-input
            v-model="newEventTime"
            type="time"
            label="Hora"
            :color="'#21BA45'"
            class="q-col-6" />
        </div>
      </q-card-section>
    </q-card>
    <div class="text-h5" style="color: #3fa6b8">Horários Disponíveis</div>
    <q-input v-model="selectedDate" type="date" label="Data" :color="'#21BA45'" class="q-mb-md" @input="initializeHours" />
      <q-card-section class="q-gutter-md">
        <div class="row justify-start">
          <q-btn
            v-for="hour in getHoursForSelectedDate"
            :key="hour.time"
            :label="hour.time"
            :style="{ backgroundColor: hour.available ? '#21BA45' : 'red', color: 'white' }"
            @click="toggleAvailability(hour)"
            class="q-btn-square q-mr-sm q-mb-sm"
            outlined
          >
            <q-icon name="close" @click.stop="removeHour(hour)" class="q-ml-xs cursor-pointer" style="color: white" />
          </q-btn>
        </div>
      </q-card-section>

  </q-page>
</template>

<script>
import { QCardSection, QBtn, QCard, QInput, QIcon, QPage } from 'quasar'

export default {
  name: 'HorariosDisponiveis',
  components: {
    QCardSection,
    QBtn,
    QCard,
    QInput,
    QIcon,
    QPage
  },
  data () {
    return {
      hoursByDate: {},
      newEventDate: new Date().toISOString().substr(0, 10),
      newEventTime: '',
      selectedDate: new Date().toISOString().substr(0, 10),
      showDateTimePickers: false
    }
  },
  computed: {
    getHoursForSelectedDate () {
      return this.hoursByDate[this.selectedDate] || []
    }
  },
  mounted () {
    this.initializeHours() // Chama a função para gerar os horários quando o componente é montado
  },
  methods: {
    initializeHours () {
      if (this.selectedDate && !this.hoursByDate[this.selectedDate] && this.isWeekday(this.selectedDate)) {
        this.hoursByDate[this.selectedDate] = this.generateHours()
      }
    },
    generateHours () {
      const hours = []
      for (let i = 7; i <= 17; i++) {
        hours.push({
          time: `${i.toString().padStart(2, '0')}:00`,
          available: true
        })
      }
      return hours
    },
    toggleAvailability (hour) {
      hour.available = !hour.available
    },
    addEvent () {
      if (!this.newEventDate || !this.newEventTime) return
      if (!this.isWeekday(this.newEventDate)) {
        alert('Só é possível adicionar horários de segunda a sexta-feira.')
        return
      }

      const hour = parseInt(this.newEventTime.split(':')[0], 10)
      if (hour < 8 || hour > 17) {
        alert('Só é possível adicionar horários entre 08:00 e 17:00.')
        return
      }

      if (!this.hoursByDate[this.newEventDate]) {
        this.hoursByDate[this.newEventDate] = []
      }

      this.hoursByDate[this.newEventDate].push({
        time: this.newEventTime,
        available: true
      })

      this.newEventDate = ''
      this.newEventTime = ''
      this.showDateTimePickers = true
    },
    toggleCalendar () {
      this.showDateTimePickers = !this.showDateTimePickers
    },
    removeHour (hour) {
      const hours = this.getHoursForSelectedDate
      const index = hours.findIndex(h => h.time === hour.time)
      if (index !== -1) {
        hours.splice(index, 1)
      }
    },
    isWeekday (dateString) {
      const date = new Date(dateString)
      const day = date.getUTCDay()
      return day >= 1 && day <= 5
    }
  }
}
</script>

<style>
.q-btn-square {
  width: 100px;
  height: 100px;
}
.q-mr-sm {
  margin-right: 10px;
}
.q-mb-sm {
  margin-bottom: 10px;
}
.text-h5 {
text-align: center;
font-weight: bold;
}
</style>
