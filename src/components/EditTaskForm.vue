<template>
  <v-card
    class="pa-6 mx-auto gradient-bg"
    elevation="10"
    max-width="540px"
    width="100%"
  >
    <!-- Modal Header -->
    <div class="modal-header">
      <h3 class="modal-title">Edit Task</h3>
      <v-icon
        icon="mdi-close"
        size="20"
        class="close-icon"
        @click="handleClose"
        style="cursor: pointer"
      />
    </div>

    <v-row>
      <v-col cols="12" md="12">
        <v-form
          @submit.prevent="editTaskHandler"
          class="form-selection form-wrapper"
        >
          <div class="input-wrapper">
            <label for="taskName" class="custom-label">TASK TITLE *</label>
            <v-text-field
              id="taskName"
              v-model="taskName"
              variant="solo"
              density="compact"
              placeholder="Enter task name.."
              class="custom-input"
              :rules="[(v) => !!v || 'Task name is required']"
              hide-details="auto"
            />
          </div>

          <div class="input-wrapper">
            <label for="selectedUrgency" class="custom-label">URGENCY *</label>
            <v-select
              id="selectedUrgency"
              v-model="selectedUrgency"
              :items="urgencies"
              placeholder="Select urgency.."
              variant="solo"
              density="compact"
              class="custom-input"
              :rules="[(v) => !!v || 'Please select urgency']"
              hide-details="auto"
            />
          </div>

          <div class="input-wrapper">
            <label for="selectedBoard" class="custom-label">BOARD *</label>
            <v-select
              id="selectedBoard"
              v-model="selectedBoard"
              placeholder="Select a board.."
              variant="solo"
              density="compact"
              :items="boards"
              :rules="[(v) => !!v || 'Please select board']"
              class="custom-input"
              hide-details="auto"
            />
          </div>

          <div class="input-wrapper">
            <label for="taskEndDate" class="custom-label">END DATE</label>
            <v-text-field
              id="taskEndDate"
              v-model="taskEndDate"
              label="Choose end date"
              type="date"
              variant="solo"
              density="compact"
              class="custom-input"
              hide-details="auto"
            />
          </div>

          <div class="input-wrapper">
            <label for="taskDescription" class="custom-label"
              >DESCRIPTION</label
            >
            <v-textarea
              id="taskDescription"
              v-model="taskDescription"
              placeholder="Write a description.."
              variant="solo"
              density="compact"
              auto-grow
              hide-details="auto"
              class="custom-input"
            />
          </div>

          <div class="button-group">
            <v-btn class="cancel-btn" variant="solo" @click="handleClose">
              Cancel
            </v-btn>
            <v-btn class="create-btn" type="submit" :disabled="!isFormValid">
              Save Changes
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useTasks } from "@/composables/useTasks";

const props = defineProps({
  task: Object,
});

const emit = defineEmits(["update-task", "close-form"]);

const taskName = ref("");
const taskDescription = ref("");
const selectedUrgency = ref(null);
const selectedBoard = ref(null);
const taskEndDate = ref("");

const urgencies = ["urgent", "mid", "least urgent"];
const boards = ["Board 1", "Board 2"];

const { editTask } = useTasks();

// Prefill the form when the task prop changes
watch(
  () => props.task,
  (task) => {
    if (task) {
      taskName.value = task.title || "";
      taskDescription.value = task.description || "";
      selectedUrgency.value = task.category || null;
      selectedBoard.value = task.board || null;
      taskEndDate.value = task.end_date || "";
    }
  },
  { immediate: true }
);

const isFormValid = computed(() => {
  return !!taskName.value && !!selectedUrgency.value && !!selectedBoard.value;
});

const editTaskHandler = async () => {
  if (!isFormValid.value) return;

  const updatedTask = {
    title: taskName.value,
    category: selectedUrgency.value,
    board: selectedBoard.value,
    description: taskDescription.value,
    end_date: taskEndDate.value,
    state: "pending",
  };

  await editTask(props.task.id, updatedTask);
  emit("update-task");
};

const handleClose = () => {
  emit("close-form");
};
</script>

<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.gradient-bg {
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  padding: 30px !important;
}
.close-icon {
  background: #fff;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #6c757d;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  width: 100%;
}
.cancel-btn {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  flex: 1;
  text-transform: none !important;
  border-radius: 12px !important;
  font-weight: 400 !important;
}
.create-btn {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
  text-transform: none !important;
  border-radius: 12px !important;
  font-weight: 400 !important;
}
.custom-label {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
  color: #333;
}

.input-wrapper {
  margin-bottom: 16px;
}
::v-deep(.custom-input .v-field) {
  background-color: white !important;
  border: 1px solid #f5f5f5 !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.custom-label {
  color: #6c757d;
  font-weight: 400;
}
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.modal-title {
  font-size: 22px;
}
.create-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
