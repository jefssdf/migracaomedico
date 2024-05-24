<template>

  <div class="primeira">

      <form class="form">

        <h2 style="font-weight: bold;">Logar</h2>

          <label>
              <span> Login</span>
              <q-input rounded outlined v-model="text" label="Digite seu Email" />
           </label>

            <label>
              <span> Senha</span>
              <q-input rounded outlined v-model="text" label="Digite sua Senha" />
           </label>
           <q-btn color="secondary" label="Logar" />

      </form>
  </div>
</template>

<script>

</script>

<style scoped>

  .primeira {

      display: block;
      background: #ebebeb;
      /* box-shadow: 0 5px 5px black, 0 15px 12px rgba(0, 0, 0, 0.22); */
      border-radius: 25px;
      width: 40%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  input, button{
      border:none;
      outline: none;
      background: none;
  }

  h2 {
      color: #17a2b8;
      padding-top: 10px;
      font-size: 30px;
      text-align: center;
  }

  .form{

      padding: 50px 30px;
      -webkit-transition:-webkit-transform 1.2s ease-in-out;
      transition: -webkit-transform 1.2s ease-in-out;
      transition: transform 1.2s ease-in-out;
      transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
  }

  label{
      display: block;
      width: 260px;
      margin: 15px auto 0;
  }

  label span{
      font-size: 14px;
      font-weight: 600;
      color: #17a2b8;
      text-transform: uppercase;
  }

  input{
      display: block;
      width: 100%;
      margin-top: 5px;
      font-size: 16px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(109, 93, 93, 0.4);
      text-align: center;
      font-family: 'Nunito', sans-serif;
  }

  button{
      display: block;
      margin: 20px  auto;

      width: 260px;
      height: 36px;
      border-radius: 30px;
      background-color: rgb(13, 148, 31);
      color: white;
      font-size: 15px;
      cursor: pointer;
  }

  button:hover {
      background-color: rgb(43, 233, 91);
  }
</style>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      model: ref(null)
    }
  }
}
</script>
