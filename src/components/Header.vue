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
      density="compact"
      class="search-bar"
    />

    <!-- Icon Buttons -->
    <v-btn
      icon
      class="mx-2 rounded-square icon-button bg-gradient-purple"
      @click="handleLogout"
    >
      <v-icon color="white">mdi-logout</v-icon>
    </v-btn>

    <v-btn
      icon
      class="rounded-square icon-button bg-gradient-pink"
      @click="handleOpenForm"
    >
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
  </v-toolbar>

  <!-- Logout Modal  -->
  <v-dialog v-model="formState.showLogoutModal" persistent max-width="400">
    <LogoutModal
      @confirm="handleConfirmLogout"
      @close="handleCloseLogoutModal"
    />
  </v-dialog>
</template>

<script setup>
import { ref, watch, inject } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useTasks } from "@/composables/useTasks";
import LogoutModal from "@/components/LogoutModal.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { searchQuery, setSearchQuery } = useTasks();
const search = ref(searchQuery.value);
const auth = useAuthStore();

const formState = inject("formState");

watch(search, (val) => {
  setSearchQuery(val);
});

onMounted(() => {
  auth.getMe();
});

//methods for the form
const handleOpenForm = () => {
  formState.selectedBoard = null;
  formState.showForm = true;
};

const handleLogout = () => {
  formState.showLogoutModal = true;
};

//logout handling
const handleConfirmLogout = async () => {
  await auth.logout(router);
  formState.showLogoutModal = false;
};
const handleCloseLogoutModal = () => {
  formState.showLogoutModal = false;
};
</script>

<style scoped>
.header-toolbar {
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  background-color: transparent !important;
}

.search-bar {
  max-width: 450px;
  max-height: 40px !important;
  margin-right: 16px;
  border-radius: 34px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
::v-deep(.search-bar .v-input) {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
}

::v-deep(.search-bar .v-field) {
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  background-color: transparent !important;
}

::v-deep(.search-bar .v-field__outline) {
  border: 1px solid #f5f5f5 !important;
  border-radius: 12px !important;
}
::v-deep(.search-bar .v-field__prepend-inner) {
  margin-left: 10px;
}

::v-deep(.search-bar input) {
  padding-left: 6px !important;
}
.search-bar input {
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 14px;
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
