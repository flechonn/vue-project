<script setup>
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { fetchData,patchData,deleteData } from '../../utils.js'


const route = useRoute();
const router = useRouter();
const {idp} = route.params;

const filterdata =ref(null)
const data= ref(null);
const playlist =ref(null);
const laplaylist = ref(null);
const selectedMusique = ref(null);

function addMusiqueToPlaylist() {
  console.log(selectedMusique.value)
  if (selectedMusique.value !== null) {
    // Ajouter la musique sélectionnée à la liste des pistes
    laplaylist.value.tracks.push(selectedMusique.value);
    filteredData()
    // Effacer la sélection actuelle pour la prochaine sélection
    selectedMusique.value = null;
  } else {
    console.error("Aucune musique sélectionnée pour ajouter à la playlist");
  }
}

async function editPlaylist() {
  try {
    const response = await patchData(`http://localhost:4000/playlist/${idp}`, {
      name: laplaylist.value.name,
      description: laplaylist.value.description,
      tracks: laplaylist.value.tracks,
    });
    console.log("Modifications enregistrées :", laplaylist.value);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la requête:', error);
  }
}

function filteredData() {
  if (laplaylist.value && laplaylist.value.tracks) {
    filterdata.value = data.value.filter(musique => !laplaylist.value.tracks.some(track => track.id === musique.id));
  } else {
    filterdata.value = data.value;
  }
}

function delMusique(morceau) {
  const index = laplaylist.value.tracks.findIndex(track => track.id === morceau.id);
  if (index !== -1) {
    laplaylist.value.tracks.splice(index, 1);

    filteredData()
  } else {
    console.error("La musique sélectionnée n'a pas été trouvée dans la playlist.");
  }
}

onBeforeMount(async () => {
  try {
    playlist.value = await fetchData('http://localhost:4000/playlist/');
    data.value = await fetchData('http://localhost:4000/data/');
    const c = playlist.value.find(c => c.idp === parseInt(idp));
    laplaylist.value = c;
    filterdata.value = data.value.filter(musique => !laplaylist.value.tracks.some(track => track.id === musique.id));
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
      <div>
        <label for="name">name:</label>
        <input type="text" id="name" v-model="laplaylist.name" />
        <label for="description">description:</label>
        <input type="text" id="description" v-model="laplaylist.description" />
        <label for="tracks">Tracks:</label>
        <div v-for="morceau in laplaylist.tracks" :key="morceau.id">
          <p>- {{ morceau.titre }} <button @click="delMusique(morceau)">X</button> </p>
          
        </div>
        <div>
          <label for="data">Ajouter une musique à la playlist :</label>
          <select id="selectedMusique" v-model="selectedMusique">
            <option v-for="musique in filterdata" :key="musique.id" :value="musique">{{ musique.titre }}</option>
          </select>
          <button class="add-music-button" @click="addMusiqueToPlaylist">Ajouter la musique</button>        </div>
        <button type="submit" @click="editPlaylist">Enregistrer les modifications</button>
      </div>
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
    padding: 10px 15px;
    background-color:gray;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .add-music-button {
  background-color:cadetblue ; /* Changez la couleur selon votre préférence */
  color: white;
  height: 40px; 
}


  button:hover {
    background-color: #45a049;
  }
</style>
