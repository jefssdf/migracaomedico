<template>
  <DxScheduler
    id="scheduler"
    :data-source="appointments"
    text-expr="title"
    all-day-expr="dayLong"
    recurrence-rule-expr="recurrence"
    :current-date.sync="currentDate"
    current-view="week"
    time-zone="Europe/Berlin"
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
import { DxScheduler, DxView, DxEditing } from 'devextreme-vue/scheduler';
import { appointments } from 'src/data.js' // Certifique-se de ajustar o caminho conforme necessário

export default {
  components: {
    DxScheduler,
    DxView,
    DxEditing
  },
  data() {
    return {
      appointments: appointments,
      currentDate: new Date(),
    };
  }
}
</script>

<style>
#scheduler {
  height: 100%;
}
</style>
