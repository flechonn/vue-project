<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  playlist: Object
});
const router = useRouter();

function goToMusicDetail() {
  router.push(`/account/${props.playlist.id}`);
};

</script>

<template>
    <div class="playlist" @click="goToMusicDetail">
      <h3>{{ props.playlist.name }}</h3>
      <p>{{ props.playlist.description }}</p>
      <ul>
        <li v-for="track in playlist.tracks" :key="track.id">{{ track.title }}</li>
      </ul>
    </div>
</template>
  
<style scoped>
.playlist {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;

}

.playlist h3 {
  margin-top: 0;
}

.playlist ul {
  list-style-type: none;
  padding: 0;
}

.playlist li {
  margin-bottom: 5px;
}
</style>
