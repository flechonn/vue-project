<script setup>
  import { useRoute, useRouter } from "vue-router";
  import { onBeforeMount, ref } from "vue";

  const route = useRoute();
  const router = useRouter();
  const musique = ref(null);
  const { id } = route.params;
  const data=ref(null)

  async function loadmusic(){
  try {
    const response = await fetch('http://localhost:4000/api/data/') // L'URL '/data' correspond à votre route Express pour récupérer les données
    if (response.ok) {
      data.value = await response.json(); // Parser le texte en JSON
      const c = data.value.find((c) => c.id === parseInt(id));
      musique.value = c;
    } else {
      console.error('Erreur1 lors de la récupération des données:', response.statusText)
    }
  } catch (error) {
    console.error('Erreur2 lors de la récupération des données:', error)
  }
}
  onBeforeMount(async () => {
    loadmusic()
  })

  async function PatchMusic() {
  console.log("test PatchMusic");
  try {
    const response = await fetch(`http://localhost:4000/data/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auteur: musique.value.auteur,
        titre: musique.value.titre,
        duree: musique.value.duree,
        album: musique.value.album
      })
    });
    if (!response.ok) {
      throw new Error('La requête n\'a pas abouti : ' + response.status);
    }

    console.log("Requête réussie!");
    console.log("Modifications enregistrées :", musique.value);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la requête:', error);
  }
}


</script>

<template>
  <div class="container">
    <!-- Affichage des détails de la musique -->
    <div class="contan" v-if="musique">
      <h1>La musique</h1>
      <!-- Formulaire pour éditer les informations de la musique -->
      <form @submit.prevent="PatchMusic">
        <label for="auteur">Auteur:</label>
        <input type="text" id="auteur" v-model="musique.auteur" />
        <label for="titre">Titre:</label>
        <input type="text" id="titre" v-model="musique.titre" />
        <label for="duree">Durée:</label>
        <input type="text" id="duree" v-model="musique.duree" />
        <label for="album">Album:</label>
        <input type="text" id="album" v-model="musique.album" />
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
    <div v-else>
      <h1>Musique inconnue</h1>
    </div>
    <button @click="router.back()">go back</button>
  </div>
</template>

  <style scoped>
    .container {
      margin-top: 20px;
    }
  
    .contan {
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.207);
      padding: 15px;
      width: auto;
      margin-right: 15px;
      cursor: pointer;
      margin-bottom: 20px;
    }
  
    form {
      margin-top: 20px;
    }
  
    label {
      display: block;
      margin-bottom: 5px;
    }
  
    input[type="text"] {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  
    button {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #45a049;
    }
  </style>
  