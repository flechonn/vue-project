<script setup>
import {RouterView,RouterLink} from "vue-router"
import { ref, onMounted } from 'vue'

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


// const count = ref(0)
</script>

<template>
  <main>
    <div class="links">
      <RouterLink active-class="active" to="/">Home </RouterLink>
      <RouterLink active-class="active" to="/account">Account</RouterLink>
      <RouterLink active-class="active" to="/album">Album</RouterLink>
    </div>
    <RouterView/>
  </main>
</template>

<style scoped>
.active {
  font-weight: bold;
  color: green
}

.links {
  padding: 20px;
}

</style>

