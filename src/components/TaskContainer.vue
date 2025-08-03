<!-- you have to listen for the emit from board dropdown here in order to show the correct dropdown list -->
<template>
  <div class="columns-wrapper">
    <!-- URGENT -->
    <v-card class="task-column elevation-3 urgent-col">
      <div class="header-row pa-4">
        <div class="header-title">
          <span class="category-bullet urgent"></span>
          <h3>Urgent Tasks</h3>
        </div>
        <div class="task-count-badge">{{ urgentTasks.length }}</div>
      </div>
      <div class="scroll-area">
        <TaskCard
          v-for="(task, index) in urgentTasks"
          :key="task.id || index"
          :task="task"
          :class="{ 'matched-task': task.matched }"
          :ref="task.matched ? 'matchedTask' : null"
          @status-updated="update"
          class="ma-2"
          :bgStyle="{ background: categoryGradientMap[task.category] }"
        />
      </div>
    </v-card>

    <!-- MID -->
    <v-card class="task-column elevation-3 mid-col">
      <div class="header-row pa-4">
        <div class="header-title">
          <span class="category-bullet mid"></span>
          <h3>Medium Urgency</h3>
        </div>
        <div class="task-count-badge">{{ midTasks.length }}</div>
      </div>
      <div class="scroll-area">
        <TaskCard
          v-for="(task, index) in midTasks"
          :key="task.id || index"
          :task="task"
          :class="{ 'matched-task': task.matched }"
          :ref="task.matched ? 'matchedTask' : null"
          @status-updated="update"
          class="ma-2"
          :bgStyle="{ background: categoryGradientMap[task.category] }"
        />
      </div>
    </v-card>

    <!-- LOW -->
    <v-card class="task-column elevation-3 low-col">
      <div class="header-row pa-4">
        <div class="header-title">
          <span class="category-bullet low"></span>
          <h3>Low Urgency</h3>
        </div>
        <div class="task-count-badge">{{ lowTasks.length }}</div>
      </div>
      <div class="scroll-area">
        <TaskCard
          v-for="(task, index) in lowTasks"
          :key="task.id || index"
          :task="task"
          :class="{ 'matched-task': task.matched }"
          :ref="task.matched ? 'matchedTask' : null"
          @status-updated="update"
          class="ma-2"
          :bgStyle="{ background: categoryGradientMap[task.category] }"
        />
      </div>
    </v-card>

    <!-- COMPLETED -->
    <v-card class="task-column elevation-3 completed-col">
      <div class="header-row pa-4">
        <div class="header-title">
          <span class="category-bullet completed"></span>
          <h3>Completed</h3>
        </div>
        <div class="task-count-badge">{{ completedTasks.length }}</div>
      </div>
      <div class="scroll-area">
        <TaskCard
          v-for="(task, index) in completedTasks"
          :key="task.id || index"
          :task="task"
          @status-updated="update"
          class="ma-2"
          :bgStyle="{ background: categoryGradientMap[task.category] }"
        ></TaskCard>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { computed } from "vue";
import TaskCard from "./TaskCard.vue";
import { useTasksStore } from "@/stores/tasks";
import { taskGradients } from "@/styles/taskGradients";

const store = useTasksStore();

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
});

const categoryGradientMap = {
  urgent: taskGradients[0],
  mid: taskGradients[3],
  "least urgent": taskGradients[2],
  completed: taskGradients[1],
};

//updating the tasks state (to completed)
const update = (updatedTask) => {
  const index = store.tasks.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    store.tasks[index].completed = updatedTask.completed;
  }
};

// Category-specific computed tasks
const urgentTasks = computed(() =>
  props.tasks.filter((t) => t.category === "urgent" && t.state !== "completed")
);
const urgentDone = computed(
  () => urgentTasks.value.filter((t) => t.completed).length
);

const midTasks = computed(() =>
  props.tasks.filter((t) => t.category === "mid" && t.state !== "completed")
);
const midDone = computed(
  () => midTasks.value.filter((t) => t.completed).length
);

const lowTasks = computed(() =>
  props.tasks.filter(
    (t) => t.category === "least urgent" && t.state !== "completed"
  )
);
const lowDone = computed(
  () => lowTasks.value.filter((t) => t.completed).length
);

const completedTasks = computed(() =>
  props.tasks.filter((t) => t.state === "completed")
);
</script>

<style scoped lang="scss">
@import "../styles/gradients.scss";
.matched-task {
  border: 2px solid #7e57c2;
  box-shadow: 0 4px 10px rgba(49, 27, 146, 0.4);
  transition: all 0.3s ease;
  animation: fadeInMatch 0.3s ease-in-out;
}

@keyframes fadeInMatch {
  from {
    transform: scale(0.98);
    opacity: 0.3;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.columns-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 14px 24px;
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
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
  position: relative;
  padding-bottom: 12px;
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
  font-size: 18px;
  font-weight: 600;
  color: #49484a;
}
.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
.category-bullet {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
/* linear gradients to add to style script >> */
.category-bullet.urgent {
  background: $purple-gradient;
}
.category-bullet.mid {
  background: $pink-gradient;
}
.category-bullet.low {
  background: $blue-gradient;
}
.category-bullet.completed {
  background: $green-gradient;
}
.task-count-badge {
  width: 30px;
  height: 30px;
  background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.matched-task {
  border: 2px solid #7e57c2;
  box-shadow: 0 4px 10px rgba(49, 27, 146, 0.4);
  transition: all 0.3s ease;
}
</style>
