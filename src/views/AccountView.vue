<script setup>
import {onBeforeMount,ref} from "vue";
import MusiCard from './MusiCard.vue'


const likedTracks=ref(null)

async function loadliked(){
  try {
    const response = await fetch('http://localhost:4000/api/liked/') // L'URL '/data' correspond à votre route Express pour récupérer les données
    if (response.ok) {
      likedTracks.value = await response.json(); // Parser le texte en JSON
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}


onBeforeMount(async () => {
  loadliked()
})


</script>

<template>
  <div class="container">
    <h1>Account</h1>
    <p>User :</p>
    <p>Email :</p>
    <p>Playlist:</p>
    <h1>Music liked</h1>
    <div class="flex-container" v-if="likedTracks">
      <MusiCard v-for="musique in likedTracks" :key="musique.id" :musique="musique" />
    </div>
  </div>
</template>
  
  <style>

  .flex-container {
  display: flex;
  flex-direction: row; /* Pour afficher en ligne */
  }
  </style>