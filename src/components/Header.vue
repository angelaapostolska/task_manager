<template>
  <v-toolbar flat color="white">
    <!-- Profile Icon -->
    <!-- <v-btn icon class="profile-icon">
      <v-icon size="32" color="purple-lighten-4">mdi-account-circle</v-icon>
    </v-btn> -->

    <!-- Hello User Text -->
    <v-toolbar-title class="hello-user">Hello, {{ userName }}!</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Add Task (+) Button FIRST -->
    <v-btn icon class="plus-icon" @click="handleClick">
      <v-icon size="32" color="deep-purple-lighten-4">mdi-plus-circle</v-icon>
    </v-btn>

    <!-- Then Search Bar -->
    <v-text-field
      class="white-placeholder"
      density="comfortable"
      variant="solo"
      flat
      placeholder="Search.."
      prepend-inner-icon="mdi-magnify"
      hide-details
      single-line
      bg-color="deep-purple-lighten-5"
      rounded="lg"
      max-width="348px"
      icon-color="white"
      v-model="searchText"
      @keydown="onEnter"
    ></v-text-field>
  </v-toolbar>
</template>

<script setup>
import { inject, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const formState = inject("formState");
const setSearchQuery = inject("setSearchQuery");
const searchText = ref("");
const user = useAuthStore();

const userName = computed(() => {
  const email = user.user?.email;
  if (!email) return "";

  //extracting only the name
  const name = email.split("@")[0].split(".")[0];

  //capitalize first
  return name;
});
const handleClick = () => {
  formState.showForm = true;
};

//extract the entered search string and assign it to the search query in useTasks using the setter
const onEnter = (event) => {
  if (event.key === "Enter") {
    setSearchQuery(searchText.value);
  }
};
</script>

<style scoped>
.hello-user {
  color: #49484a;
  font-family: "Playfair Display", serif;
  font-size: 28px;
  font-weight: 600;
  margin-left: 8px;
}
</style>
