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
        <q-icon name="access_time" class="cursor-pointer"></q-icon>
      </template>
    </q-input>
    <q-input filled
    v-model="duration"
    class="full-width larger-input"
    label="Tempo de indisponibilidade (minutos)"
    >
      <template v-slot:prepend>
        <q-icon name="access_time" class="cursor-pointer"> </q-icon>
      </template> </q-input>

    <q-btn flat color="secondary" label="Confirmar" type="button" @click="fazerLogin" text-color="white" />

    <q-input filled v-model="dateModel" class="full-width larger-input" disable>
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer"> </q-icon>
      </template>
    </q-input>
    <q-input filled v-model="timeModel" class="full-width larger-input" disable>
      <template v-slot:prepend>
        <q-icon name="access_time" class="cursor-pointer">
        </q-icon>
      </template>
    </q-input>
    <q-btn flat color="secondary" label="Bloquear" type="button" @click="Enviardados" text-color="white" />
  </div>

</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

export default {
  setup () {
    const dateModel = ref('2024-06-29')
    const timeModel = ref('13:00')
    const duration = ref('')
    const isLoading = ref(false)

    const fetchData = async () => {
      isLoading.value = true
      try {
        const response = await axios.get('http://localhost:5123/Schedule/blockService')
        const blockService = response.data.blockService
        duration.value = blockService.duration
      } catch (error) {
        console.error('Error fetching data:', error)
        Notify.create({
          type: 'negative',
          message: 'Erro ao buscar dados'
        })
      } finally {
        isLoading.value = false
      }
    }

    const fazerLogin = async () => {
      isLoading.value = true
      try {
        const payload = {
          serviceId: 'c778237a-fb23-4796-cfe1-08dc92c54b83',
          name: 'Bloqueio',
          description: 'Serviço criado para ser utilizado como bloqueio de agenda.',
          duration: duration.value,
          price: 10,
          legalEntityId: '5c22573d-b203-4f82-663c-08dc92c54b41'
        }
        await axios.put('http://localhost:5123/Service/c778237a-fb23-4796-cfe1-08dc92c54b83', payload)
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
    const Enviardados = async () => {
      isLoading.value = true
      try {
        const desiredTimeZoneOffset = +3 * 60 * 60 * 1000 // Offset for 3 hours in milliseconds (adjust as needed)
        const schedulingDate = new Date(`${dateModel.value}T${timeModel.value}`)
        schedulingDate.setTime(schedulingDate.getTime() - desiredTimeZoneOffset)

        const payload = {
          schedulingDate,
          naturalPersonId: '63dcd949-3a93-4a71-7618-08dc92e580e3',
          legalEntityId: '5c22573d-b203-4f82-663c-08dc92c54b41',
          serviceId: 'c778237a-fb23-4796-cfe1-08dc92c54b83'
        }
        await axios.post('http://localhost:5123/Scheduling', payload)
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

    onMounted(() => {
      fetchData()
    })

    return {
      dateModel,
      timeModel,
      duration,
      fazerLogin,
      isLoading,
      Enviardados
    }
  }
}
</script>

<style scoped>
h6 {
  color: #17a2b8;
  font-size: 25px;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px ;
}

.primeira {
  display: block;
  justify-content: center;
  align-items: center;
  background: #ebebeb;
  border-radius: 25px;
  width: 80%;
  max-width: 600px;
  max-height: 1%;
  margin: 5% auto;
  padding: 20px;

}
.q-btn{
  margin-bottom: 20px;
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
