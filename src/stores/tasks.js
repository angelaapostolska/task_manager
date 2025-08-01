// Utilities
import { defineStore } from "pinia";
import _axios, { setAuthToken } from "../plugins/axios";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    isLoading: false,
    todayStats: {
      totalTasksToday: 0,
      completedTasksToday: 0,
      percentage: 0,
    },
  }),
  getters: {},
  actions: {
    async fetchTasks(filters = {}) {
      this.isLoading = true;
      try {
        const response = await _axios.get("/myTasks", {
          params: filters,
        });
        // If successful
        this.tasks = response.data.data;
        console.log("Successfully fetched tasks: ", this.tasks.length);
        // this.tasks.forEach((task) => {
        //   console.log(`Task ${task.id} is matched: `, task.matched);
        // });
      } catch (err) {
        // Error handling
        this.error = err;
        console.error("Failed to fetch tasks: ", err);
      } finally {
        this.isLoading = false;
      }
    },
    //fetch daily accomplishments stats
    async fetchTodayStats() {
      try {
        const response = await _axios.get("/myTasks/todayStats");
        this.todayStats = response.data;
        console.log("Fetched today's stats", this.todayStats);
      } catch (err) {
        console.error("Failed to fetch stats: ", err);
      }
    },
    async createTask(newTaskData) {
      try {
        const response = await _axios.post("/tasks", newTaskData);
        //this.tasks.push(response.data.data);
        console.log("Task created successfully!");
      } catch (err) {
        console.error("Failed to create task: ", err);
      }
    },
    async editTask(taskId, updatedTaskData) {
      try {
        const response = await _axios.put(`/tasks/${taskId}`, updatedTaskData);
        const index = this.tasks.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          this.tasks[index] = response.data.data;
        }
        console.log("Task updated successfully!");
      } catch (err) {
        console.error("Failed to update task: ", err);
      }
    },
    async deleteTask(taskId) {
      try {
        await _axios.delete(`/tasks/${taskId}`);
        this.tasks = this.tasks.filter((t) => t.id !== taskId);
        console.log("Task deleted successfully!");
      } catch (err) {
        console.error("Failed to delete task: ", err);
      }
    },
    async markTaskCompleted(taskId) {
      try {
        await _axios.patch(`/tasks/${taskId}/completeTask`);
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) task.state = "completed";
        console.log("Task marked completed with backend");
      } catch (err) {
        console.error("Failed to mark task as completed:", err);
      }
    },
  },
});
