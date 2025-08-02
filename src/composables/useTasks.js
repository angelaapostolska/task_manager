import { ref, computed, watch } from "vue";
import { useTasksStore } from "@/stores/tasks";

export function useTasks() {
  //change the old reactive tasks list with the tasks list from our store
  //containing tasks from the backend
  // const tasks = ref([]);
  const store = useTasksStore();
  const searchQuery = ref("");

  const fetchTasks = async (filters = {}) => {
    await store.fetchTasks(filters);
  };

  const addTask = async (newTask) => {
    await store.createTask(newTask);
    await fetchTodayStats();
  };

  const editTask = async (taskId, updatedTask) => {
    await store.editTask(taskId, updatedTask);
    await fetchTodayStats();
  };

  const deleteTask = async (taskId) => {
    await store.deleteTask(taskId);
    await fetchTodayStats();
  };

  const markTaskCompleted = async (taskId) => {
    await store.markTaskCompleted(taskId);
  };
  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const fetchTodayStats = async () => {
    await store.fetchTodayStats();
  };

  const todayStats = computed(() => store.todayStats);

  //reacts to the changes written in the search bar = search query
  watch(searchQuery, async (val) => {
    console.log("Search query changed to: ", val);
    await store.fetchTasks({ search: val });
  });

  const tasks = computed(() => store.tasks);

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    searchQuery,
    setSearchQuery,
    markTaskCompleted,
    fetchTodayStats,
    todayStats,
    fetchTasks,
  };
}
