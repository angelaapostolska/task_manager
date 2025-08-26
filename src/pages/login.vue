<template>
  <v-app class="login-background">
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center">
        <v-card
          class="pa-6 mx-auto gradient-bg"
          elevation="10"
          max-width="540px"
          width="100%"
        >
          <!-- Modal Header -->
          <div class="modal-header">
            <h3 class="modal-title">Log in</h3>
          </div>

          <v-form
            v-model="form"
            @submit.prevent="onSubmit"
            class="form-wrapper"
          >
            <div class="input-wrapper">
              <label for="username" class="custom-label">USERNAME *</label>
              <v-text-field
                id="username"
                v-model="email"
                variant="solo"
                density="compact"
                placeholder="Enter your username.."
                class="custom-input"
                :readonly="loading"
                :rules="[required]"
                hide-details="auto"
              />
            </div>

            <div class="input-wrapper">
              <label for="password" class="custom-label">PASSWORD *</label>
              <v-text-field
                id="password"
                v-model="password"
                type="password"
                variant="solo"
                density="compact"
                placeholder="Enter your password.."
                class="custom-input"
                :readonly="loading"
                :rules="[required]"
                hide-details="auto"
              />
            </div>

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

            <!-- Buttons -->
            <div class="button-group">
              <v-btn
                class="create-btn"
                :disabled="!form"
                :loading="loading"
                size="large"
                type="submit"
              >
                Log in
              </v-btn>

              <v-btn
                class="cancel-btn"
                size="large"
                variant="outlined"
                @click="showRegisterModal = true"
              >
                Create an account
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-container>
    </v-main>

    <v-dialog v-model="showRegisterModal" max-width="600px">
      <v-card>
        <v-toolbar color="deep-purple-lighten-1" dark>
          <v-toolbar-title>Create New Account</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showRegisterModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-4">
          <RegisterForm @registered="handleRegistrationSuccess"></RegisterForm>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import RegisterForm from "@/components/RegisterForm.vue";

const form = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);
const auth = useAuthStore();
const router = useRouter();
const showRegisterModal = ref(false);

const required = (v) => !!v || "Field is required";

async function onSubmit() {
  loading.value = true;
  try {
    await auth.login(email.value, password.value, router);
  } catch (error) {
    console.error("Login failed. ", auth.error);
  } finally {
    loading.value = false;
  }
}

const handleRegistrationSuccess = () => {
  showRegisterModal.value = false;
  alert("Account created successfully! You can now log in");
  email.value = "";
  password.value = "";
};
</script>

<style scoped>
.login-background {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.gradient-bg {
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  padding: 30px !important;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 22px;
  font-weight: 600;
}

.input-wrapper {
  margin-bottom: 16px;
}

.custom-label {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
  color: #6c757d;
}

::v-deep(.custom-input .v-field) {
  background-color: white !important;
  border: 1px solid #f5f5f5 !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2px;
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

.create-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
