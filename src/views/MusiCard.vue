<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  musique: Object
});

const router = useRouter();

function goToMusicDetail() {
  router.push(`/musiques/${props.musique.id}`);
};

</script>

<template>
  <div class="musique" @click="goToMusicDetail">
    <h1>Auteur :{{ musique.auteur }}</h1>
    <p>Titre :{{ musique.titre }}</p>
    <p>Durée :{{ musique.duree }}</p>
    <p>Album :{{ musique.album }}</p>
  </div>
</template>

<style scoped>
.musique {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.207);
  padding: 15px;
  width: 150px;
  margin-right: 15px;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
