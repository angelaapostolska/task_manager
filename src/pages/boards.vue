<template>
  <!-- Task Form Create (Modal) -->
  <v-dialog v-model="formState.showForm" persistent>
    <TaskForm @add-task="handleTaskAdded" @close-form="handleCloseForm" />
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
  <!-- scrollable div -->
  <div class="page-container">
    <!-- title plus add button -->
    <div class="header">
      <h2>Your boards</h2>
      <v-btn class="create-btn">Create board</v-btn>
    </div>

    <!-- user's boards carrousel -->
    <BoardCard></BoardCard>
  </div>
</template>

<script setup>
import { inject } from "vue";
import TaskForm from "@/components/TaskForm.vue";

const formState = inject("formState");

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
  flex-direction: column;
  padding: 14px 24px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.create-btn {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-transform: none !important;
  border-radius: 12px !important;
  font-weight: 400 !important;
}
</style>
