<template>
  <v-card class="pa-6 mx-auto gradient-bg" elevation="10" max-width="540px" width="100%">
    <!-- Modal Header -->
    <div class="modal-header">
      <h3 class="modal-title">Create a New Board</h3>
      <v-icon
        class="close-icon"
        size="20"
        style="cursor:pointer"
        @click="closeForm"
      >mdi-close</v-icon>
    </div>

    <v-form @submit.prevent="createBoard">
      <!-- Board Name -->
      <div class="input-wrapper">
        <label class="custom-label">Board Name *</label>
        <v-text-field
          v-model="boardName"
          class="custom-input"
          density="compact"
          hide-details
          placeholder="Enter board name"
          variant="solo"
        />
      </div>

      <!-- Board Color -->
      <div class="input-wrapper">
        <label class="custom-label">Board Color *</label>
        <v-select
          v-model="selectedColor"
          class="custom-input"
          density="compact"
          hide-details
          :items="Object.keys(gradients)"
          placeholder="Select a color"
          variant="solo"
        />
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <v-btn class="cancel-btn" @click="closeForm">Cancel</v-btn>
        <v-btn class="create-btn" type="submit">Create Board</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue';

  const emit = defineEmits(['board-created', 'close']);

  const boardName = ref('');
  const selectedColor = ref('Red');

  // Gradient mapping
  const gradients = {
    Red: 'linear-gradient(180deg, #ff4b5c 0%, #ff758c 100%)',
    Blue: 'linear-gradient(180deg, #4b6cb7 0%, #182848 100%)',
    Yellow: 'linear-gradient(180deg, #f7971e 0%, #ffd200 100%)',
    Green: 'linear-gradient(180deg, #56ab2f 0%, #a8e063 100%)',
  };

  const createBoard = () => {
    if (!boardName.value || !selectedColor.value) return;

    emit('board-created', {
      title: boardName.value,
      gradient: gradients[selectedColor.value],
    });

    // Reset form
    boardName.value = '';
    selectedColor.value = 'Red';
  };

  const closeForm = () => {
    emit('close');
  };
</script>

<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.gradient-bg {
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  padding: 30px !important;
  max-width: 540px;
}

.close-icon {
  background: #fff;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #6c757d;
}

.input-wrapper {
  margin-bottom: 16px;
}

.custom-label {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
  color: #333;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  width: 100%;
}

.cancel-btn {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  flex: 1;
  text-transform: none !important;
  border-radius: 12px !important;
  font-weight: 400 !important;
}

.create-btn {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
  text-transform: none !important;
  border-radius: 12px !important;
  font-weight: 400 !important;
}
</style>
