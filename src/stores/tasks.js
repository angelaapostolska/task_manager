// Utilities
import { defineStore } from "pinia";
import _axios, { setAuthToken } from "../plugins/axios";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {},
  actions: {
    async fetchTasks() {
      this.isLoading = true;
      try {
        const response = await _axios.get("/tasks");
        // If successful
        this.tasks = response.data.data;
        console.log("Successfully fetched tasks: ", this.tasks.length);
      } catch (err) {
        // Error handling
        this.error = err;
        console.error("Failed to fetch tasks: ", err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
