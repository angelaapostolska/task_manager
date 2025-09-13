<template>
  <div class="page-container pa-6">
    <!-- Animated container wrapper -->
    <transition mode="out-in" :name="transitionName">

      <!-- FIRST CONTAINER -->
      <div
        v-if="activeContainer === 1"
        key="container1"
        class="cards-container pa-8"
      >
        <h2 class="text-h6 font-weight-bold mb-6">
          Task Completion Statistics
        </h2>

        <!-- Top three rectangular cards -->
        <div class="top-cards">
          <v-card
            class="stat-rect-top d-flex flex-column align-center justify-center white--text"
            style="background: linear-gradient(135deg,#ff416c,#ff4b2b)"
          >
            <h2 class="text-h4 font-weight-bold">{{ stats.urgent.completed }}</h2>
            <p class="mb-1">Urgent Completed</p>
            <small>out of {{ stats.urgent.total }} tasks</small>
          </v-card>

          <v-card
            class="stat-rect-top d-flex flex-column align-center justify-center white--text"
            style="background: linear-gradient(135deg,#4776e6,#8e54e9)"
          >
            <h2 class="text-h4 font-weight-bold">{{ stats.medium.completed }}</h2>
            <p class="mb-1">Medium Completed</p>
            <small>out of {{ stats.medium.total }} tasks</small>
          </v-card>

          <v-card
            class="stat-rect-top d-flex flex-column align-center justify-center white--text"
            style="background: linear-gradient(135deg,#11998e,#38ef7d)"
          >
            <h2 class="text-h4 font-weight-bold">{{ stats.low.completed }}</h2>
            <p class="mb-1">Low Completed</p>
            <small>out of {{ stats.low.total }} tasks</small>
          </v-card>
        </div>

        <!-- Bottom two wider cards -->
        <div class="bottom-cards">
          <v-card class="stat-rect pa-6 d-flex flex-column">
            <h3 class="text-subtitle-1 font-weight-bold mb-4">
              Completion Progress
            </h3>

            <div v-for="priority in ['urgent', 'medium', 'low']" :key="priority" class="mb-4">
              <div class="d-flex justify-space-between">
                <span>{{ priority.charAt(0).toUpperCase() + priority.slice(1) }} Priority</span>
                <span>
                  {{ stats[priority].total > 0
                  ? Math.round((stats[priority].completed / stats[priority].total) * 100)
                  : 0 }}%
                </span>
              </div>
              <v-progress-linear
                :color="priorityColors[priority]"
                height="8"
                rounded
                :value="stats[priority].total > 0
                  ? (stats[priority].completed / stats[priority].total) * 100
                  : 0"
              />
              <small>{{ stats[priority].completed }} of {{ stats[priority].total }} tasks completed</small>
            </div>
          </v-card>

          <v-card
            class="stat-rect pa-6 d-flex flex-column align-center justify-center"
          >
            <h3 class="text-subtitle-1 font-weight-bold mb-4">
              Overall Summary
            </h3>
            <v-progress-circular
              color="indigo"
              :size="120"
              :value="overallProgress"
              :width="10"
            >
              <strong>{{ Math.round(overallProgress) }}%</strong>
            </v-progress-circular>
            <p class="mt-3">{{ totalCompleted }} of {{ totalTasks }} tasks<br>Total Progress</p>
          </v-card>
        </div>

        <!-- Right arrow -->
        <button class="nav-arrow right" @click="goNext">›</button>
      </div>

      <!-- SECOND CONTAINER -->
      <div
        v-else-if="activeContainer === 2"
        key="container2"
        class="cards-container pa-8"
      >
        <h2 class="text-h6 font-weight-bold mb-6">Other Task Statistics</h2>

        <div class="bottom-cards second-container">
          <!-- Most Productive Day/Hour -->
          <v-card
            class="stat-rect-second pa-6 d-flex flex-column align-center justify-center white--text"
            style="background: linear-gradient(135deg,#a29bfe,#81ecec)"
          >
            <h3 class="text-subtitle-1 font-weight-bold mb-4 bigger-text">
              Most Productive
            </h3>
            <h2 class="text-h3 font-weight-bold bigger-text">{{ mostProductive.day }} {{ mostProductive.hour }}</h2>
            <small class="bigger-small">{{ mostProductive.count }} tasks completed</small>
          </v-card>

          <!-- Overdue Tasks -->
          <v-card
            class="stat-rect-second pa-6 d-flex flex-column align-center justify-center white--text"
            style="background: linear-gradient(135deg,#fab1a0,#ff7675)"
          >
            <h3 class="text-subtitle-1 font-weight-bold mb-4 bigger-text">
              Overdue Tasks
            </h3>
            <h2 class="text-h3 font-weight-bold bigger-text">{{ overdueTasks }}</h2>
            <small class="bigger-small">tasks missed their deadlines</small>
          </v-card>

          <!-- On-time Completion Rate -->
          <v-card
            class="stat-rect-second pa-6 d-flex flex-column align-center justify-center white--text"
            style="background: linear-gradient(135deg,#55efc4,#00b894)"
          >
            <h3 class="text-subtitle-1 font-weight-bold mb-4 bigger-text">
              On-time Completion
            </h3>
            <v-progress-circular
              color="white"
              :size="130"
              :value="onTimeRate"
              :width="12"
            >
              <strong class="bigger-text">{{ Math.round(onTimeRate) }}%</strong>
            </v-progress-circular>
            <small class="bigger-small">completed before deadline</small>
          </v-card>
        </div>

        <!-- Left & Right arrows -->
        <button class="nav-arrow left" @click="goPrev">‹</button>
        <button class="nav-arrow right" @click="goNext">›</button>
      </div>

      <!-- THIRD CONTAINER -->
      <div
        v-else
        key="container3"
        class="cards-container pa-8"
      >
        <h2 class="text-h6 font-weight-bold mb-6">Task Mastery</h2>

        <div class="bottom-cards third-container">
          <!-- Task Mastery Level -->
          <v-card
            class="stat-rect pa-6 d-flex flex-column align-center justify-center"
            style="background: linear-gradient(135deg,#fd79a8,#ffeaa7); height: 350px;"
          >
            <h3 class="text-subtitle-1 font-weight-bold mb-4">🏆 Task Mastery Level</h3>
            <h2 class="text-h2 font-weight-bold mb-4">Level {{ currentLevel }}</h2>

            <v-progress-linear
              class="mb-3"
              color="deep-purple accent-4"
              height="16"
              rounded
              :value="xpProgress"
            />

            <p class="mb-2">{{ totalXP }} XP earned</p>
            <small>{{ Math.round(xpProgress) }}% to next level</small>
          </v-card>

          <!-- Streak Tracker -->
          <v-card
            class="stat-rect pa-6 d-flex flex-column align-center justify-center"
            style="background: linear-gradient(135deg,#ffff99,#a8e6cf); height: 350px;"
          >
            <h3 class="text-subtitle-1 font-weight-bold mb-4">🔥 Streak Tracker</h3>
            <h2 class="text-h2 font-weight-bold">{{ currentStreak }} Days</h2>
            <p class="mt-2">Longest Streak: {{ longestStreak }} days</p>
          </v-card>

          <!-- Average Completion Time -->
          <v-card
            class="stat-rect pa-6 d-flex flex-column align-center justify-center"
            style="background: linear-gradient(135deg,#ffeaa7,#ffb347); height: 350px;"
          >
            <h3 class="text-subtitle-1 font-weight-bold mb-4">⏱️ Avg Completion Time</h3>
            <h2 class="text-h2 font-weight-bold">{{ avgCompletionTime }}</h2>
            <p class="mt-2">per task on average</p>
          </v-card>
        </div>

        <!-- Left arrow -->
        <button class="nav-arrow left" @click="goPrev">‹</button>
      </div>

    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
