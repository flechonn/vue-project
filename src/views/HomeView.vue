<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { fetchData,deleteData } from '../utils';
import MusiCard from './musicview/MusiCard.vue'


const router=useRouter();
const data = ref(null)
const idToDelete =ref(null)

async function loaddata(){
  try {
    data.value = await fetchData('http://localhost:4000/data/');
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message);
  }
}

async function addMusic() {
  router.push(`addMusic`);
}

async function deleteMusic(id) {
  try {
    await deleteData(`http://localhost:4000/data/${id}`)
    await loaddata();
    console.log("Musique supprimée avec succès");
  } catch (error) {
    console.error('Erreur lors de la suppression de la musique:', error);
  }
}

onMounted(async () => {
  await loaddata()
})

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
