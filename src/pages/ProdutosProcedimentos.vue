<template>
  <div class="primeira">
    <q-page padding>
      <q-form ref="form" @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input
          v-model="name"
          label="Nome"
          :rules="[(val) => !!val || 'O Nome do produto ou procedimento é obrigatório']"
        />
        <q-input
          v-model="description"
          label="Descrição"
          :rules="[(val) => !!val || 'A descrição é obrigatória']"
        />
        <q-input
          v-model.number="price"
          label="Preço"
          type="number"
          prefix="R$"
          :rules="[(val) => val >= 0 || 'O preço deve ser igual ou superior a zero']"
        />
        <q-input
          v-model="duration"
          label="Tempo de procedimento (minutos)"
          type="text"
          :rules="[(val) => val.length === 8 || 'O formato da duração é HH:MM:SS']"
        />
        <q-btn
          flat
          color="secondary"
          type="submit"
          text-color="white"
          label="Cadastrar produto"
          class="custom-button"
          :loading="loading"
        >
          <q-spinner-hourglass v-if="loading" color="white" />
        </q-btn>
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
    const duration = ref('00:30:00')
    const name = ref('')
    const legalEntityId = ref('5c22573d-b203-4f82-663c-08dc92c54b41')
    const { notifyError, notifySuccess } = useNotify()
    const loading = ref(false)

    const carregarProdutos = async () => {
      // Função para carregar produtos aqui
    }

    const onSubmit = async () => {
      if (!name.value || !description.value || price.value === null || duration.value === null) {
        console.log('Por favor, preencha todos os campos antes de enviar o formulário')
        return
      }

      loading.value = true // Ativar o loading

      try {
        const response = await axios.post('http://localhost:5123/Service', {
          name: name.value,
          description: description.value,
          duration: duration.value,
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
        await carregarProdutos() // Recarrega os produtos após cadastrar

        // Aguarda 2000 ms (2 segundos) antes de recarregar a página
        setTimeout(() => {
          window.location.reload()
        }, 1300)
      } catch (error) {
        console.error('Erro ao cadastrar procedimento:', error)
        $q.notify({
          type: 'negative',
          message: 'Ocorreu um erro ao registrar. Tente novamente.'
        })
      } finally {
        loading.value = false // Desativar o loading, independentemente do resultado
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
      notifySuccess,
      loading
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
  max-height: 500px;
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