// ✅ fixed import
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';

// Active container & animation
const activeContainer = ref(1);
const transitionName = ref('slide-right');
const goNext = () => {
  if (activeContainer.value < 3) {
    transitionName.value = 'slide-right';
    activeContainer.value += 1;
  }
};
const goPrev = () => {
  if (activeContainer.value > 1) {
    transitionName.value = 'slide-left';
    activeContainer.value -= 1;
  }
};

// Use tasks from Pinia store
const taskStore = useTasksStore();
const { tasks } = storeToRefs(taskStore);

const priorityColors = { urgent: 'pink', medium: 'indigo', low: 'green' };

// First container stats
const stats = computed(() => {
  const priorities = ['urgent', 'medium', 'low'];
  const result = {};
  priorities.forEach(p => {
    const filtered = tasks.value.filter(t => t.priority === p);
    const completed = filtered.filter(t => t.completed).length;
    result[p] = { completed, total: filtered.length };
  });
  return result;
});
const totalCompleted = computed(() => stats.value.urgent.completed + stats.value.medium.completed + stats.value.low.completed);
const totalTasks = computed(() => stats.value.urgent.total + stats.value.medium.total + stats.value.low.total);
const overallProgress = computed(() => totalTasks.value > 0 ? (totalCompleted.value / totalTasks.value) * 100 : 0);

