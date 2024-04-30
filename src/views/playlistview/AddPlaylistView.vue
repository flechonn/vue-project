<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const newPlaylist = ref({
  nom: '',
  description: ''
})

const playlistAdded = ref(false)

async function addPlaylist() {
  try {
    const response = await fetch('http://localhost:4000/playlists/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlaylist.value)
    });

    if (!response.ok) {
      throw new Error('La requête n\'a pas abouti : ' + response.status);
    }

    console.log("Réponse de l'API :", await response.json());
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
  