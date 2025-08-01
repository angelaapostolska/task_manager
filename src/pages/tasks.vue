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
      :task="formState.taskToEdit"
      @update-task="handleTaskUpdated"
      @close-form="handleCloseEditForm"
    >
    </EditTaskForm>
  </v-dialog>

  <!-- DateCard -->
  <DateCard @board-selected="handleBoardSelected"></DateCard>

  <!-- Tasks Containers -->
  <div class="page-container">
    <TaskContainer @open-form="handleShowForm" :tasks="tasks" />
  </div>
</template>

<script setup>
import { inject } from "vue";
import TaskForm from "@/components/TaskForm.vue";
import DateCard from "@/components/DateCard.vue";
import TaskContainer from "@/components/TaskContainer.vue";
import { useTasks } from "@/composables/useTasks";

const selectedBoard = ref(null);
const { fetchTasks, tasks } = useTasks();

//board changes watcher
watch(
  selectedBoard,
  async (newBoard) => {
    if (newBoard) {
      await fetchTasks({ board_id: newBoard.id });
    } else {
      await fetchTasks();
    }
  },
  { immediate: true }
);

const handleBoardSelected = (board) => {
  selectedBoard.value = board;
};

const formState = inject("formState");

const handleTaskAdded = async () => {
  formState.showForm = false;
  if (selectedBoard.value) {
    await fetchTasks({ board_id: selectedBoard.value });
  } else {
    await fetchTasks();
  }
};

const handleTaskUpdated = () => {
  formState.taskToEdit = null;
  formState.showEditForm = false;
};

const handleCloseForm = () => {
  formState.showForm = false;
};

const handleCloseEditForm = () => {
  formState.taskToEdit = null;
  formState.showEditForm = false;
};
</script>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
}
</style>
