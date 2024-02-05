// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js'
// TODO: Add SDKs for Firebase products that you want to use
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js'
// Your web app's Firebase configuration
const firebaseConfig = {
  //Aquí añadimos los datos de API que nos ha asignado FireBase
  apiKey: 'AIzaSyAIeYJXYaRuqteR9HRqLk_tnAeyPmi_I1Y',
  authDomain: 'proyectodaw-9caa8.firebaseapp.com',
  projectId: 'proyectodaw-9caa8',
  storageBucket: 'proyectodaw-9caa8.appspot.com',
  messagingSenderId: '228410884910',
  appId: '1:228410884910:web:285b299a825178002f30bf',
  measurementId: 'G-7FS6XGK617'
}
//Conectamos con la base de datos
initializeApp(firebaseConfig)
const db = getFirestore()
//CRUD
// Comprueba si el id ya existe
export const checkIfIdExists = async (ref, documentId) => {
  const docRef = doc(db, ref, documentId)
  try {
    // Verifica si el documento con el ID especificado ya existe
    const documentSnapshot = await getDoc(docRef)
    return documentSnapshot.exists()
  } catch (error) {
    // Manejo de errores: muestra un mensaje en la consola en caso de error
    console.error('Error al verificar la existencia del documento:', error.message)
    throw error
  }
}
// Para guardar un documento con un id en especifico
export const saveData = async (ref, documentId, objeto) => {
  const docRef = doc(db, ref, documentId)
  try {
    // Guarda los datos en el documento con el ID especificado
    await setDoc(docRef, objeto)
  } catch (error) {
    console.error('Error al guardar el documento:', error.message)
    throw error
  }
}
// Para eliminar un campo
export const deleteField = (documentId, ref, fieldName) => {
  const docRef = doc(db, ref, documentId)
  return getDoc(docRef)
    .then((documentSnapshot) => {
      if (documentSnapshot.exists()) {
        const updatedData = { ...documentSnapshot.data() }
        delete updatedData[fieldName]
        // Actualiza el documento sin el campo especificado
        return setDoc(docRef, updatedData)
      } else {
        console.error('El documento no existe')
        throw new Error('El documento no existe')
      }
    })
    .catch((error) => {
      console.error('Error al eliminar el campo:', error.message)
      throw error
    })
}
export const getDataCollection = (ref) => getDocs(collection(db, ref))
export const getDataChanged_collection = (ref, callBack) =>
  onSnapshot(collection(db, ref), callBack)
export const getDataChanged_document = (ref, document, callBack) =>
  onSnapshot(doc(db, ref, document), callBack)
export const deleteData = (id, ref) => deleteDoc(doc(db, ref, id))
export const getData = (id, ref) => getDoc(doc(db, ref, id))
export const updateData = (id, ref, objeto) => updateDoc(doc(db, ref, id), objeto)
