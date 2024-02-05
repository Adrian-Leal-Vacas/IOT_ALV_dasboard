<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { updateData } from '@/firebase'
const referencia = 'IOT_ALV'
const props = defineProps(['idActivo', 'mostrarFormularioSensor'])
const emits = defineEmits(['cancelarClick'])
const sensor = ref('')
// Función que cuando le das a guardar realiza los cambios y lo actualiza en firebase
const submitForm = () => {
  updateData(props.idActivo, referencia, {
    [`Sensor ${sensor.value}`]: ''
  })
  sensor.value = ''
  emits('cancelarClick')
}
// Ocultar el formulario
const enviarCancelarClick = () => {
  if (props.mostrarFormularioSensor) {
    sensor.value = ''
    emits('cancelarClick')
  }
}
</script>
<template>
  <form class="mb-5 text-base" v-if="mostrarFormularioSensor" @submit.prevent="submitForm">
    <label for="sensor">Nombre del sensor</label>
    <input class="text-black" type="text" v-model="sensor" name="sensor" />
    <button class="m-1.5 p-1" type="submit">Agregar</button>
    <button class="m-1.5 p-1" type="button" @click="enviarCancelarClick">Cancelar</button>
  </form>
</template>
<style lang="scss" scoped></style>
