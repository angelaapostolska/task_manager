<template>
  <v-app id="home-layout">
    <!-- Sidebar (Left) -->
    <SideBar />

    <!-- Header + Main Content (Right) -->
    <div class="right-side">
      <!-- Header -->
      <v-app-bar height="100" flat color="white" elevation="0" class="px-6">
        <Header />
      </v-app-bar>

      <!-- Main Content Area -->
      <v-main class="main-container">
        <div class="page-wrapper">
          <router-view />
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script setup>
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<style>
#home-layout {
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.right-side {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-container {
  flex-grow: 1;
}
.page-wrapper {
  max-width: 90vw;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
}
</style>
