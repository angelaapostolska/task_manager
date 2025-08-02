<template>
  <v-card
    class="mb-4 task-card rounded-lg"
    elevation="12"
    hover
    max-width="400"
    :variant="task.state === 'completed' ? 'plain' : 'elevated'"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="card-inner">
      <!-- checkbox + title -->
      <v-card-title class="title-row d-flex align-start">
        <input
          type="checkbox"
          class="checkbox-align"
          :checked="task.state === 'completed'"
          :disabled="task.state === 'completed'"
          @change="onCheckboxChange"
        />
        <div class="title-date-container" ms-2>
          <label
            class="task-label"
            :class="{ 'line-through': task.state === 'completed' }"
            >{{ task.title }}</label
          >
          <!-- date + time remaining -->
          <div class="date-countdown d-flex justify-space-between">
            <span class="date-text"> {{ task.end_date }}</span>
            <span
              v-if="showCountdown"
              class="countdown-text text-red font-weight-bold"
            >
              Time left: {{ countdown }}
            </span>
          </div>
        </div>
      </v-card-title>

      <!--message, implement it elsewhere, not in the task card -->
      <!-- <v-card-text v-if="sassMessage" class="sass-message">
      💬 {{ sassMessage }}
    </v-card-text> -->

      <!-- descirption -->
      <v-card-text v-if="task.description" class="task-description pa-0">
        {{ task.description }}
      </v-card-text>

      <!-- <v-card-text v-if="showCountdown" class="text-red font-weight-bold">
      ⏳ Time left: {{ countdown }}
    </v-card-text> -->

      <!-- actions buttons -->
      <v-card-actions class="actions-row">
        <v-menu open-on-hover location="bottom start">
          <template #activator="{ props }">
            <v-btn color="primary" v-bind="props" size="small">Actions</v-btn>
          </template>
          <v-list>
            <v-list-item @click="openEditForm">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleDelete(task.id)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import confetti from "canvas-confetti";
import { useTasks } from "@/composables/useTasks";

const emit = defineEmits(["status-updated"]);
const { deleteTask, markTaskCompleted } = useTasks();

const props = defineProps({
  task: Object,
});

const countdown = ref("");
const showCountdown = ref(false);
const sassMessage = ref("");
const isHovered = ref(false);
let intervalId = null;

const sassMessages = [
  "Look at you go! Don't slack off now.",
  "Yasss queen, task slayed!",
  "Did someone call a productivity god?",
  "Keep it up, superstar!",
  "Whoa, slow down! Just kidding, keep smashing it.",
  "Is that a task or a masterpiece?",
  "Who needs coffee when you’ve got skills like this?",
  "Urgent? More like legendary.",
];

onMounted(() => {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  checkTime();
  intervalId = setInterval(checkTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

function checkTime() {
  const now = new Date();
  const end = new Date(props.task.end_date);
  const diff = end - now;

  if (
    diff <= 2 * 60 * 60 * 1000 &&
    diff > 0 &&
    props.task.state !== "completed"
  ) {
    if (Notification.permission === "granted") {
      new Notification("⚠️ Urgent task due in 2 hours!", {
        body: props.task.title,
      });
    }
  }

  if (diff > 0 && diff <= 24 * 60 * 60 * 1000) {
    showCountdown.value = true;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    countdown.value = `${hours}h ${minutes}m ${seconds}s`;
  } else {
    showCountdown.value = false; // Hide countdown if completed or past due
  }
}

const onCheckboxChange = async (event) => {
  console.log("Checked task is: ", props.task);
  console.log("ID: ", props.task.id);

  props.task.completed = event.target.checked ? "completed" : "pending";
  if (event.target.checked) {
    await markTaskCompleted(props.task.id);
  }

  updateCompletionStatus();
};

const updateCompletionStatus = () => {
  console.log(
    `Task ${props.task.title} marked as ${
      props.task.state === "completed" ? "completed" : "incomplete"
    }`
  );

  // Conffetti
  if (props.task.state === "completed") {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    sassMessage.value =
      sassMessages[Math.floor(Math.random() * sassMessages.length)];
  } else {
    sassMessage.value = "";
  }

  emit("status-updated", props.task);
};

const formState = inject("formState");

const openEditForm = () => {
  formState.taskToEdit = props.task;
  formState.showEditForm = true;
};

const handleDelete = async (taskId) => {
  await deleteTask(taskId);
};
</script>

<style scoped>
.card-inner {
  padding: 14px 7px;
}
.task-label {
  font-size: 18px;
  font-weight: 500;
  max-width: 250px;
  white-space: normal;
  word-break: break-word;
  line-height: 1.2;
}
.title-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding-bottom: 8px;
}
.title-date-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.date-countdown {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  margin-top: 2px;
}
.task-description {
  font-size: 14px;
  color: #444;
  margin: 4px 0 4px 39px;
  max-height: 6em;
  overflow: hidden;
  text-overflow: ellipsis;
}
.actions-row {
  justify-content: flex-start;
}
.line-through {
  text-decoration: line-through;
  opacity: 0.6;
}
.checkbox-align {
  margin-top: 5px;
  vertical-align: top;
}
.v-card {
  cursor: pointer;
  background-color: #fafafa !important;
  /* Wiggle Animation on Hover */
  transition: transform 0.15s ease-in-out;
}
.task-card:hover {
  animation: wiggle 0.4s ease-in-out;
}
@keyframes wiggle {
  0%,
  100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

/* Sass message style */
.sass-message {
  font-style: italic;
  color: #7b1fa2; /* purple sass vibes */
  margin-bottom: 6px;
  user-select: none;
  pointer-events: none;
}

.date-text {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  margin-top: 4px;
}
</style>
