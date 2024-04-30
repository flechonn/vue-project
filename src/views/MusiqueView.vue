<script setup>
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount,onMounted,ref} from "vue";

const route = useRoute();
const router = useRouter();
const {id} = route.params;

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
      data.value = await response.json(); // Parser le texte en JSON
      const c = data.value.find(c => c.id ===parseInt(id));
      musique.value = c
      isLike()
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}

async function addLiked() {
  try {
    const response = await fetch(`http://localhost:4000/liked/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(musique.value)
    });
    if (!response.ok) {
      throw new Error('La requête n\'a pas abouti : ' + response.status);
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la requête:', error);
  }
}

async function delLiked() {
  try {
    const response = await fetch(`http://localhost:4000/liked/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
    } else {
      console.error('Erreur lors de la suppression de la musique:', response.statusText);
    }
    } catch (error) {
    console.error('Erreur lors de la suppression de la musique:', error);
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
    router.push(`/edit/${id}`);
}





onBeforeMount(async () => {
    loadliked()
    loaddata()
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
  font-size: 24px; /* Taille du cœur */
}

.circle {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #000; /* Couleur du cercle */
  border-radius: 50%; /* Pour former un cercle */
}

/* Style de la case à cocher */
#heartCheckbox {
  display: none; /* Cacher la case à cocher */
}
</style>