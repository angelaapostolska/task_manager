<template>
  <v-card
    :variant="task.completed ? 'plain' : 'elevated'"
    max-width="400"
    class="mb-4"
    elevation="12"
    hover
  >
    <v-card-title class="title d-flex align-center">
      <input
        type="checkbox"
        v-model="task.completed"
        @change="updateCompletionStatus"
      />
      <label
        class="ms-2 task-label"
        :class="{ 'line-through': task.completed }"
        >{{ task.name }}</label
      >
    </v-card-title>

    <v-card-text>{{ task.description }}</v-card-text>

    <v-card-text class="text-caption text-grey-darken-2 date-text">
      End date: {{ task.endDate }}
    </v-card-text>

    <v-card-actions>
      <v-btn @click="openEditForm" color="black">Edit</v-btn>
      <v-btn @click="deleteTask" color="deep-purple-darken-4">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  task: Object,
});

const taskClass = computed(() => {
  switch (props.task.urgency) {
    case "Urgent":
      return "urgent-task";
    case "Mid":
      return "mid-task";
    case "Least Urgent":
      return "least-urgent-task";
    default:
      return "";
  }
});

const updateCompletionStatus = () => {
  console.log(
    `Task ${props.task.name} marked as ${
      props.task.completed ? "completed" : "incomplete"
    }`
  );
};

const openEditForm = () => {
  console.log(`Editing task: ${props.task.name}`);
};

const deleteTask = () => {
  console.log(`Deleted task: ${props.task.name}`);
};
</script>

<style scoped>
..task-label {
  font-size: 22px;
  font-weight: 500;
}
.line-through {
  text-decoration: line-through;
  opacity: 0.6;
}
.v-card {
  cursor: pointer;
  background-color: #ede7f6 !important;
}
.date-text {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  margin-top: 4px;
}
</style>
