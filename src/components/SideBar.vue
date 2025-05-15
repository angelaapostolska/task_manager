<template>
  <v-navigation-drawer class="sidebar" width="80" app permanent>
    <div class="sidebar-content">
      <!-- Profile Icon - Positioned at the top -->
      <v-btn
        icon
        class="sidebar-icon profile-icon"
        color="deep-purple-lighten-4"
        elevation="2"
      >
        <v-icon size="38" color="white">mdi-account-circle</v-icon>
      </v-btn>

      <div class="bottom-icons">
        <!-- Question Icon - Positioned at the bottom -->
        <v-btn icon class="sidebar-icon" color="deep-purple-lighten-4">
          <v-icon size="38" color="white">mdi-help-circle</v-icon>
        </v-btn>

        <!-- Settings Icon - Positioned at the bottom -->
        <v-btn icon class="sidebar-icon" color="deep-purple-lighten-4">
          <v-icon size="38" color="white">mdi-cog-box</v-icon>
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
// No specific script needed unless dynamic functionality is required
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
.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.bottom-icons {
  margin-top: auto;
  padding-bottom: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Icon Styles */
.sidebar-icon {
  border-radius: 50%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 15px 0;
  transition: transform 0.2s ease-in-out;
  width: 70px;
  height: 70px;
}

.bottom-icons {
  margin-top: 400px;
}

/* Hover effect for icons */
.sidebar-icon:hover {
  transform: scale(1.05);
}

/* Customize icon size */
.sidebar-icon .v-icon {
  font-size: 30px;
}

.profile-icon {
  margin-top: 5px;
}
</style>
