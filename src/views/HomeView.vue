<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import MusiCard from './MusiCard.vue'
import { RouterLink } from 'vue-router';
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

</script>

<template>
  <main class="container"> 
    <h1>Our Musiques </h1>
    <div class="musiques">
        <!-- <div class="musique" v-for="musique in musiques" :key="musique.id" @click="router.push(`/musiques/${musique.id}`)">
          <h2>{{ musique.titre }}</h2>
          <p>{{ musique.auteur }}</p>
        </div> -->
    </div>
    <div v-if="data">
      <MusiCard v-for="musique in data" :key="musique.id" :musique="musique" />
    </div>
    <div v-else>
      <p>Chargement des données...</p>
    </div>
  </main>
</template>

<style scoped>

.musiques {
  display: flex;
  width: 1000px;
  flex-wrap: wrap;
  margin-top: 50px;
  justify-content: center;
}



.musique {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.207);
  padding: 15px;
  width: 150px;
  margin-right: 15px;
  cursor: pointer;
  margin-bottom: 20px;

}


</style>
