<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import MusiCard from './MusiCard.vue'


const router=useRouter();
const data = ref(null)
const idToDelete =ref(null)

async function loaddata(){
  try {
    const response = await fetch('http://localhost:4000/api/data/') // L'URL '/data' correspond à votre route Express pour récupérer les données
    if (response.ok) {
      data.value = await response.json(); // Parser le texte en JSON
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}

onMounted(async () => {
  loaddata()
})

async function addMusic() {
  router.push(`addMusic`);
}

async function deleteMusic(id) {
  try {
    const response = await fetch(`http://localhost:4000/api/data/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      // Recharger les données après la suppression réussie
      await loaddata();
      console.log("Musique supprimée avec succès");
    } else {
      console.error('Erreur lors de la suppression de la musique:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la musique:', error);
  }
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
      <button @click="addMusic">AddMusic</button>
      <input type="text" v-model="idToDelete" placeholder="Entrez l'ID à supprimer">
      <button @click="deleteMusic(idToDelete)">DelMusic</button>
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
