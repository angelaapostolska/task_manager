//will be used in TaskCard (yet to be implemented)
import { ref } from "vue";

export function useTasks() {
  const tasks = ref([]);

  const addTask = (task) => {
    tasks.value.push(task);
  };

  const updateTask = (task) => {
    task.completed = !task.completed;
  };

  const searchQuery = ref("");
  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const filteredTasks = computed(() =>
    tasks.value.map((task) => ({
      ...task,
      matched:
        searchQuery.value.length > 0 &&
        task.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    }))
  );

  return {
    tasks,
    addTask,
    updateTask,
    searchQuery,
    setSearchQuery,
    filteredTasks,
  };
}
