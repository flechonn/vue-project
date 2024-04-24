<!-- <script setup>
    const props =defineProps(['name','age']);
</script>

<template>
    <h1>Home Page</h1>
    <p>{{ props.name }}</p>
    <p>
    {{ props.age }}
    </p>

</template> -->

<script setup>
import { ref } from 'vue';
import musiqueData from '../data.json';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
const name =ref("nom");
const age =ref("");
const route=useRouter();
const musiques = ref(musiqueData);

</script>

<template>
  <main class="container"> 
    <h1>Our Musiques </h1>
    <div class="musiques">
        <div class="musique" v-for="musique in musiques" :key="musique.id" @click="route.push(`/musiques/${musique.id}`)">
        <!-- <RouterLink :to="`/musiques/${musique.id}`" class="musique" v-for="musique in musiques" :key="musique.id"> -->
          <h2>{{ musique.titre }}</h2>
          <p>{{ musique.auteur }}</p>
          <p>{{ musique.album }}</p>
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
