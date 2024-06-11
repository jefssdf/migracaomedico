<template>
  <div class="primeira">
    <q-page padding>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          v-model="nome"
          label="Nome"
          :rules="[
            (val) => !!val || 'O Nome do produto ou procedimento é obrigatório'
          ]"
        />
        <q-input
          v-model="descricao"
          label="Descrição"
          :rules="[
            (val) => !!val || 'A descrição é obrigatória'
          ]"
        />
        <q-input
          v-model.number="preco"
          label="Preço"
          type="number"
          prefix="R$"
          :rules="[
            (val) =>
              val >= 0 || 'O preço deve ser igual ou superior a zero'
          ]"
        />
        <q-input
          v-model.number="tempo"
          label="Tempo de procedimento (minutos)"
          type="number"
          prefix="Min"
          :rules="[
            (val) =>
              val > 0 || 'O tempo deve ser superior a zero'
          ]"
        />
        <q-btn flat color="secondary" type="submit" text-color="white" label="Cadastrar produto" class="custom-button" />
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
    const descricao = ref('')
    const preco = ref(0)
    const tempo = ref(0)
    const nome = ref('')
    const { notifyError, notifySuccess } = useNotify()

    // const router = useRouter()

    const onSubmit = async () => {
      if (!nome.value || !descricao.value || preco.value === null || tempo.value === null || tempo.value <= 0) {
        console.log('Por favor, preencha todos os campos antes de enviar o formulário')
        return
      }
      try {
        const response = await axios.post('https://6662e04562966e20ef0a6620.mockapi.io/produto', {
          name: nome.value,
          description: descricao.value,
          price: preco.value,
          time: tempo.value
        })

        $q.notify({
          type: 'positive',
          message: 'Cadastro realizado com sucesso!'
        })
        console.log('Procedimento cadastrado com sucesso!', response.data)
        onReset()
        setTimeout(() => {
          window.location.reload()
        }, 0)
      } catch (error) {
        console.error('Erro ao cadastrar procedimento:', error)
        $q.notify({
          type: 'negative',
          message: 'Ocorreu um erro ao registrar. Tente novamente.'
        })
      }
    }

    const onReset = () => {
      nome.value = ''
      descricao.value = ''
      preco.value = 0
      tempo.value = 0
    }

    return {
      descricao,
      preco,
      tempo,
      nome,
      onSubmit,
      onReset,
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
