<script setup>
// Para poder hacer objetos reactivos
import { ref } from 'vue'
import { getDataChanged_collection, deleteData, deleteField } from '@/firebase'
import AgregarSensor from '@/components/AgregarSensor.vue'
import FormularioEjecutor from '@/components/FormularioEjecutor.vue'
import AgregarEjecutor from '@/components/AgregarEjecutor.vue'
const referencia = 'IOT_ALV'
const cambios = ref([])
const mostrarFormularioSensor = ref(false)
const mostrarAgregarEjecutor = ref(false)
let idActivo = ''
const sensor = ref('')
const datoMedido = ref('')
const ejecutor = ref('')
// oculta el formulario del sensor
const ocultarFormularioSensor = () => {
  mostrarFormularioSensor.value = false
}
// oculta el formulario del ejecutor
const ocultarmostrarAgregarEjecutor = () => {
  mostrarAgregarEjecutor.value = false
}
// Eliminar documento
const eliminar = (id) => {
  deleteData(id, referencia)
}
// elimina un componente
const eliminarComponente = (key, id) => {
  deleteField(id, referencia, key)
}
// añade un sensor
const addSensor = (id) => {
  idActivo = id
  sensor.value = ''
  datoMedido.value = ''
  mostrarFormularioSensor.value = true
  mostrarAgregarEjecutor.value = false
}
// añade un ejecutor
const addEjecutor = (id) => {
  idActivo = id
  ejecutor.value = ''
  mostrarAgregarEjecutor.value = true
  mostrarFormularioSensor.value = false
}
// Para imprimir la colección
getDataChanged_collection(referencia, (querySnapshot) => {
  cambios.value = []
  querySnapshot.forEach((doc) => {
    cambios.value.push({ id: doc.id, datos: doc.data() })
  })
})
// URL para la 2 aplicación
const panel2 = () => window.open('https://adrian-leal-vacas.github.io/IOT_ALV_2panel', '_blank')
// Verificar si es ejecutor
function verificarNombreParcial(nombreParcial, nombre) {
  const palabras = nombre.split(' ')
  if (palabras.length > 0 && palabras[0] === 'Ejecutor' && nombre.includes(nombreParcial)) {
    return true
  }
  return false
}
</script>
<template>
  <ul>
    <li
      class="border border-black border-solid bg-blue-500 text-white font-bold text-lg m-2.5 p-1 text-center"
      v-for="(cambio, index) in cambios"
      :key="index"
      :id="cambio.id"
    >
      <p @click="panel2()">
        Espacio: <span class="text-rose-800">{{ cambio.id }}</span>
      </p>
      <ul>
        <li
          class="border border-black border-solid bg-blue-500 text-white font-bold text-lg m-2.5 p-1 text-center"
          v-for="(value, key) in cambio.datos"
          :key="key"
        >
          {{ key }}: {{ value }}
          <button class="m-1.5 bg-sky-900 p-1" @click.stop="eliminarComponente(key, cambio.id)">
            Eliminar componente
          </button>
          <FormularioEjecutor
            v-if="verificarNombreParcial('Ejecutor', key)"
            :idActivo="cambio.id"
            :nombre-sensor="key"
            :estado-sensor="value"
          />
        </li>
      </ul>
      <button class="m-1.5 bg-sky-900 p-1" @click.stop="eliminar(cambio.id)">
        Eliminar espacio
      </button>
      <button class="m-1.5 bg-sky-900 p-1" @click.stop="addSensor(cambio.id)">Añadir sensor</button>
      <button class="m-1.5 bg-sky-900 p-1" @click.stop="addEjecutor(cambio.id)">
        Añadir ejecutor
      </button>
      <AgregarEjecutor
        :idActivo="idActivo"
        :mostrarAgregarEjecutor="mostrarAgregarEjecutor"
        @cancelarClick="ocultarmostrarAgregarEjecutor"
      />
      <AgregarSensor
        :idActivo="idActivo"
        :mostrarFormularioSensor="mostrarFormularioSensor"
        @cancelarClick="ocultarFormularioSensor"
      />
    </li>
  </ul>
</template>
<style scoped></style>
