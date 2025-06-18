<template>
  <v-navigation-drawer class="sidebar" width="80" app permanent>
    <div class="sidebar-content">
      <!-- Profile Icon - Positioned at the top -->
      <v-btn
        icon
        class="sidebar-icon profile-icon"
        color="deep-purple-lighten-4"
        elevation="2"
        @click="handleProfileClick"
      >
        <v-icon size="32" color="white">mdi-account-circle</v-icon>
      </v-btn>

      <div class="bottom-icons">
        <!-- Question Icon - Positioned at the bottom -->
        <v-btn icon class="sidebar-icon" color="deep-purple-lighten-4">
          <v-icon size="32" color="white">mdi-help-circle</v-icon>
        </v-btn>

        <!-- Settings Icon - Positioned at the bottom -->
        <v-btn icon class="sidebar-icon" color="deep-purple-lighten-4">
          <v-icon size="32" color="white">mdi-cog-box</v-icon>
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleProfileClick = async () => {
  const result = await authStore.logout(router);

  if (result) {
    console.log("Successfully logged out from profile icon click!");
  } else {
    console.error("Logout failed: ", result.error);
  }
};
</script>

<style scoped>
/* Sidebar Styles */
.sidebar {
  background-image: url("../assets/sidebar-bg.png");
  background-size: cover;
  background-position: center;
  max-width: 80px;
  height: 100vh;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Container for all sidebar content */
.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 20px; /* spacing from top */
  padding-bottom: 10px; /* spacing at bottom */
}

/* Profile icon stays at top */
.profile-icon {
  margin-bottom: auto; /* pushes everything else to the bottom */
  margin-top: 5px;
}

/* Bottom icons are pinned at the bottom */
.bottom-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px; /* space between help & settings */
}

/* Icon button styles */
.sidebar-icon {
  border-radius: 50%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease-in-out;
  width: 50px;
  height: 50px;
}

/* Icon hover effect */
.sidebar-icon:hover {
  transform: scale(1.05);
}

/* Customize icon size */
.sidebar-icon .v-icon {
  font-size: 30px;
}
</style>
