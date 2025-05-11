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

  return { tasks, addTask, updateTask };
}
