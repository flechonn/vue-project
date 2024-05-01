<script setup>
import {RouterView,RouterLink} from "vue-router"
import { ref, onMounted } from 'vue'
import { fetchData } from "./utils";

const data = ref(null)

onMounted(async () => {
  try {
    data.value = await fetchData('http://localhost:4000/api/data') // Parser le texte en JSON
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
})

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

