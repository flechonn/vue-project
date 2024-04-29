<script setup>
import { ref, onMounted } from 'vue'

import {useRouter} from "vue-router";

const router = useRouter();

async function loaddata(){
  try {
    const response = await fetch('http://localhost:4000/api/data') // L'URL '/data' correspond à votre route Express pour récupérer les données
    if (response.ok) {
      data.value = await response.json(); // Parser le texte en JSON
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}


onMounted(async () => {
  console.log("teste")
})

async function addMusic() {
  try {
    console.log('Nouvelle musique:', newMusic.value)
    const response = await fetch('http://localhost:4000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMusic.value)
    });
    
    if (response.ok) {
      // Recharger les données après l'ajout réussi
      await loaddata();
      console.log("Musique ajoutée avec succès");
    } else {
      console.error('Erreur lors de l\'ajout de la musique:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la musique:', error);
  }
}

const newMusic = ref({
  titre: '',
  auteur: '',
  duree: '',
  album: ''
})



</script>


<template>
  <main>
    <h2>Ajouter une nouvelle musique</h2>
    <div>
      <label for="titre">Titre:</label>
      <input type="text" id="titre" v-model="newMusic.titre" required>
    </div>
    <div>
      <label for="auteur">Auteur:</label>
      <input type="text" id="auteur" v-model="newMusic.auteur" required>
    </div>
    <div>
      <label for="duree">Durée:</label>
      <input type="text" id="duree" v-model="newMusic.duree" required>
    </div>
    <div>
      <label for="album">Album:</label>
      <input type="text" id="album" v-model="newMusic.album" required>
    </div>
    <button @click="addMusic">AddMusic</button>
    <button @click="router.back()">Go back</button>
  </main>
</template>


<style scoped>

</style>

