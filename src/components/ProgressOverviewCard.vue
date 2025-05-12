<template>
  <v-card color="grey-lighten-3" elevation="3">
    <v-card-title>Task Overview</v-card-title>
    <v-card-text>
      <div class="progress-list">
        <div
          v-for="(category, index) in progressData"
          :key="index"
          class="progress-item d-flex align-center"
        >
          <v-progress-circular
            :model-value="category.progress"
            :color="category.color"
            size="60"
            width="6"
          >
            {{ category.progress }}%
          </v-progress-circular>
          <div class="text-info">
            <strong>{{ category.name }}</strong>
            <div class="text-caption">
              {{ category.done }} / {{ category.total }} tasks
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const progressData = ref([
  {
    name: "Urgent",
    done: 3,
    total: 5,
    progress: 60,
    color: "deep-purple",
  },
  {
    name: "Mid",
    done: 4,
    total: 8,
    progress: 50,
    color: "deep-purple-lighten-2",
  },
  {
    name: "Least Urgent",
    done: 2,
    total: 4,
    progress: 50,
    color: "deep-purple-lighten-4",
  },
]);
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
.progress-list {
  display: flex;
  flex-direction: column;
}
.progress-item {
  margin-bottom: 1rem; /* space between each circle row */
}
.text-info {
  margin-left: 1rem;
}
.text-info strong {
  color: #212121;
}
.text-info .text-caption {
  color: #616161;
}
</style>
