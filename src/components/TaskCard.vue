<template>
  <v-card class="mx-auto my-4" elevation="16" max-width="344">
    <v-card-item>
      <v-card-title>{{ task.name }}</v-card-title>
      <v-card-subtitle>{{
        task.completed ? "Completed" : "Pending"
      }}</v-card-subtitle>
    </v-card-item>
    <v-card-text>
      {{ task.description }}
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";

// Define the task prop that will be passed from the parent (TaskBoard)
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* initial card component from vuetify, styles must be changed */
</style>
