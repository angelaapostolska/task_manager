<template>
  <v-card class="task-container elevation-3" color="grey-lighten-3">
    <h2 class="div-title ma-2 pa-2">Your Tasks</h2>
    <v-row dense no-gutters class="columns">
      <v-col cols="12" md="4">
        <div class="header-row ma-2 pa-2">
          <h3>Urgent</h3>
          <span>{{ urgentDone }}/{{ urgentTasks.length }}</span>
        </div>
        <!-- iterate and render tasks -->
        <TaskCard
          v-for="(task, index) in tasks.filter((t) => t.urgency === 'Urgent')"
          :key="index"
          :task="task"
          class="ma-2 pa-2"
          color="pink-lighten-4"
        >
          <div>
            <strong>{{ task.name }}</strong>
          </div>
          <div>{{ task.description }}</div>
        </TaskCard>
      </v-col>
      <v-col cols="12" md="4">
        <div class="header-row ma-2 pa-2">
          <h3>Mid</h3>
          <span>{{ midDone }}/{{ midTasks.length }}</span>
        </div>
        <TaskCard
          v-for="(task, index) in tasks.filter((t) => t.urgency === 'Mid')"
          :key="'mid-' + index"
          :task="task"
          class="ma-2 pa-2"
          color="blue-lighten-4"
        >
          <div>
            <strong>{{ task.name }}</strong>
          </div>
          <div>{{ task.description }}</div>
        </TaskCard>
      </v-col>
      <v-col cols="12" md="4">
        <div class="header-row ma-2 pa-2">
          <h3>Low</h3>
          <span>{{ lowDone }}/{{ lowTasks.length }}</span>
        </div>
        <TaskCard
          v-for="(task, index) in tasks.filter(
            (t) => t.urgency === 'Least Urgent'
          )"
          :key="'low-' + index"
          :task="task"
          class="ma-2 pa-2"
          color="green-lighten-4"
        >
          <div>
            <strong>{{ task.name }}</strong>
          </div>
          <div>{{ task.description }}</div>
        </TaskCard>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { useTasks } from "@/composables/useTasks";
import TaskCard from "./TaskCard.vue";
const tasks = inject("tasks");

const urgentTasks = computed(() =>
  tasks.value.filter((t) => t.urgency === "Urgent")
);
const urgentDone = computed(
  () => urgentTasks.value.filter((t) => t.completed).length
);
const midTasks = computed(() => tasks.value.filter((t) => t.urgency === "Mid"));
const midDone = computed(
  () => midTasks.value.filter((t) => t.completed).length
);

const lowTasks = computed(() =>
  tasks.value.filter((t) => t.urgency === "Least Urgent")
);
const lowDone = computed(
  () => lowTasks.value.filter((t) => t.completed).length
);
</script>

<style scoped>
.task-container {
  width: 100%;
  max-width: 1080px;
  min-height: 600px;
  padding: 2rem;
  margin: 1rem auto 0 auto; /* top: 1rem, sides: auto, bottom: 0 */
}

.div-title {
  font-family: "Playfair Display", serif;
  font-weight: 600;
  color: #49484a;
  font-size: 36px;
  margin-bottom: 1rem;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header-row h3 {
  color: #49484a;
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 500;
  text-transform: uppercase;
}
</style>
