<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import MusiCard from './MusiCard.vue'
const router=useRouter();

const data = ref(null)

async function loaddata(){
  try {
    const response = await fetch('http://localhost:4000/api/data') // L'URL '/data' correspond à votre route Express pour récupérer les données
    if (response.ok) {
      data.value = await response.json(); // Parser le texte en JSON
      console.log("HAGGRID")
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}

onMounted(async () => {
  loaddata()
  console.log("Mounted")
})

async function addMusic() {
  try {
    console.log("coucou")
    const response = await fetch('http://localhost:4000/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
      "id": 2,
      "titre": "Smells Like Teen Spirit",
      "auteur": "Nirvana",
      "duree": "5:01",
      "album": "Nevermind"
      })
    });
    if (response.ok) {
      // Réussite
    } else {
      console.error('Erreur lors de l\'ajout de la musique:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la musique:', error);
  }
}


function deleteMusic() {
  // Logique pour supprimer une musique
}


</script>


<template>
  <main class="container"> 
    <h1>Our Musiques</h1>
    <div class="flex-container" v-if="data">
      <MusiCard v-for="musique in data" :key="musique.id" :musique="musique" />
    </div>
    <div v-else>
      <p>Chargement des données...</p>
    </div>
    <div class="buttons">
      <button @click="addMusic">Ajouter</button>
      <button @click="deleteMusic">Supprimer</button>
    </div>
  </main>
</template>

<style scoped>


.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}


.flex-container {
  display: flex;
  flex-direction: row; /* Pour afficher en ligne */
}



</style>
