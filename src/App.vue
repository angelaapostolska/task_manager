<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script setup>
import { reactive, provide } from "vue";
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import { useTasks } from "./composables/useTasks";
import { useRoute } from "vue-router";

const route = useRoute();
const layout = route.meta.layout || "default";

const formState = reactive({
  showForm: false,
});

const { tasks, addTask, updateTask } = useTasks();
provide("formState", formState);
provide("tasks", tasks);
provide("addTask", addTask);
provide("updateTask", updateTask);
</script>

<!-- ✅ global styles: for nuking global scroll -->
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto;
}
</style>
