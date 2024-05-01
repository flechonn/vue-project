<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postData } from '../../utils.js'


const router = useRouter();
const playlistAdded = ref(false)
const newPlaylist = ref({
  nom: '',
  description: ''
})

async function addPlaylist() {
  try {
    const response = await postData('http://localhost:4000/playlists/', newPlaylist.value);
    playlistAdded.value = true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la requête:', error);
  }
}
</script>

<template>
  <main>
    <h2>Ajouter une nouvelle playlist</h2>
    <div>
      <label for="nom">Nom:</label>
      <input type="text" id="nom" placeholder="Nom de la playlist" v-model="newPlaylist.nom" required>
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea id="description" placeholder="Description de la playlist" v-model="newPlaylist.description" required></textarea>
    </div>
    <button @click="addPlaylist">Ajouter la playlist</button>
    <div v-if="playlistAdded">Playlist ajoutée avec succès</div>
    <button @click="router.back()">Retour</button>
  </main>
</template>

<style scoped>

</style>
  