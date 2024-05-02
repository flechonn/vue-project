<script setup>
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { fetchData,patchData,deleteData } from '../../utils.js'


const route = useRoute();
const router = useRouter();
const {idp} = route.params;

const playlist =ref(null);
const laplaylist = ref(null);

async function editPlaylist() {
  try {
    const response = await patchData(`http://localhost:4000/playlist/${idp}`, {
      name: laplaylist.value.name,
      description: laplaylist.value.description,
      // tracks: laplaylist.value.tracks,
    });
    console.log("Modifications enregistrées :", laplaylist.value);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la requête:', error);
  }
}

onBeforeMount(async () => {
  try {
    playlist.value = await fetchData('http://localhost:4000/playlist/');
    const c = playlist.value.find(c => c.idp === parseInt(idp));
    laplaylist.value = c;
  } catch (error) {
    console.error(error.message);
  }
});

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
