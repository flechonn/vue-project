<script setup>
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";
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

async function editPlaylist() {
    console.log("test editPlaylist");
    try {
      const response = await fetch(`http://localhost:4000/playlist/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: laplaylist.value.name,
          description: laplaylist.value.description,
        //   tracks: laplaylist.value.tracks,
        })
      });
      if (!response.ok) {
        throw new Error('La requête n\'a pas abouti : ' + response.status);
      }
      console.log("Requête réussie!");
      console.log("Modifications enregistrées :", laplaylist.value);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la requête:', error);
    }
}
</script>

<template>
  <div class="container">
    <!-- Affichage des détails de la musique -->
    <div class="contan" v-if="laplaylist">
      <h1>La playlist</h1>
      <!-- Formulaire pour éditer les informations de la musique -->
      <form @submit.prevent="editPlaylist">
        <label for="name">name:</label>
        <input type="text" id="name" v-model="laplaylist.name" />
        <label for="description">description:</label>
        <input type="text" id="description" v-model="laplaylist.description" />
        <!-- <label for="tracks">tracks:</label>
        <input type="text" id="tracks" v-model="laplaylist.tracks" /> -->
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
    <div v-else>
      <h1>Playlist inconnue</h1>
    </div>
    <button @click="router.back()">go back</button>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 20px;
  }

  .contan {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.207);
    padding: 15px;
    width: auto;
    margin-right: 15px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  form {
    margin-top: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="text"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>
