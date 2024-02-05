<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { updateData } from '@/firebase'
const referencia = 'IOT_ALV'
const props = defineProps(['idActivo', 'mostrarAgregarEjecutor'])
const emits = defineEmits(['cancelarClick'])
const ejecutor = ref('')
// Función que cuando le das a guardar realiza los cambios y lo actualiza en firebase
const submitForm = () => {
  updateData(props.idActivo, referencia, {
    [`Ejecutor ${ejecutor.value}`]: false
  })
  ejecutor.value = ''
  emits('cancelarClick')
}
// Ocultar el formulario
const enviarCancelarClick = () => {
  if (props.mostrarAgregarEjecutor) {
    ejecutor.value = ''
    emits('cancelarClick')
  }
}
</script>
<template>
  <form class="mb-5 text-base" v-if="mostrarAgregarEjecutor" @submit.prevent="submitForm">
    <label for="ejecutor">Nombre del ejecutor</label>
    <input class="text-black" type="text" v-model="ejecutor" name="ejecutor" />
    <button class="m-1.5 p-1" type="submit">Agregar</button>
    <button class="m-1.5 p-1" type="button" @click="enviarCancelarClick">Cancelar</button>
  </form>
</template>
<style lang="scss" scoped></style>
