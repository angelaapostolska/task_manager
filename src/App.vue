<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script setup>
import { provide, reactive } from "vue";
import { useTasks } from "./composables/useTasks";
import { useRoute } from "vue-router";
import { setAuthToken } from "./plugins/axios";
import { useAuthStore } from "./stores/auth";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const layout = route.meta.layout || "default";

onBeforeMount(async () => {
  console.log("App mounted. Initializing authentication check.");
  if (localStorage) {
    const current_token = localStorage.access_token;
    setAuthToken(current_token);
    auth.getMe();
    console.log("App: ", current_token);
  }
});

const formState = reactive({
  showForm: false,
  showEditForm: false,
  taskToEdit: null,
});

const { tasks, addTask, editTask, filteredTasks, setSearchQuery } = useTasks();
provide("formState", formState);
provide("tasks", tasks);
provide("addTask", addTask);
provide("editTask", editTask);
provide("filteredTasks", filteredTasks);
provide("setSearchQuery", setSearchQuery);
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
