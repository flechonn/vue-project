<script setup>
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount,ref} from "vue";

import musik from "../data.json";

const route = useRoute();
const router = useRouter();
const musique = ref(null);
const {id} = route.params;
console.log(route.params)

onBeforeMount(() => {
   const c = musik.find(c => c.id ===parseInt(id));
   musique.value = c
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
</style>