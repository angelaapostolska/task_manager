<template>
  <v-card color="grey-lighten-3" elevation="3" class="progress-card">
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
import { inject, computed } from "vue";

const filteredTasks = inject("filteredTasks");

// Define your categories with keys matching task.category values
const categories = [
  { name: "Urgent", key: "urgent", color: "deep-purple" },
  { name: "Mid", key: "mid", color: "deep-purple-lighten-2" },
  { name: "Least Urgent", key: "least urgent", color: "deep-purple-lighten-4" },
];

const progressData = computed(() => {
  return categories.map(({ name, key, color }) => {
    // Get all tasks in this category
    const tasksInCategory = filteredTasks.value.filter(t => t.category === key);

    // Count completed tasks — THIS triggers reactivity on completion changes
    const doneCount = tasksInCategory.filter(t => t.completed).length;

    const totalCount = tasksInCategory.length;

    // Calculate progress %
    const progress = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

    return {
      name,
      done: doneCount,
      total: totalCount,
      progress,
      color,
    };
  });
});
</script>

<style scoped>
.progress-card {
  padding: 2rem;
  margin: 1rem auto 0 auto;
  max-width: 1080px; /* same width as your TaskContainer */
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
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
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

