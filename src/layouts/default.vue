<!-- src/layouts/DefaultLayout.vue -->
<template>
  <v-app id="inspire">
    <SideBar />
    <v-app-bar height="100">
      <Header />
    </v-app-bar>
    <v-main class="main-container">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.v-main {
  padding-top: 10px !important;
  padding-left: 30px !important;
}
</style>
