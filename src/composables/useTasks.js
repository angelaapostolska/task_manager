import { ref } from "vue";
import { useTasksStore } from "@/stores/tasks";

export function useTasks() {
  //change the old reactive tasks list with the tasks list from our store
  //containing tasks from the backend
  // const tasks = ref([]);
  const store = useTasksStore();
  const searchQuery = ref("");

  const addTask = (task) => {
    console.log("add task method fired");
    store.tasks.push(task);
  };

  const updateTask = (task) => {
    task.completed = !task.completed;
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const filteredTasks = computed(() =>
    store.tasks.map((task) => ({
      ...task,
      matched:
        searchQuery.value.length > 0 &&
        task.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    }))
  );

  return {
    tasks: store.tasks,
    addTask,
    updateTask,
    searchQuery,
    setSearchQuery,
    filteredTasks,
  };
}
