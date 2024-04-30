<script setup>
import {onBeforeMount,ref} from "vue";
import { useRouter } from 'vue-router';
import MusiCard from './musicview/MusiCard.vue'
import Playlist from './playlistview/Playlist.vue'; // Importez votre composant Playlist
import { fetchData } from '../utils.js'

const likedTracks=ref(null)
const playlists=ref(null)
const router=useRouter();

const createPlaylist = () => {
  router.push(`addPlaylist`);
};

onBeforeMount(async () => {
  try {
    likedTracks.value = await fetchData('http://localhost:4000/api/liked/');
    playlists.value = await fetchData('http://localhost:4000/playlist/');
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message);
  }
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