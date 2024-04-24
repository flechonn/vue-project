<script setup>
import {RouterView,RouterLink} from "vue-router"

import {ref} from 'vue'
// const count = ref(0)
</script>

<template>
  <main>
    <div class="links">
      <RouterLink active-class="active" to="/">Home </RouterLink>
      <RouterLink active-class="active" to="/about">About</RouterLink>
    </div>
    <!-- <h1>{{count}}</h1>
    <button @click="count++"> click</button> -->
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