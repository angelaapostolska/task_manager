<template>
  <!-- Header -->
  <Header @show-form="handleShowForm" />

  <!-- Task Form (Modal) -->
  <v-dialog v-model="showForm" persistent>
    <TaskForm
      @add-task="handleTaskAdded"
      @close-form="showForm = false"
      :category="selectedCategory"
    />
  </v-dialog>

  <!-- Main Task Container -->
  <v-container fluid class="main-content" :class="{ blurred: showForm }">
    <TaskContainer @open-form="handleShowForm" />
  </v-container>

  <!-- Sidebar -->
  <Sidebar />
</template>

<script setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskContainer from "@/components/TaskContainer.vue";
import Sidebar from "@/components/Sidebar.vue";
const showForm = ref(false);
const selectedCategory = ref(null);

const handleShowForm = () => {
  showForm.value = true;
};

const handleTaskAdded = (newTask) => {
  showForm.value = false;
  // you can emit or push task to a central store here
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh; /* Full height */
  width: 80px; /* Width of the sidebar */
  z-index: 1000; /* Make sure it stays on top */
}
</style>
