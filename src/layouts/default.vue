<template>
  <v-app id="inspire">
    <!-- Sidebar (Left) -->
    <SideBar />

    <!-- Header (Top) -->
    <v-app-bar height="100" flat color="white" elevation="0" class="px-6">
      <Header />
    </v-app-bar>

    <!-- Main Content Area -->
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

#inspire {
  height: 100vh; /* full viewport height */
  display: flex; /* flex container */
  flex-direction: row; /* sidebar and main content side by side */
  overflow: hidden; /* prevent unwanted scroll */
  background-color: red;
}
</style>
