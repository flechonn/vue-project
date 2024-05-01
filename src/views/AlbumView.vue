<script setup>
import { ref } from 'vue';
import musiqueData from '../data.json';
import { useRouter } from 'vue-router';
import { likedTracks } from "../Likedtrack"

const route=useRouter();
const musiques = ref(musiqueData);

</script>

<template>
  <h1>{{ likedTracks }}</h1>
  <main class="container"> 
    <h1>Les albums </h1>
    <div class="musiques">
        <div class="musique" v-for="musique in musiques" :key="musique.id" @click="route.push(`/album/${musique.album}`)">
          <h2>{{ musique.album }}</h2>
        </div>
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