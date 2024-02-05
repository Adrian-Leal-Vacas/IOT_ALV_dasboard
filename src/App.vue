<script setup>
import formCreateNewRoom from './components/formCreateNewRoom.vue'
import lookCollection from './components/lookCollection.vue'
import { ref } from 'vue'
const componenteActual = ref(null)
// Función de simular el SPA ocultando o mostrando diferentes componentes
const mostrarComponente = (nombreComponente) => {
  componenteActual.value = nombreComponente
}
</script>
<template>
  <div class="w-auto m-2.5">
    <nav class="bg-blue-500 text-white p-2.5 w-full flex justify-between items-center">
      <p id="logo" class="no-underline text-white font-bold text-3xl">
        IOT_ALV <span class="text-base">dashboard</span>
      </p>
      <div class="flex justify-center items-center m-auto">
        <a
          class="no-underline text-white mx-5 font-bold text-xl hover:text-sky-800"
          @click="mostrarComponente('formCreateNewRoom')"
          >Crear nuevo espacio</a
        >
        <a
          class="no-underline text-white mx-5 font-bold text-xl hover:text-sky-800"
          @click="mostrarComponente('lookCollection')"
          >Ver todos los espacios</a
        >
      </div>
    </nav>
    <div class="w-auto m-2.5">
      <formCreateNewRoom v-if="componenteActual === 'formCreateNewRoom'" />
      <lookCollection v-if="componenteActual === 'lookCollection'" />
    </div>
    <footer class="bg-blue-500 text-white p-2.5 flex justify-center items-center">
      <p>
        &copy; 2024 IOT_ALV Realizado por
        <a
          class="font-bold text-rose-800 hover:text-sky-900"
          href="https://adrian-leal-vacas.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          >Adrián Leal Vacas</a
        >
      </p>
    </footer>
  </div>
</template>
<style scoped></style>
