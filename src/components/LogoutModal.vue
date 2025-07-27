<template>
  <v-sheet class="logout-card" elevation="6" rounded="xl">
    <v-toolbar flat class="modal-header">
      <v-toolbar-title>Confirm Logout</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="handleClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider />

    <v-card-text class="text-body-1 pa-6">
      Are you sure you want to log out?
    </v-card-text>

    <v-card-actions class="pa-4 justify-end">
      <v-btn color="grey" variant="outlined" @click="handleClose">Cancel</v-btn>
      <v-btn class="logout-button" @click="handleConfirm">Logout</v-btn>
    </v-card-actions>
  </v-sheet>
</template>

<script setup>
const emit = defineEmits(["close", "confirm"]);

const handleClose = () => {
  emit("close");
};

const handleConfirm = () => {
  emit("confirm");
};
</script>

<style scoped>
.logout-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
}
.modal-header {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
}
.logout-button {
  color: #f5576c;
}
</style>
