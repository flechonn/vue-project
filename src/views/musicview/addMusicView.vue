<script setup>
import { ref, onMounted } from 'vue'

import {useRouter} from "vue-router";
import { postData } from '../../utils.js'


const router = useRouter();

const newMusic = ref({
  titre: '',
  auteur: '',
  duree: '',
  album: ''
})
const musicAdded=ref(false)

async function addMusic() {
  try {
    const response = await postData('http://localhost:4000/data/', newMusic.value);
    musicAdded.value = true; // Modification de la valeur de musicAdded
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la requête:', error);
  }
}

</script>


<template>
  <main>
    <h2>Ajouter une nouvelle musique</h2>
    <div>
      <label for="titre">Titre:</label>
      <input type="text" id="titre" placeholder="nom de la chanson" v-model="newMusic.titre" required>
    </div>
    <div>
      <label for="auteur">Auteur:</label>
      <input type="text" placeholder="nom de l'artiste" id="auteur" v-model="newMusic.auteur" required>
    </div>
    <div>
      <label for="duree">Durée:</label>
      <input type="text" placeholder="Durée du song" id="duree" v-model="newMusic.duree" required>
    </div>
    <div>
      <label for="album">Album:</label>
      <input type="text" placeholder="Entrer un album" id="album" v-model="newMusic.album" required>
    </div>
    <button @click="addMusic">AddMusic</button>
    <div v-if="musicAdded"> Music Add succed</div>
    <button @click="router.back()">Go back</button>
  </main>
</template>


<style scoped>

</style>

