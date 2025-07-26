<!-- src/components/LogoutModal.vue -->
<template>
  <v-dialog :model-value="modelValue" persistent max-width="500">
    <v-sheet class="logout-card" elevation="6" rounded="xl">
      <v-toolbar flat color="deep-purple-lighten-1" dark>
        <v-toolbar-title>Confirm Logout</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider />

      <v-card-text class="text-body-1 pa-6">
        Are you sure you want to log out?
      </v-card-text>

      <v-card-actions class="pa-4 justify-end">
        <v-btn color="grey" variant="outlined" @click="$emit('close')"
          >Cancel</v-btn
        >
        <v-btn color="red" @click="$emit('confirm')">Logout</v-btn>
      </v-card-actions>
    </v-sheet>
  </v-dialog>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["close", "confirm"]);
</script>

<style scoped>
.logout-card {
  background-color: #f9f6ff;
}
</style>
