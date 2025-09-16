<template>
  <div class="page-container">
    <!-- title plus add button -->
    <div class="header">
      <h2>Your boards</h2>
      <v-btn class="create-btn" @click="showBoardForm = true">
        Create board
      </v-btn>
    </div>

    <!-- Loop over boards vertically -->
    <div v-if="boards.length" class="boards-container">
      <BoardCard
        v-for="board in boards"
        :key="board.id"
        :title="board.title"
        :gradient="board.gradient"
        @delete-board="deleteBoard(board.id)"
      />
    </div>
    <div v-else>
      <p>No boards yet. Create one!</p>
    </div>

    <!-- Board Form Modal -->
    <v-dialog v-model="showBoardForm" persistent>
      <BoardForm
        @board-created="handleBoardCreated"
        @close="showBoardForm = false"
      />
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBoardsStore } from "@/stores/boards";
import BoardCard from "@/components/BoardCard.vue";
import BoardForm from "@/components/BoardForm.vue";

const showBoardForm = ref(false);
const boardsStore = useBoardsStore();
const boards = boardsStore.boards;

// Load boards from backend when component mounts
onMounted(() => {
  boardsStore.fetchBoards();
});

// Add new board via store
const handleBoardCreated = async (newBoard) => {
  await boardsStore.createBoard(newBoard);
  showBoardForm.value = false;
};

// Delete a board via store
const deleteBoard = async (id) => {
  await boardsStore.deleteBoard(id);
};
</script>

<style scoped>
.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 14px 24px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.create-btn {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-transform: none !important;
  border-radius: 12px !important;
  font-weight: 400 !important;
}
.boards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>


















