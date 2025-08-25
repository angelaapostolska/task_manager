// Utilities
import { defineStore } from "pinia";
import _axios from "../plugins/axios";

export const useBoardsStore = defineStore("boards", {
  state: () => ({
    boards: [],
  }),
  getters: {},
  actions: {
    async fetchBoards() {
      try {
        const response = await _axios.get("/boards");
        // If successful
        this.boards = response.data;
        console.log("Successfully fetched boards: ", this.boards.length);
      } catch (err) {
        // Error handling
        this.error = err;
        console.error("Failed to fetch boards: ", err);
      } finally {
        this.isLoading = false;
      }
    },
    async createBoard(newBoardData) {
      try {
        const response = await _axios.post("/boards", newBoardData);
        this.boards.push(response.data);
        console.log("Board created successfully!");
      } catch (err) {
        console.error("Failed to create board: ", err);
      }
    },
    async editBoard(boardId, updatedBoardData) {
      try {
        const response = await _axios.put(
          `/boards/${boardId}`,
          updatedBoardData
        );
        const index = this.boards.findIndex((b) => b.id === boardId);
        if (index !== -1) {
          this.boards[index] = response.data;
        }
        console.log("Board updated successfully!");
      } catch (err) {
        console.error("Failed to update board: ", err);
      }
    },
    async deleteBoard(boardId) {
      try {
        await _axios.delete(`/boards/${boardId}`);
        this.boards = this.boards.filter((b) => b.id !== boardId);
        console.log("Board deleted successfully!");
      } catch (err) {
        console.error("Failed to delete board: ", err);
      }
    },
  },
});










