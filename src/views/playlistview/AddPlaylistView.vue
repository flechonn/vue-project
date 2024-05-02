<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from 'vue-router'
import { postData,fetchData } from '../../utils.js'


const router = useRouter();
const playlistAdded = ref(false);
const data= ref(null);
const selectedMusique = ref(null);

const name = ref('')
const description = ref('')
const tracks = ref([])

function addMusiqueToPlaylist() {
  console.log(selectedMusique.value)
  if (selectedMusique.value !== null) {
    // Ajouter la musique sélectionnée à la liste des pistes
    tracks.value.push(selectedMusique.value);
    // Effacer la sélection actuelle pour la prochaine sélection
    selectedMusique.value = null;
  } else {
    console.error("Aucune musique sélectionnée pour ajouter à la playlist");
  }
}

async function addPlaylist() {
  try {
    const newPlaylist = {
      name: name.value,
      description: description.value,
      tracks: tracks.value
    };
    console.log(newPlaylist)
    const response = await postData('http://localhost:4000/playlist/', newPlaylist);
    playlistAdded.value = true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la requête:', error);
  }
}


onBeforeMount(async () => {
    try {
    data.value = await fetchData('http://localhost:4000/data/');
  } catch (error) {
    console.error(error.message);
  }
  })

</script>

<template>
  <main>
    <h2>Ajouter une nouvelle playlist</h2>
    <div>
      <label for="nom">Nom:</label>
      <input type="text" id="name" placeholder="Nom de la playlist" v-model="name" required>
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea id="description" placeholder="Description de la playlist" v-model="description" required></textarea>
    </div>
    <div v-if="tracks.length > 0">
      <h3>Musiques dans la playlist :</h3>
      <ul>
        <li v-for="track in tracks" :key="track.id">{{ track.titre }}</li>
      </ul>
    </div>
    <div>
      <label for="data">Ajouter une musique à la playlist :</label>
      <select id="selectedMusique" v-model="selectedMusique">
        <option v-for="musique in data" :key="musique.id" :value="musique">{{ musique.titre }}</option>
      </select>
      <button @click="addMusiqueToPlaylist">Ajouter à la musique</button>
  </div>
    <button @click="addPlaylist">Ajouter la playlist</button>
    <div v-if="playlistAdded">Playlist ajoutée avec succès</div>
    <button @click="router.back()">Retour</button>
  </main>
</template>

<style scoped>

</style>
  