<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)

async function loaddata(){
  try {
    const response = await fetch('/api/data') // L'URL '/data' correspond à votre route Express pour récupérer les données
    if (response.ok) {
      console.log("hagrid")
      console.log("response"+response)
      console.log("responses body"+response.body)
      const textData = await response.text();
      console.log("responses.text"+textData);
      // const streamData = await response.blob();
      // console.log("responses blob"+streamData);
      const jsonData = await response.body.json(); // Wait for JSON parsing
      console.log(jsonData); // Log the parsed JSON data
      data.value = jsonData;
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}

onMounted(async () => {
  loaddata()
  console.log("teste")
})


</script>

<template>
  <main>
    <h1>test</h1>
    fhkhfkfe
    <div v-if="data">
      <p v-for="(value, key) in data" :key="key">{{ value }}</p>
    </div>
    <div v-else>
      <p>Chargement des données...</p>
    </div>
  </main>
</template>


<style scoped>

</style>

