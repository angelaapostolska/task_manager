<template>
  <v-card class="card-design" elevation="16" max-width="400">
    <!-- Card gradient -->
    <div class="card-top" :style="{ background: gradient || defaultGradient }"></div>

    <v-card-item>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>Card subtitle secondary text</v-card-subtitle>
    </v-card-item>

    <!-- Buttons -->
    <v-card-actions>
      <v-btn color="primary" text @click.stop="goToAddTask">
        Add Task
      </v-btn>
      <v-btn color="red" text @click.stop="showDeleteDialog = true">
        Delete
      </v-btn>
    </v-card-actions>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this board?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: { type: Number, required: true },
  title: { type: String, default: "Card title" },
  gradient: { type: String, default: "" },
});

const emit = defineEmits(["delete-board"]);

const defaultGradient = "linear-gradient(180deg, #667eea 0%, #764ba2 100%)";
const showDeleteDialog = ref(false);

const router = useRouter();

const confirmDelete = () => {
  showDeleteDialog.value = false;
  emit("delete-board");
};

// Minimal change: redirects to task page with boardId query param
const goToAddTask = () => {
  router.push({ path: "/home/tasks", query: { boardId: props.id } });
};
</script>

<style scoped lang="scss">
@import "../styles/gradients.scss";

.card-design {
  border-radius: 12px;
}

.card-top {
  height: 80px;
  background: $purple-gradient;
}
</style>	
















