<template>
  <!-- Task Form Create  -->
  <v-dialog v-model="formState.showForm" persistent>
    <TaskForm
      :initial-board="selectedBoard"
      @add-task="handleTaskAdded"
      @close-form="handleCloseForm"
    />
  </v-dialog>

  <!-- Task Form Edit -->
  <v-dialog v-model="formState.showEditForm" persistent>
    <EditTaskForm
      @update-task="handleTaskUpdated"
      @close-form="handleCloseEditForm"
    />
  </v-dialog>

  <!-- DateCard -->
  <DateCard @board-selected="handleBoardSelected"></DateCard>

  <!-- Tasks Containers -->
  <div class="page-container">
    <TaskContainer :tasks="tasks" />
  </div>
</template>

<script setup>
import { ref, watch, inject, onMounted } from "vue";
import { useRoute } from "vue-router";
import TaskForm from "@/components/TaskForm.vue";
import EditTaskForm from "@/components/EditTaskForm.vue";
import DateCard from "@/components/DateCard.vue";
import TaskContainer from "@/components/TaskContainer.vue";
import { useTasks } from "@/composables/useTasks";

const route = useRoute();
const formState = inject("formState");

const selectedBoard = ref(null); // can be an ID (number) or a board object
const { fetchTasks, tasks } = useTasks();

// normalize board id whether value is object or number
const toBoardId = (val) =>
  val && typeof val === "object" ? val.id : val || null;

// react when board changes (from dropdown OR URL)
watch(
  selectedBoard,
  async (val) => {
    const id = toBoardId(val);
    if (id) {
      await fetchTasks({ board_id: id });
    } else {
      await fetchTasks();
    }
  },
  { immediate: true }
);

// pick up boardId from URL (when coming from BoardCard)
onMounted(() => {
  const fromQuery = route.query.boardId;
  if (fromQuery) {
    const id = Number(fromQuery);
    selectedBoard.value = id;
    // preselect in the TaskForm as well
    if (formState) formState.selectedBoard = id;
  }
});

// when the DateCard dropdown changes
const handleBoardSelected = (board) => {
  selectedBoard.value = board ?? null; // board is object from DateCard
  if (formState) formState.selectedBoard = toBoardId(board);
};

// after create
const handleTaskAdded = async () => {
  if (formState) formState.showForm = false;
  const id = toBoardId(selectedBoard.value);
  if (id) {
    await fetchTasks({ board_id: id });
  } else {
    await fetchTasks();
  }
};

// after edit
const handleTaskUpdated = async () => {
  if (formState) {
    formState.taskToEdit = null;
    formState.showEditForm = false;
  }
  const id = toBoardId(selectedBoard.value);
  if (id) {
    await fetchTasks({ board_id: id });
  } else {
    await fetchTasks();
  }
};

const handleCloseForm = () => {
  if (formState) formState.showForm = false;
};

const handleCloseEditForm = () => {
  if (formState) {
    formState.taskToEdit = null;
    formState.showEditForm = false;
  }
};
</script>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
}
</style>






