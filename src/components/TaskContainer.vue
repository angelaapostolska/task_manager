<template>
  <v-card class="task-container elevation-3">
    <h2 class="div-title">Your Tasks</h2>
    <v-row dense no-gutters class="columns">
      <v-col cols="12" md="4">
        <div class="header-row">
          <h3>Urgent</h3>
        </div>
        <!-- iterate and render tasks -->
        <v-card
          v-for="(task, index) in tasks.filter((t) => t.urgency === 'Urgent')"
          :key="index"
          class="ma-2 pa-2"
          color="pink-lighten-4"
        >
          <div>
            <strong>{{ task.name }}</strong>
          </div>
          <div>{{ task.description }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <div class="header-row">
          <h3>Mid</h3>
        </div>
        <v-card
          v-for="(task, index) in tasks.filter((t) => t.urgency === 'Mid')"
          :key="'mid-' + index"
          class="ma-2 pa-2"
          color="blue-lighten-4"
        >
          <div>
            <strong>{{ task.name }}</strong>
          </div>
          <div>{{ task.description }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <div class="header-row">
          <h3>Low</h3>
        </div>
        <v-card
          v-for="(task, index) in tasks.filter(
            (t) => t.urgency === 'Least Urgent'
          )"
          :key="'low-' + index"
          class="ma-2 pa-2"
          color="green-lighten-4"
        >
          <div>
            <strong>{{ task.name }}</strong>
          </div>
          <div>{{ task.description }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { useTasks } from "@/composables/useTasks";
const tasks = inject("tasks");
</script>

<style scoped>
.task-container {
  width: 100%;
  max-width: 1080px;
  min-height: 600px;
  background-color: #eeeeef;
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem auto; /* centers the card horizontally */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.div-title {
  font-family: "Playfair Display", serif;
  font-weight: 600;
  color: #49484a;
  font-size: 36px;
  margin-bottom: 1.5rem;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.header-row h3 {
  color: #49484a;
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 500;
  text-transform: uppercase;
}
</style>
