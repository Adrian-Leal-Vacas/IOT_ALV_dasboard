<script setup>
import { ref, defineProps } from 'vue'
import { updateData } from '@/firebase'
const referencia = 'IOT_ALV'
const props = defineProps(['idActivo', 'nombreSensor', 'estadoSensor'])
const checked = ref(props.estadoSensor)
//
const submitForm = () => {
  updateData(props.idActivo, referencia, {
    [props.nombreSensor]: checked.value
  })
}
</script>
<template>
  <form class="mb-5 text-base" @submit.prevent="submitForm">
    <label class="ml-2.5 text-base text-slate-700" for="checkbox">Activar</label>
    <input
      @change="submitForm"
      class="appearance-none w-5 h-5 border-2 border-white border-solid rounded outline-none cursor-pointer ml-1.5 transition checked:bg-green-600"
      v-model="checked"
      id="checkbox"
      type="checkbox"
      name="checkbox"
    />
  </form>
</template>
<style lang="scss" scoped></style>
