<!-- src/components/SideBar.vue -->
<template>
  <v-navigation-drawer permanent width="260" class="sidebar-gradient" app>
    <div class="sidebar-content">
      <!-- avatar + name -->
      <div class="pa-4 text-center">
        <v-avatar size="56" class="mx-auto mb-2 gradient-avatar">
          <span class="text-white text-h6 font-weight-bold">{{
            initials
          }}</span>
        </v-avatar>
        <div class="text-white font-weight-medium">{{ auth.user?.name }}</div>
        <div
          class="text-white text-caption text-center"
          style="overflow-wrap: break-word"
        >
          {{ auth.user?.email }}
        </div>
      </div>

      <!-- menu items -->
      <v-list dense nav>
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :title="item.title"
          :active="selected === item.title"
          :to="`/home/${item.title.toLowerCase()}`"
          @click="selected = item.title"
          class="nav-item"
          router
        >
          <template #prepend>
            <div class="custom-icon-box">
              <v-icon size="18">{{ item.icon }}</v-icon>
            </div>
          </template>

          <template #append>
            <v-badge
              v-if="item.title === 'Tasks' && selected === 'Tasks'"
              :content="todayStats.totalTasksToday"
              color="white"
              text-color="primary"
              inline
              size="small"
            />
          </template>
        </v-list-item>
      </v-list>

      <v-spacer />

      <!-- progress bar -->
      <div class="pa-4">
        <div class="text-white text-subtitle-2 mb-2">Daily Progress</div>
        <v-progress-linear
          :model-value="todayStats.percentage"
          color="cyan"
          height="8"
          rounded
          class="mb-1"
        />
        <div class="text-white text-caption">
          {{ todayStats.percentage }} completed
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTasks } from "@/composables/useTasks";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const selected = ref("Tasks");
const { todayStats, fetchTodayStats } = useTasks();
console.log("Daily tasks: ", todayStats.totalTasksToday);

const initials = computed(() => {
  const fullName = auth.user?.name || "";
  const parts = fullName.trim().split(" ");

  const firstInitial = parts[0]?.charAt(0).toUpperCase() || "";
  const lastInitial =
    parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() : "";

  return firstInitial + lastInitial;
});
onMounted(() => fetchTodayStats());
onMounted(() => {
  auth.getMe();
});

const navItems = [
  { title: "Tasks", icon: "mdi-clipboard-text-outline" },
  { title: "Boards", icon: "mdi-view-dashboard-outline" },
  { title: "Statistics", icon: "mdi-chart-bar" },
  { title: "Calendar", icon: "mdi-calendar-month-outline" },
];
</script>

<style scoped>
.sidebar-gradient {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.sidebar-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.gradient-avatar {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border: 5px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-item {
  border-radius: 12px;
  margin: 6px 12px;
  padding-inline: 8px;
}

.v-list-item--active {
  background-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 13px;
  z-index: 1;
}

.custom-icon-box {
  background-color: white;
  border-radius: 6px;
  padding: 4px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.custom-icon-box .v-icon {
  color: #434343;
}
</style>
