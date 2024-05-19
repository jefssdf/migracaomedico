<template>
  <div class="primeira">
    <q-page padding>
      <q-form @submit="onSubmit">
        <q-input v-model="descrição" label="Descrição" />
        <q-input v-model="codigo" label="Codigo" />
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
      </q-form>
      <q-btn flat color="secondary" type="submit" text-color="white" label="Cadastrar produto" class="custom-button" />
    </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const descrição = ref('')
    const codigo = ref('')
    const preço = ref(false)

    return {
      descrição,
      codigo,
      preço
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
  max-height: 300px;
  margin: 10% auto;
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
