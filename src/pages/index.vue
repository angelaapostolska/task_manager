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
    <!-- Main Task Container -->
    <v-row>
      <v-col cols="8"> <TaskContainer @open-form="handleShowForm" /> </v-col>
      <v-col cols="4">
        <CalendarCard> </CalendarCard>
        <ProgressOverviewCard></ProgressOverviewCard>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { inject } from "vue";
import TaskForm from "@/components/TaskForm.vue";
import CalendarCard from "@/components/CalendarCard.vue";
import ProgressOverviewCard from "@/components/ProgressOverviewCard.vue";

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
}
</style>
