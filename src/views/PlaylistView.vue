<script setup>
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount,onMounted,ref} from "vue";
import playlists from '../playlist.json'
import MusiCard from './MusiCard.vue'


const route = useRoute();
const router = useRouter();
const {id} = route.params;

const laplaylist =ref(null);

const likedTracks=ref(null);
const data=ref(null)
const musique = ref(null);
const isChecked = ref(false); 

async function loadliked(){
  try {
    const response = await fetch('http://localhost:4000/api/liked/')
    if (response.ok) {
      likedTracks.value = await response.json(); // Parser le texte en JSON
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}

async function loaddata(){
  try {
    const response = await fetch('http://localhost:4000/api/data/') 
    if (response.ok) {
      // console.log(response.json())
      data.value = await response.json(); // Parser le texte en JSON
      const c = data.value.find(c => c.id ===parseInt(id));
      musique.value = c
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}


onBeforeMount(async () => {
    loadliked()
    loaddata()
    const c = playlists.find(c => c.id ==id);
    laplaylist.value = c;
});
</script>

<template>
    <div class="playlist">
      <h3>{{ laplaylist.name }}</h3>
      <p>{{ laplaylist.description }}</p>
    </div>
      <div class="flex-container" v-if="likedTracks">
        <MusiCard v-for="track in laplaylist.tracks" :key="track.id" :musique="track"/>
      </div>
    <button @click="router.back()">Go back</button>
</template>
  
<style scoped>
.playlist {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.playlist h3 {
  margin-top: 0;
}

.playlist ul {
  list-style-type: none;
  padding: 0;
}

.playlist li {
  margin-bottom: 5px;
}

.flex-container {
  display: flex;
  flex-direction: row; /* Pour afficher en ligne */
  }
</style>