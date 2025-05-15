<!-- src/layouts/DefaultLayout.vue -->
<template>
  <v-app id="inspire">
    <SideBar />

    <v-app-bar height="100">
      <Header />
    </v-app-bar>

    <v-main class="main-container">
      <div class="page-wrapper">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<style scoped>
.page-wrapper {
  max-width: 90vw;
  margin: 0 auto;
  width: 100%;
}
</style>
