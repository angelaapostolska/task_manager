<!-- src/components/Header.vue -->
<template>
  <v-toolbar flat class="header-toolbar">
    <!-- Welcome Text -->
    <div>
      <div class="text-body-1 text-grey-darken-1">Welcome back,</div>
      <div class="text-h4 font-weight-bold">{{ auth.user?.name || "..." }}</div>
    </div>

    <v-spacer />

    <!-- Search Bar -->
    <v-text-field
      v-model="search"
      placeholder="Search your tasks..."
      prepend-inner-icon="mdi-magnify"
      hide-details
      variant="solo"
      class="search-bar"
    />

    <!-- Icon Buttons -->
    <v-btn
      icon
      class="mx-2 rounded-pill icon-button"
      :style="{ backgroundColor: '#7C4DFF' }"
    >
      <v-icon color="white">mdi-view-dashboard-outline</v-icon>
    </v-btn>

    <v-btn
      icon
      class="rounded-pill icon-button"
      :style="{ backgroundColor: '#F06292' }"
    >
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const search = ref("");
const auth = useAuthStore();

onMounted(() => {
  auth.getMe();
});
</script>

<style scoped>
.header-toolbar {
  padding-left: 0;
  padding-right: 0;
  width: 100%;
}

.search-bar {
  max-width: 350px;
  margin-right: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.icon-button {
  width: 48px;
  height: 48px;
}
</style>
