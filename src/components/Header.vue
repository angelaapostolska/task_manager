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
    <v-btn icon class="mx-2 rounded-square icon-button bg-gradient-purple">
      <v-icon color="white">mdi-logout</v-icon>
    </v-btn>

    <v-btn icon class="rounded-square icon-button bg-gradient-pink">
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useTasks } from "@/composables/useTasks";

const { searchQuery, setSearchQuery } = useTasks();
const search = ref(searchQuery.value);
const auth = useAuthStore();

watch(search, (val) => {
  setSearchQuery(val);
});

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
  max-width: 450px;
  max-height: 60px;
  margin-right: 16px;
  border-radius: 34px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.icon-button {
  width: 48px;
  height: 48px;
}

.bg-gradient-purple {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
}

.bg-gradient-pink {
  background: linear-gradient(180deg, #f093fb 0%, #f5576c 100%);
}

.rounded-square {
  border-radius: 12px;
  width: 40px;
  height: 40px;
  min-width: 40px !important;
  min-height: 40px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
