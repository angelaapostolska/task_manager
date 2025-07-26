import { ref, computed, watch } from "vue";
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

  //new implementation
  const fetchTasksByBoard = async (boardId) => {
    await store.fetchTodayStats();
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

  const filteredTasks = computed(() =>
    store.tasks.map((task) => ({
      ...task,
      //using the same flag from the backend
      matched: task.matched || false, // fallback false if undefined
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
    fetchTasksByBoard,
    fetchTodayStats,
    todayStats,
  };
}
