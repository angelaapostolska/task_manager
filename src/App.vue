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
  overflow: hidden;
}

.v-main {
  padding-top: 10px !important;
  padding-left: 30px !important;
}
</style>

<!-- ✅ global styles: for nuking global scroll -->
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
</style>
