<template>
  <v-card
    class="pa-6 mx-auto"
    elevation="10"
    max-width="682px"
    width="100%"
    color="grey-lighten-2"
  >
    <v-icon
      icon="mdi-close"
      size="20"
      class="position-absolute top-0 right-0 ma-2"
      @click="handleClose"
      style="cursor: pointer"
      color="grey-darken-1"
    />
    <v-row>
      <!-- Left side graphic -->
      <v-col
        cols="12"
        md="6"
        class="left-side d-flex align-center justify-center"
      >
        <v-img
          src="../assets/graphic.png"
          alt="Illustration"
          max-width="250"
          contain
        />
      </v-col>

      <!-- Right side form -->
      <v-col cols="12" md="6">
        <v-form @submit.prevent="addTaskHandler">
          <v-text-field
            v-model="taskName"
            label="Task Name"
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

          <v-btn color="deep-purple-lighten-1" class="mt-6" type="submit" block>
            Submit
          </v-btn>
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
.left-side {
  background-image: url("../assets/taskFormBg.png");
  background-size: cover;
  background-position: center;
}
</style>
