<template>
  <!-- Task Form (Modal) -->
  <v-dialog v-model="formState.showForm" persistent>
    <TaskForm @add-task="handleTaskAdded" @close-form="handleCloseForm" />
  </v-dialog>

  <!-- Main Task Container -->
  <v-row>
    <v-col cols="8"> <TaskContainer @open-form="handleShowForm" /> </v-col>
    <v-col cols="4"> 2 </v-col>
  </v-row>
</template>

<script setup>
import { inject } from "vue";
import TaskForm from "@/components/TaskForm.vue";

const formState = inject("formState");

const handleTaskAdded = () => {
  formState.showForm = false;
};

const handleCloseForm = () => {
  formState.showForm = false;
};
</script>

<style scoped></style>
