<template>
  <v-app id="inspire">
    <SideBar></SideBar>

    <v-app-bar height="100">
      <Header></Header>
    </v-app-bar>

    <v-main class="main-container"><router-view /> </v-main>
  </v-app>
</template>

<script setup>
import { reactive, provide } from "vue";
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import { useTasks } from "./composables/useTasks";
const formState = reactive({
  showForm: false,
});

const { tasks, addTask, updateTask } = useTasks();
provide("formState", formState);
provide("tasks", tasks);
provide("addTask", addTask);
provide("updateTask", updateTask);
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow: hidden;
}
.main-container > {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
