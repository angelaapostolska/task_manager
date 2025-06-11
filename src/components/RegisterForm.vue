<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card flat>
          <v-card-text>
            <v-form
              ref="form"
              validate-on="submit lazy"
              @submit.prevent="register"
            >
              <v-text-field
                label="Name"
                name="name"
                prepend-icon="mdi-account"
                type="text"
                v-model="formData.name"
                :rules="[rules.required]"
                required
                density="comfortable"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="email"
                v-model="formData.email"
                :rules="[rules.required, rules.email]"
                required
                density="comfortable"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="formData.password"
                :rules="[rules.required, rules.min]"
                required
                density="comfortable"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Confirm Password"
                name="password_confirmation"
                prepend-icon="mdi-lock-check"
                type="password"
                v-model="formData.password_confirmation"
                :rules="[rules.required, rules.min, rules.passwordMatch]"
                required
                density="comfortable"
                variant="outlined"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="deep-purple-lighten-1"
              @click="register"
              :loading="loading"
              >Register</v-btn
            >
          </v-card-actions>

          <v-alert v-if="errorMessage" type="error" dense text class="ma-4">
            {{ errorMessage }}
          </v-alert>

          <v-alert v-if="successMessage" type="success" dense text class="ma-4">
            {{ successMessage }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits(["registered"]);

const authStore = useAuthStore();

//reactive reference to the form component
const form = ref(null);

//reactive state from the form inputs
const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

//validation rules
const rules = reactive({
  required: (value) => !!value || "Required.",
  min: (v) => v.length >= 8 || "Min 8 characters",
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
  passwordMatch: () =>
    formData.password === formData.password_confirmation ||
    "Passwords must match.",
});

//registration logic
const register = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    try {
      const result = await authStore.register(formData);

      if (result.success) {
        successMessage.value = result.message || "Registration successful!";
        form.value.reset();
        form.value.resetValidation();
        emit("registered");
      } else {
        errorMessage.value =
          result.error || "Failed to register. Please try again.";
      }
    } catch (error) {
      errorMessage.value = "An unexpected error occured during registration";
      console.error("Unexpected error: ", error);
    } finally {
      loading.value = false;
    }
  }
};
</script>
