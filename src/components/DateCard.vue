<template>
  <div class="container-wrapper">
    <div class="card">
      <div class="date-info">
        <span class="label text-body-1 text-grey-darken-1">TODAY</span>
        <span class="date"> {{ formattedDate }}</span>
      </div>
      <div class="right">
        <div class="boards-dropdown">
          <span class="board-label">Board</span>
          <v-select
            v-model="selectedBoard"
            :items="boards"
            item-title="title"
            item-value="id"
            variant="plain"
            hide-details
            :menu-props="{ offsetY: true }"
            class="custom-board-select"
            :placeholder="selectedBoardLabel"
            @update:model-value="handleBoardSelect"
          >
          </v-select>
        </div>
        <v-btn
          prepend-icon="mdi-plus"
          class="create-btn"
          @click="handleOpenForm"
        >
          Create Task
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useBoardsStore } from "@/stores/boards";
import { useBoards } from "@/composables/useBoards";

const formState = inject("formState");

//boards management
const { fetchBoards } = useBoards();
const boardsStore = useBoardsStore();
const boards = computed(() => boardsStore.boards);
onMounted(() => {
  fetchBoards();
});

const emit = defineEmits(["board-selected"]);

const today = new Date();
const formattedDate = computed(() => {
  const day = today.getDate();
  const month = today.toLocaleString("en-GB", { month: "long" });
  const weekday = today.toLocaleString("en-GB", { weekday: "long" });

  return `${day} ${month}, ${weekday}`;
});

const selectedBoard = ref(null);

const handleBoardSelect = (boardId) => {
  const selected = boards.value.find((b) => b.id === boardId);
  console.log("Selected board: ", selected);

  emit("board-selected", selected);
};

const selectedBoardLabel = computed(() => {
  const board = boards.value.find((b) => b.id === selectedBoard.value);
  return board ? board.title : "Board";
});

const handleOpenForm = () => {
  //dynamically creates another property to formState to a ref value
  //for the selected board
  //set the value equal to the board selected in the dropdown
  formState.selectedBoard = selectedBoard.value;
  formState.showForm = true;
};
</script>
<style scoped>
.card {
  background: linear-gradient(to right, #ffffff 0%, #f8f9fa 100%);
  border-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 0 16px;
}
.date-info {
  width: 25%;
  padding: 12px;
  display: flex;
  flex-direction: column;
}
.right {
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-left: 4px solid transparent;
  border-image: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-image-slice: 1;
}
.container-wrapper {
  padding: 24px;
}
.date {
  font-size: x-large;
  font-weight: 600;
}
.boards-dropdown {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-weight: 600;
  color: black;
}
.boards-dropdown .label {
  font-size: 16px;
  line-height: 1;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  height: 40px; /* Match v-select height */
}
.custom-board-select {
  background-color: transparent;
  border: none;
  color: white;
  min-width: 160px;
  max-width: 240px;
  padding: 4px 8px;
}
.custom-board-select .v-field__outline {
  display: none;
}
.custom-board-select .v-field {
  height: 40px;
  display: flex;
  align-items: center;
}
.custom-board-select .v-field__input {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  height: 100%;
}
.custom-board-select .v-select__selections {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0;
}
.board-label {
  margin-top: 12px;
  font-size: x-large;
}
::v-deep(.custom-board-select .v-field__input),
::v-deep(.custom-board-select .v-select__selections),
::v-deep(.custom-board-select .v-list-item-title) {
  color: black !important;
}
.create-btn {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-transform: none !important;
  border-radius: 12px !important;
  font-weight: 400 !important;
}
</style>
