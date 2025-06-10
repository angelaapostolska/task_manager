import { ref, computed } from "vue";
import { useTasksStore } from "@/stores/tasks";

export function useTasks() {
  //change the old reactive tasks list with the tasks list from our store
  //containing tasks from the backend
  // const tasks = ref([]);
  const store = useTasksStore();
  const searchQuery = ref("");

  const addTask = async (newTask) => {
    await store.createTask(newTask);
  };

  const editTask = async (taskId, updatedTask) => {
    await store.editTask(taskId, updatedTask);
  };

  const deleteTask = async (taskId) => {
    await store.deleteTask(taskId);
  };

  const markTaskCompleted = async (taskId) => {
    await store.markTaskCompleted(taskId);
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
    editTask,
    deleteTask,
    searchQuery,
    setSearchQuery,
    filteredTasks,
    markTaskCompleted,
  };
}
