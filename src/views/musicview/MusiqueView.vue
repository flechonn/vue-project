<script setup>
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount,onMounted,ref} from "vue";
import { fetchData,postData,deleteData } from '../../utils.js'

const route = useRoute();
const router = useRouter();
const {id} = route.params;

const likedTracks=ref(null);
const data=ref(null)
const playlists = ref(null);
const musique = ref(null);
const selectedPlaylist = ref(null);
const isChecked = ref(false); 

async function addLiked() {
  try {
    await postData(`http://localhost:4000/liked/${id}`, musique.value);
  } catch (error) {
    console.error(error.message);
  }
}

async function delLiked() {
  try {
    await deleteData(`http://localhost:4000/liked/${id}`);
  } catch (error) {
    console.error(error.message);
  }
}

function isLike(){
  if (likedTracks.value.some(track => track.id === musique.value.id)) {
    isChecked.value = true;
  }
}

async function toggleLike() {
  if (isChecked.value) {
    addLiked()
  } else {
    delLiked()
  }
}

function EditMusic(){
  router.push(`/edit-musique/${id}`);
}



async function addToPlaylist() {
    try {
      await postData(`http://localhost:4000/playlist/${selectedPlaylist.value}`,musique.value)
    } catch (error) {
        console.error(error.message);
    }
}


onBeforeMount(async () => {
  try {
    likedTracks.value = await fetchData('http://localhost:4000/api/liked/');
    data.value = await fetchData('http://localhost:4000/api/data/');
    playlists.value = await fetchData('http://localhost:4000/playlist/');
    
    const c = data.value.find(c => c.id === parseInt(id));
    musique.value = c;
    isLike();
  } catch (error) {
    console.error(error.message);
  }
});
</script>

<template>
    <div class="container">
        <div class="contan" v-if="musique">
            <h1>La musique</h1>
            <p>Auteur :{{ musique.auteur }}</p>
            <p>Titre :{{ musique.titre }}</p>
            <p>Durée :{{ musique.duree }}</p>
            <p>Album :{{ musique.album }}</p>
        </div>
        <div v-else>
            <h1>musique inconnu</h1>
        </div>
        <button @click="EditMusic()">EditMusic</button>
        <div>
            <input type="checkbox" id="heartCheckbox" v-model="isChecked" @change="toggleLike" />
            <label for="heartCheckbox" class="heart-label">
                <span v-if="isChecked" class="heart">❤️</span>
                <span v-else class="circle"></span>
            </label>
        </div>
        <div>
            <label for="playlistSelect">Ajouter à la playlist :</label>
            <select id="playlistSelect" v-model="selectedPlaylist">
                <option v-for="playlist in playlists" :key="playlist.id" :value="playlist.id">{{ playlist.name }}</option>
            </select>
            <button @click="addToPlaylist">Ajouter à la playlist</button>
        </div>
        <button @click="router.back()">Go back</button>
    </div>
</template>

<style scoped>
.contan {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.207);
  padding: 15px;
  width:auto;
  margin-right: 15px;
  cursor: pointer;
  margin-bottom: 20px;
}

.heart-label {
  cursor: pointer;
}

.heart {
  font-size: 24px; 
}

.circle {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #000; 
  border-radius: 50%; 
}

/* Style de la case à cocher */
#heartCheckbox {
  display: none; 
}
</style>