// Second container stats
const overdueTasks = computed(() => tasks.value.filter(t => !t.completed && new Date(t.dueAt) < new Date()).length);
const onTimeRate = computed(() => {
  const completedTasks = tasks.value.filter(t => t.completed);
  if (completedTasks.length === 0) return 0;
  const onTime = completedTasks.filter(t => new Date(t.completedAt) <= new Date(t.dueAt)).length;
  return (onTime / completedTasks.length) * 100;
});
const mostProductive = computed(() => {
  const counter = {};
  tasks.value.filter(t => t.completed).forEach(t => {
    const d = new Date(t.completedAt);
    const key = `${d.toLocaleDateString('en-US', { weekday: 'long' })} ${d.getHours()}:00`;
    counter[key] = (counter[key] || 0) + 1;
  });
  const sorted = Object.entries(counter).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return { day: '-', hour: '', count: 0 };
  const [key, count] = sorted[0];
  const [day, hour] = key.split(' ');
  return { day, hour, count };
});

// Third container stats: Task Mastery
const xpPerTask = 10;
const totalXP = computed(() => tasks.value.filter(t => t.completed).length * xpPerTask);
const currentLevel = computed(() => Math.floor(totalXP.value / 50) + 1);
const xpProgress = computed(() => (totalXP.value % 50) / 50 * 100);

// Streak Tracker
const currentStreak = computed(() => {
  const completedDates = tasks.value
    .filter(t => t.completed)
    .map(t => new Date(t.completedAt).toDateString());
  const uniqueDates = [...new Set(completedDates)].sort((a, b) => new Date(a) - new Date(b));

  let streak = 0, prev = null;
  uniqueDates.forEach(date => {
    if (prev && (new Date(date) - new Date(prev)) === 86400000) {
      streak++;
    } else {
      streak = 1;
    }
    prev = date;
  });
  return streak;
});
const longestStreak = computed(() => {
  const completedDates = tasks.value
    .filter(t => t.completed)
    .map(t => new Date(t.completedAt).toDateString());
  const uniqueDates = [...new Set(completedDates)].sort((a, b) => new Date(a) - new Date(b));

  let streak = 0, maxStreak = 0, prev = null;
  uniqueDates.forEach(date => {
    if (prev && (new Date(date) - new Date(prev)) === 86400000) {
      streak++;
    } else {
      streak = 1;
    }
    maxStreak = Math.max(maxStreak, streak);
    prev = date;
  });
  return maxStreak;
});

// Average Completion Time
const avgCompletionTime = computed(() => {
  const completedTasks = tasks.value.filter(t => t.completed && t.completedAt);
  if (completedTasks.length === 0) return 'N/A';
  const totalHours = completedTasks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const avg = totalHours / completedTasks.length;
  return `${avg.toFixed(1)} hrs`;
});
</script>

<style scoped>
.page-container { flex: 1; display: flex; flex-direction: column; }
.cards-container { background: #f8f8f8; border-radius: 20px; box-shadow: 0 6px 14px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 40px; position: relative; overflow: hidden; min-height: 600px; }
.top-cards { display: flex; gap: 70px; justify-content: center; margin-top: -10px; }
.stat-rect-top { width: 230px; height: 140px; border-radius: 14px; box-shadow: 0 3px 8px rgba(0,0,0,0.15); text-align: center; color: white; }
.bottom-cards { display: flex; gap: 60px; justify-content: center; }
.cards-container:nth-child(3) .bottom-cards { flex-wrap: wrap; gap: 40px; justify-content: center; }
.stat-rect { width: 440px; height: 280px; border-radius: 14px; box-shadow: 0 3px 8px rgba(0,0,0,0.15); }
.stat-rect-second { width: 440px; height: 350px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.15); text-align:center; padding:20px; color:white; }
.bigger-text { font-size: 1.6rem; }
.bigger-small { font-size: 1.1rem; }
.nav-arrow { position: absolute; top: 50%; transform: translateY(-50%); font-size: 32px; font-weight: bold; background: white; border-radius: 50%; border: none; width: 48px; height: 48px; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.2); }
.nav-arrow.right { right: 20px; }
.nav-arrow.left { left: 20px; }
.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active { transition: all 0.5s ease; }
.slide-right-enter-from { opacity: 0; transform: translateX(100%); }
.slide-right-leave-to { opacity: 0; transform: translateX(-100%); }
.slide-left-enter-from { opacity: 0; transform: translateX(-100%); }
.slide-left-leave-to { opacity: 0; transform: translateX(100%); }
</style>

