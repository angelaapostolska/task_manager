import { useBoardsStore } from "@/stores/boards";

export function useBoards() {
  const store = useBoardsStore();

  const fetchBoards = async () => {
    await store.fetchBoards();
  };

  const addBoard = async (newBoard) => {
    await store.createBoard(newBoard);
  };

  const editBoard = async (boardId, updatedBoard) => {
    await store.editBoard(boardId, updatedBoard);
  };

  const deleteBoard = async (boardId) => {
    await store.deleteBoard(boardId);
  };

  return {
    boards: store.boards,
    fetchBoards,
    addBoard,
    editBoard,
    deleteBoard,
  };
}
