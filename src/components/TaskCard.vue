<template>
  <v-card
    class="mb-4 task-card"
    elevation="12"
    hover
    max-width="400"
    :variant="task.completed ? 'plain' : 'elevated'"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <v-card-title class="title d-flex align-center">
      <input
        v-model="task.completed"
        type="checkbox"
        @change="updateCompletionStatus"
      >
      <label
        class="ms-2 task-label"
        :class="{ 'line-through': task.completed }"
      >{{ task.name }}</label>
    </v-card-title>

    <!-- Sass message -->
    <v-card-text v-if="sassMessage" class="sass-message">
      💬 {{ sassMessage }}
    </v-card-text>

    <v-card-text>{{ task.description }}</v-card-text>

    <v-card-text class="text-caption text-grey-darken-2 date-text">
      End date: {{ task.endDate }}
    </v-card-text>

    <v-card-text v-if="showCountdown" class="text-red font-weight-bold">
      ⏳ Time left: {{ countdown }}
    </v-card-text>

    <v-card-actions>
      <v-btn color="black" @click="openEditForm">Edit</v-btn>
      <v-btn color="deep-purple-darken-4" @click="deleteTask">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import confetti from 'canvas-confetti'

  const props = defineProps({
    task: Object,
  })

  const countdown = ref('')
  const showCountdown = ref(false)
  const sassMessage = ref('')
  const isHovered = ref(false)
  let intervalId = null

  const sassMessages = [
    "Look at you go! Don't slack off now.",
    'Yasss queen, task slayed!',
    'Did someone call a productivity god?',
    'Keep it up, superstar!',
    'Whoa, slow down! Just kidding, keep smashing it.',
    'Is that a task or a masterpiece?',
    'Who needs coffee when you’ve got skills like this?',
    'Urgent? More like legendary.',
  ]

  onMounted(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission()
    }

    checkTime()
    intervalId = setInterval(checkTime, 1000)
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })

  function checkTime () {
    const now = new Date()
    const end = new Date(props.task.endDate)
    const diff = end - now

    if (diff <= 2 * 60 * 60 * 1000 && diff > 0 && !props.task.completed) {
      if (Notification.permission === 'granted') {
        new Notification('⚠️ Urgent task due in 2 hours!', {
          body: props.task.name,
        })
      }
    }

    if (diff > 0 && diff <= 24 * 60 * 60 * 1000) {
      showCountdown.value = true
      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      countdown.value = `${hours}h ${minutes}m ${seconds}s`
    }
  }

  const updateCompletionStatus = () => {
    console.log(
      `Task ${props.task.name} marked as ${
        props.task.completed ? 'completed' : 'incomplete'
      }`
    )

    // 🎉 Confetti magic
    if (props.task.completed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      })

      // Show random sass message on completion
      sassMessage.value = sassMessages[Math.floor(Math.random() * sassMessages.length)]
    } else {
      sassMessage.value = ''
    }
  }

  const openEditForm = () => {
    console.log(`Editing task: ${props.task.name}`)
  }

  const deleteTask = () => {
    console.log(`Deleted task: ${props.task.name}`)
  }
</script>

<style scoped>
.task-label {
  font-size: 22px;
  font-weight: 500;
}
.line-through {
  text-decoration: line-through;
  opacity: 0.6;
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
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

/* Sass message style */
.sass-message {
  font-style: italic;
  color: #7B1FA2; /* purple sass vibes */
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
