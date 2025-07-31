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
  <DateCard></DateCard>

  <!-- scrollable div -->
  <div class="page-container">
    <TaskContainer @open-form="handleShowForm" />
  </div>
</template>

<script setup>
import { inject } from "vue";
import TaskForm from "@/components/TaskForm.vue";
import { useAuthStore } from "@/stores/auth";
import DateCard from "@/components/DateCard.vue";

const selectedBoard = ref(null);

const formState = inject("formState");
const auth = useAuthStore();

const handleTaskAdded = () => {
  formState.showForm = false;
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
  flex: 1;
  display: flex;
  padding: 0;
}
</style>
