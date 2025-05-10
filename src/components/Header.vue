<template>
  <v-toolbar
    flat
    height="80"
    color="white"
    class="header-toolbar px-6"
    style="position: fixed; top: 0; right: 0; z-index: 10"
  >
    <!-- Profile Icon -->
    <v-btn icon class="profile-icon">
      <v-icon size="32" color="purple-lighten-4">mdi-account-circle</v-icon>
    </v-btn>

    <!-- Hello User Text -->
    <v-toolbar-title class="hello-user">Hello {{ userName }}!</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Add Task (+) Button FIRST -->
    <v-btn icon class="plus-icon" @click="handleClick">
      <v-icon size="32" color="deep-purple-lighten-4">mdi-plus-circle</v-icon>
    </v-btn>

    <!-- Then Search Bar -->
    <v-text-field
      class="white-placeholder"
      density="comfortable"
      variant="solo"
      flat
      placeholder="Search.."
      prepend-inner-icon="mdi-magnify"
      hide-details
      single-line
      bg-color="deep-purple-lighten-5"
      rounded="lg"
      max-width="348px"
      icon-color="white"
    ></v-text-field>
  </v-toolbar>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["show-form"]);
const userName = ref("Jane Doe");

const handleClick = () => {
  emit("show-form");
};
</script>

<style scoped>
.hello-user {
  color: #49484a;
  font-family: "Playfair Display", serif;
  font-size: 28px;
  font-weight: 600;
  margin-left: 8px;
}
</style>
