<template>
  <v-card class="mb-4 elevation-3" color="grey-lighten-3">
    <v-card-title>Calendar</v-card-title>
    <v-card-text>
      <v-date-picker
        v-model="selectedDate"
        show-adjacent-months
        color="deep-purple-lighten-1"
        readonly
        elevation="0"
        width="350"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
const selectedDate = ref(new Date().toISOString().substr(0, 10));
</script>
<style scoped>
.v-card {
  padding: 2rem;
  margin: 1rem auto 0 auto; /* top: 1rem, sides: auto, bottom: 0 */
}
.v-card-title {
  font-family: "Playfair Display", serif;
  font-weight: 600;
  color: #49484a;
  font-size: 36px;
}
</style>
