<template>
  <div class="primeira">
    <q-page padding>
      <q-form @submit="onSubmit">
        <q-input
          v-model="descrição"
          label="Descrição"
          :rules="[
            (val) => !!val || 'A descrição é obrigatória'
          ]"
        />
        <q-input
          v-model.number="preço"
          label="Preço"
          type="number"
          prefix="R$"
          :rules="[
            (val) =>
              val >= 0 || 'O preço de custo deve ser igual ou superior a zero',
          ]"
        />
        <q-select
          v-model="categoria"
          label="Categoria"
          :options="categoriaOptions"
          emit-value
          map-options
          :rules="[
            (val) => !!val || 'A categoria é obrigatória'
          ]"
        />
        <q-input
          v-model.number="tempo"
          label="Tempo de procedimento (minutos)"
          type="number"
          prefix="Min"
          :rules="[
            (val) =>
              val > 0 || 'O tempo deve ser superior a zero',
          ]"
        />
        <q-btn flat color="secondary" type="submit" text-color="white" label="Cadastrar produto" class="custom-button" />
      </q-form>
    </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const descrição = ref('')
    const codigo = ref('')
    const preço = ref(0)
    const categoria = ref('')
    const tempo = ref(0)
    const categoriaOptions = [
      { label: 'Saúde', value: 'saude' },
      { label: 'Estética', value: 'estetica' },
      { label: 'Lazer', value: 'lazer' }
    ]

    const onSubmit = () => {
      // Lógica de submissão do formulário
    }

    return {
      descrição,
      codigo,
      preço,
      categoria,
      tempo,
      categoriaOptions,
      onSubmit
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
  max-height: 450px; /* Aumentado para acomodar novos campos */
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
