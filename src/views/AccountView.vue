<script setup>
import {onBeforeMount,ref} from "vue";
import { likedTracks } from "../Likedtrack"

const user=ref("")
const email=ref("")

</script>

<template>
  <h1>{{ likedTracks }}</h1>
    <div class="container">
      <h1>Account</h1>
      <p>User :</p>
      <p>Email :</p>
      <p>Playlist:</p>
      <p></p>
    </div>
  </template>
  
  <style>
  p {
    text-align: center;
  }
  </style>