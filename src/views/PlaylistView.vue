<script setup>
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount,onMounted,ref} from "vue";
import MusiCard from './MusiCard.vue'


const route = useRoute();
const router = useRouter();
const {id} = route.params;

const playlist =ref(null);
const laplaylist = ref(null);

async function loadplaylist(){
  try {
    const response = await fetch('http://localhost:4000/playlist/') // L'URL '/data' correspond à votre route Express pour récupérer les données
    if (response.ok) {
      playlist.value = await response.json(); // Parser le texte en JSON
      const c = playlist.value.find(c => c.id ===parseInt(id));
      laplaylist.value = c
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}

onBeforeMount(async () => {
    loadplaylist()
});
</script>

<template>
    <div class="playlist" v-if="laplaylist">
      <h3>{{ laplaylist.name }}</h3>
      <p>{{ laplaylist.description }}</p>
    </div>
      <div class="flex-container" v-if="laplaylist">
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