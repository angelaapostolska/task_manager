<!-- you have to listen for the emit from board dropdown here in order to show the correct dropdown list -->
<template>
  <div class="columns-wrapper">
    <!-- URGENT -->
    <v-card class="task-column elevation-3 urgent-col">
      <div class="header-row pa-4">
        <h3>Urgent</h3>
        <span>{{ urgentDone }}/{{ urgentTasks.length }}</span>
      </div>
      <div class="scroll-area">
        <TaskCard
          v-for="(task, index) in urgentTasks"
          :key="task.id || index"
          :task="task"
          :class="{ 'matched-task': task.matched }"
          @status-updated="update"
          class="ma-2"
        />
      </div>
    </v-card>

    <!-- MID -->
    <v-card class="task-column elevation-3 mid-col">
      <div class="header-row pa-4">
        <h3>Mid</h3>
        <span>{{ midDone }}/{{ midTasks.length }}</span>
      </div>
      <div class="scroll-area">
        <TaskCard
          v-for="(task, index) in midTasks"
          :key="task.id || index"
          :task="task"
          :class="{ 'matched-task': task.matched }"
          @status-updated="update"
          class="ma-2"
        />
      </div>
    </v-card>

    <!-- LOW -->
    <v-card class="task-column elevation-3 low-col">
      <div class="header-row pa-4">
        <h3>Low</h3>
        <span>{{ lowDone }}/{{ lowTasks.length }}</span>
      </div>
      <div class="scroll-area">
        <TaskCard
          v-for="(task, index) in lowTasks"
          :key="task.id || index"
          :task="task"
          :class="{ 'matched-task': task.matched }"
          @status-updated="update"
          class="ma-2"
        />
      </div>
    </v-card>

    <!-- COMPLETED -->
    <v-card class="task-column elevation-3 completed-col">
      <div class="header-row pa-4">
        <h3>Completed</h3>
        <span></span>
      </div>
      <div class="scroll-area"></div>
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
.matched-task {
  border: 2px solid #7e57c2;
  box-shadow: 0 4px 10px rgba(49, 27, 146, 0.4);
  transition: all 0.3s ease;
}

.columns-wrapper {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 14px 24px;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.task-column {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  max-width: 540px;
  min-width: 280px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(to right, #ffffff 0%, #f8f9fa 100%);
}

.scroll-area {
  overflow-y: auto;
  max-height: calc(100vh - 280px);
  padding: 0 16px 48px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: relative; /* needed for the pseudo element */
  padding-bottom: 12px; /* optional: space for the bottom line */
}
.header-row::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px; /* thickness of the line */
  width: 100%;
  background: linear-gradient(to right, #888888 0%, transparent 100%);
}
.header-row h3 {
  font-family: Inter, sans-serif;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600;
  color: #49484a;
}

.matched-task {
  border: 2px solid #7e57c2;
  box-shadow: 0 4px 10px rgba(49, 27, 146, 0.4);
  transition: all 0.3s ease;
}
</style>
