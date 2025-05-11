<template>
  <!-- Task Form (Modal) -->
  <v-dialog v-model="showForm" persistent>
    <TaskForm
      @add-task="handleTaskAdded"
      @close-form="handleCloseForm"
      :category="selectedCategory"
    />
  </v-dialog>

  <!-- Main Task Container -->
  <v-row>
    <v-col cols="8"> <TaskContainer @open-form="handleShowForm" /> </v-col>
    <v-col cols="4"> 2 </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskContainer from "@/components/TaskContainer.vue";
import Sidebar from "@/components/SideBar.vue";
const showForm = ref(false);
const selectedCategory = ref(null);

const handleShowForm = () => {
  showForm.value = true;
};

const handleTaskAdded = (newTask) => {
  showForm.value = false;
};

const handleCloseForm = () => {
  showForm.value = false;
};
</script>

<style scoped></style>
