<template>
  <v-card
    class="pa-6 mx-auto gradient-bg"
    elevation="10"
    max-width="682px"
    width="100%"
  >
    <v-icon
      icon="mdi-close"
      size="20"
      class="close-icon"
      @click="handleClose"
      style="cursor: pointer"
    />
    <v-row>
      <v-col cols="12" md="12">
        <v-form @submit.prevent="addTaskHandler" class="form-selection">
          <v-text-field
            v-model="taskName"
            label="Task Title *"
            variant="outlined"
            :rules="[(v) => !!v || 'Task name is required']"
          />

          <v-select
            v-model="selectedUrgency"
            :items="urgencies"
            label="Urgency"
            variant="outlined"
            :rules="[(v) => !!v || 'Please select urgency']"
          />

          <!-- Implement boards -->
          <v-select
            label="Board *"
            variant="outlined"
            :items="['Board 1', 'Board 2']"
          />

          <v-textarea
            v-model="taskDescription"
            label="Description"
            variant="outlined"
            auto-grow
          />

          <v-text-field
            v-model="taskEndDate"
            label="End Date"
            type="date"
            variant="outlined"
          >
          </v-text-field>

          <!-- Buttons -->
          <div class="button-group">
            <v-btn
              class="cancel-btn"
              variant="outlined"
              block
              @click="handleClose"
            >
              Cancel
            </v-btn>
            <v-btn class="create-btn" type="submit" block> Create Task </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useTasks } from "@/composables/useTasks";

defineProps({
  category: String,
});

const emit = defineEmits(["add-task", "close-form"]);

const taskName = ref("");
const taskDescription = ref("");
const selectedUrgency = ref(null);
const urgencies = ["urgent", "mid", "least urgent"];
const taskEndDate = ref("");

// const addTaskGlobal = inject("addTask");
const { addTask } = useTasks();

const addTaskHandler = async () => {
  if (!taskName.value || !selectedUrgency.value) return;

  await addTask({
    title: taskName.value,
    category: selectedUrgency.value,
    description: taskDescription.value,
    end_date: taskEndDate.value,
    state: "pending",
  });

  //check whether you need this in the parent??
  emit("add-task");

  taskName.value = "";
  taskDescription.value = "";
  selectedUrgency.value = null;
  taskEndDate.value = "";
};
const handleClose = () => {
  emit("close-form");
};
</script>
<style scoped>
.gradient-bg {
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
}
.close-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fff;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: #6c757d;
}
.button-group {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}
.cancel-btn {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  flex: 1;
}

.create-btn {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
}
</style>
