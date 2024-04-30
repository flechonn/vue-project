<script setup>
import {onBeforeMount,ref} from "vue";
import MusiCard from './MusiCard.vue'
import Playlist from './Playlist.vue'; // Importez votre composant Playlist

const likedTracks=ref(null)
const playlists=ref(null)

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

async function loadplaylist(){
  try {
    const response = await fetch('http://localhost:4000/playlist/') // L'URL '/data' correspond à votre route Express pour récupérer les données
    if (response.ok) {
      playlists.value = await response.json(); // Parser le texte en JSON
      
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}

const createPlaylist = () => {
  const lastId = playlists.value.length > 0 ? playlists.value[playlists.value.length - 1].id : 0;
  
  const newPlaylist = {
    idplaylist: lastId + 1,
    name: null,
    description: null,
    tracks: []
  };

  playlists.value.push(newPlaylist);
};

onBeforeMount(async () => {
  loadliked()
  loadplaylist()
})
</script>

<template>
  <div class="container">
    <h1>Account</h1>
    <p>User :</p>
    <p>Email :</p>
    <h2>Playlists:</h2>
    <div class="flex-container" v-if="playlists">
      <Playlist v-for="playlist in playlists" :key="playlist.id" :playlist="playlist" />
    </div>
    <button @click="createPlaylist">Create Playlist</button>
    <h2>Music liked</h2>
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