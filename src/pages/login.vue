<template>
  <v-app class="login-background">
    <!-- Apply background here -->
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center">
        <v-sheet class="login-card" elevation="6" max-width="500" rounded="xl">
          <h2 class="text-center text-h5 mb-4 font-weight-bold">Log in</h2>
          <v-divider class="mb-6" />

          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field
              v-model="email"
              class="mb-4"
              density="comfortable"
              label="Username"
              placeholder="Enter your username"
              :readonly="loading"
              rounded
              :rules="[required]"
              variant="outlined"
            />

            <v-text-field
              v-model="password"
              class="mb-2"
              density="comfortable"
              label="Password"
              placeholder="Enter your password"
              :readonly="loading"
              rounded
              :rules="[required]"
              type="password"
              variant="outlined"
            />

            <div class="d-flex justify-space-between text-caption mb-4">
              <v-checkbox
                class="pa-0"
                density="compact"
                hide-details
                label="Remember me"
              />
              <a
                class="text-deep-purple-darken-2 text-decoration-none"
                href="#"
              >
                Forgot Password?
              </a>
            </div>

            <v-btn
              class="rounded-pill mb-2 login-btn"
              color="deep-purple-darken-2"
              :disabled="!form"
              :loading="loading"
              size="large"
              type="submit"
            >
              Log in
            </v-btn>

            <v-btn
              class="rounded-pill login-btn"
              color="deep-purple-darken-2"
              size="large"
              variant="outlined"
            >
              Continue with Google
            </v-btn>
          </v-form>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const form = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);
const auth = useAuthStore();
const router = useRouter();

const required = (v) => !!v || "Field is required";

function onSubmit() {
  console.log(email.value + ", " + password.value);
  auth.login(email.value, password.value, router).then(() => {
    console.log(auth.getUser);
  });
}
</script>
<style scoped>
.login-background {
  /* background: linear-gradient(135deg, #f3d9fa, #dbeafe); */
  background: linear-gradient(
      rgba(243, 217, 250, 0.6),
      rgba(219, 234, 254, 0.6)
    ),
    url("public/image 2.png") no-repeat center center;
  min-height: 100vh;
}

.login-card {
  background-color: #f9f6ff;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #ddd;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 500px;
}

.login-btn {
  width: 100%;
}
</style>
