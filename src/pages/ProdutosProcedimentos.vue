<template>
  <div class="primeira">
    <q-page padding>
      <q-form ref="form" @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input
          v-model="name"
          label="Nome"
          :rules="[
            (val) => !!val || 'O Nome do produto ou procedimento é obrigatório'
          ]"
        />
        <q-input
          v-model="description"
          label="Descrição"
          :rules="[
            (val) => !!val || 'A descrição é obrigatória'
          ]"
        />
        <q-input
          v-model.number="price"
          label="Preço"
          type="number"
          prefix="R$"
          :rules="[
            (val) => val >= 0 || 'O preço deve ser igual ou superior a zero'
          ]"
        />
        <q-input
          v-model.number="duration"
          label="Tempo de procedimento (minutos)"
          type="number"
          prefix="Min"
          :rules="[
            (val) => val > 0 || 'O tempo deve ser superior a zero'
          ]"
        />
        <q-btn
          flat
          color="secondary"
          type="submit"
          text-color="white"
          label="Cadastrar produto"
          class="custom-button"
        />
      </q-form>
    </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import useNotify from 'src/composables/UserNotify'

export default {
  setup () {
    const $q = useQuasar()
    const form = ref(null)
    const description = ref('')
    const price = ref(0)
    const duration = ref(0)
    const name = ref('')
    const legalEntityId = ref('C22F4F54-AE63-4D46-428B-08DC8CA6D443')
    const { notifyError, notifySuccess } = useNotify()

    const formatDuration = (minutes) => {
      const hours = Math.floor(minutes / 60).toString().padStart(2, '0')
      const mins = (minutes % 60).toString().padStart(2, '0')
      return `${hours}:${mins}:00`
    }

    const onSubmit = async () => {
      if (!name.value || !description.value || price.value === null || duration.value === null || duration.value <= 0) {
        console.log('Por favor, preencha todos os campos antes de enviar o formulário')
        return
      }
      try {
        const formattedDuration = formatDuration(duration.value)
        const response = await axios.post('http://localhost:5123/Service', {
          name: name.value,
          description: description.value,
          duration: formattedDuration,
          price: price.value,
          legalEntityId: legalEntityId.value
        })

        $q.notify({
          type: 'positive',
          message: 'Cadastro realizado com sucesso!'
        })
        console.log('Procedimento cadastrado com sucesso!', response.data)
        form.value.resetValidation()
        form.value.reset()
      } catch (error) {
        console.error('Erro ao cadastrar procedimento:', error)
        $q.notify({
          type: 'negative',
          message: 'Ocorreu um erro ao registrar. Tente novamente.'
        })
      }
    }

    return {
      description,
      price,
      duration,
      name,
      onSubmit,
      form,
      notifyError,
      notifySuccess
    }
  }
}
</script>

<style>
.primeira {
  display: block;
  justify-content: center;
  align-items: center;
  background: #ebebeb;
  border-radius: 25px;
  width: 90%;
  max-width: 600px;
  max-height: 500px; /* Aumentado para acomodar novos campos */
  margin: 10% auto;
  padding: 20px;
}

.custom-button {
  background-color: #26a69a;
  color: white;
  margin-top: 20px;
  width: 100%;
  height: 36px;
  border-radius: 30px;
  font-size: 15px;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .primeira {
    width: 100%;
    border-radius: 0;
    padding: 10px;
  }
}
</style>
