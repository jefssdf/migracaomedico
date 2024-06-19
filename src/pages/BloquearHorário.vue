<template>
  <div class="primeira">
    <h6>Defina horários de bloqueio:</h6>
    <q-input filled v-model="dateModel" class="full-width larger-input">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dateModel" mask="YYYY-MM-DD">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Enviar" color="primary" flat text-color="white" />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input filled v-model="timeModel" class="full-width larger-input">
      <template v-slot:prepend>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="timeModel" mask="HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Enviar" color="primary" flat text-color="white" />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input filled
    v-model="duration"
    class="full-width larger-input"
    label="Tempo de indisponibilidade (minutos)"
    prefix="Min"
    >
      <template v-slot:prepend>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <div class="q-pa-md">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Enviar" color="primary" flat text-color="white" @click="enviarDuracao" />
              </div>
            </div>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-btn flat color="secondary" label="Enviar" type="button" @click="fazerLogin" text-color="white" />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

export default {
  setup () {
    const dateModel = ref('2019-02-01')
    const timeModel = ref('12:44')
    const duration = ref(0)
    const isLoading = ref(false)

    const enviarDuracao = () => {
      // Lógica para manipular a duração, se necessário
    }

    const fazerLogin = async () => {
      isLoading.value = true
      try {
        await axios.put('http://localhost:5123/api-endpoint', {
          date: dateModel.value,
          time: timeModel.value,
          duration: duration.value
        })
        Notify.create({
          type: 'positive',
          message: 'Dados enviados com sucesso!'
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erro ao enviar dados'
        })
      } finally {
        isLoading.value = false
      }
    }

    return {
      dateModel,
      timeModel,
      duration,
      enviarDuracao,
      fazerLogin,
      isLoading
    }
  }
}
</script>

<style scoped>
h6 {
  color: #17a2b8;
  padding-top: 10px;
  font-size: 20px;
  text-align: center;
}

.primeira {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ebebeb;
  border-radius: 25px;
  width: 38%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}

.full-width {
  width: 100%;
  margin-bottom: 10px;
}

.larger-input {
  font-size: 15px;
  height: 50px;
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
</style>
