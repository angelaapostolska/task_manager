<!-- you have to listen for the emit from board dropdown here in order to show the correct dropdown list -->
<template>
  <div class="container-scroll-wrapper">
    <v-card class="task-container elevation-3 px-6" color="grey-lighten-3">
      <h2 class="div-title ma-2 pa-2">Your Tasks</h2>

      <!-- Progress Overview -->

      <v-row dense no-gutters class="columns">
        <v-col cols="12" md="4">
          <div class="header-row ma-2 pa-2">
            <h3>Urgent</h3>
            <span>{{ urgentDone }}/{{ urgentTasks.length }}</span>
          </div>
          <TaskCard
            v-for="(task, index) in urgentTasks"
            :key="task.id || index"
            :task="task"
            :class="{ 'matched-task': task.matched }"
            @status-updated="update"
            class="ma-2 pa-2"
            color="pink-lighten-4"
          />
        </v-col>

        <v-col cols="12" md="4">
          <div class="header-row ma-2 pa-2">
            <h3>Mid</h3>
            <span>{{ midDone }}/{{ midTasks.length }}</span>
          </div>
          <TaskCard
            v-for="(task, index) in midTasks"
            :key="task.id || index"
            :task="task"
            :class="{ 'matched-task': task.matched }"
            @status-updated="update"
            class="ma-2 pa-2"
            color="blue-lighten-4"
          />
        </v-col>

        <v-col cols="12" md="4">
          <div class="header-row ma-2 pa-2">
            <h3>Low</h3>
            <span>{{ lowDone }}/{{ lowTasks.length }}</span>
          </div>
          <TaskCard
            v-for="(task, index) in lowTasks"
            :key="task.id || index"
            :task="task"
            :class="{ 'matched-oh o': task.matched }"
            @status-updated="update"
            class="ma-2 pa-2"
            color="green-lighten-4"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { inject, computed, onMounted } from "vue";
import TaskCard from "./TaskCard.vue";
import { useTasksStore } from "@/stores/tasks";

const filteredTasks = inject("filteredTasks");
const store = useTasksStore();

onMounted(() => {
  store.fetchTasks();
});

const update = (updatedTask) => {
  const index = store.tasks.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    store.tasks[index].completed = updatedTask.completed;
  }
};

// Category-specific computed tasks
const urgentTasks = computed(() =>
  filteredTasks.value.filter((t) => t.category === "urgent")
);
const urgentDone = computed(
  () => urgentTasks.value.filter((t) => t.completed).length
);

const midTasks = computed(() =>
  filteredTasks.value.filter((t) => t.category === "mid")
);
const midDone = computed(
  () => midTasks.value.filter((t) => t.completed).length
);

const lowTasks = computed(() =>
  filteredTasks.value.filter((t) => t.category === "least urgent")
);
const lowDone = computed(
  () => lowTasks.value.filter((t) => t.completed).length
);
</script>

<style scoped>
.task-container {
  width: 100%;
  min-height: 600px;
  /* padding-left: 1.5rem;
  padding-right: 1.5rem; */
  margin: 1rem auto 0 auto;
  background-color: #f5f5f5;
  border-radius: 16px;
  margin: 1rem 0;
}
.container-scroll-wrapper {
  max-height: calc(100vh - 80px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 24px;
  padding-right: 8px;
  scrollbar-width: thin;
  scrollbar-color: #aaa transparent;
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

.matched-task {
  border: 2px solid #7e57c2;
  box-shadow: 0 4px 10px rgba(49, 27, 146, 0.4);
  transition: all 0.3s ease;
}
</style>
