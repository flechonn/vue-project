<script setup>
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount,onMounted,ref} from "vue";
import MusiCard from '../musicview/MusiCard.vue'
import { fetchData } from '../../utils.js'


const route = useRoute();
const router = useRouter();
const {idp} = route.params;

const playlist =ref(null);
const laplaylist = ref(null);


function EditPlaylist(){
  router.push(`/edit-playlist/${idp}`);
}

onBeforeMount(async () => {
  try {
    playlist.value = await fetchData('http://localhost:4000/playlist/');
    
    const c = playlist.value.find(c => c.idp ===parseInt(idp));
    laplaylist.value = c
  } catch (error) {
    console.error(error.message);
  }
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
    <button @click="EditPlaylist()">EditPlaylist</button>
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