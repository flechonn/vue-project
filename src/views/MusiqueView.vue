<script setup>
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount,ref} from "vue";

import musik from "../data.json";

const route = useRoute();
const router = useRouter();
const musique = ref(null);
const {id} = route.params;
console.log(route.params)


const isChecked = ref(false); 

function isLike(){
  if (likedTracks.value.includes(musique.value.titre)){
    isChecked.value=true
  }
}
function toggleLike() {
  if (isChecked.value) {
    // Check if the music title is not already in the likedTracks array
    if (!likedTracks.value.includes(musique.value.titre)) {
      likedTracks.value.push(musique.value.titre);
    }
  } else {
    const index = likedTracks.value.indexOf(musique.value.titre);
    if (index !== -1) {
      likedTracks.value.splice(index, 1);
    }
  }
}

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
        <div>
            <input type="checkbox" id="heartCheckbox" v-model="isChecked" @change="toggleLike" />
            <label for="heartCheckbox" class="heart-label">
                <span v-if="isChecked" class="heart">❤️</span>
                <span v-else class="circle"></span>
            </label>
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

.heart-label {
  cursor: pointer;
}

.heart {
  font-size: 24px; /* Taille du cœur */
}

.circle {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #000; /* Couleur du cercle */
  border-radius: 50%; /* Pour former un cercle */
}

/* Style de la case à cocher */
#heartCheckbox {
  display: none; /* Cacher la case à cocher */
}
</style>