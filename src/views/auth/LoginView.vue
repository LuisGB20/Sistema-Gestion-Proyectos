<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import SubmitButton from '@/components/ui/SubmitButton.vue';
import { useToast } from 'primevue/usetoast';
import router from '@/router';
import { ValidateSession } from '@/services/auth/authService';
import Loading from '@/components/ui/Loading.vue';

const authStore = useAuthStore();

const { errors, defineField, validate } = useForm({
  validationSchema: yup.object({
    email: yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo es obligatorio'),
    password: yup.string()
      .required('La contraseña es obligatoria'),
  }),
});

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
});

const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: false,
});

const isLoading = ref(false);
const isPasswordVisible = ref(false);
const toast = useToast();

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const handleLogin = async () => {
  const isValid = await validate();
  if (isValid.valid) {
    isLoading.value = true;
    setTimeout(async () => {
      const response = await authStore.login(email.value, password.value);
      if (!response?.success) {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: 'Algo salió mal', detail: response?.message, life: 3000 });
      } else {
        isLoading.value = false;
        toast.add({ severity: 'success', summary: '¡Bienvenido!', detail: 'Inicio de sesión exitoso.', life: 3000 });
        const getInfoUser = await ValidateSession();
        if (getInfoUser?.success) {
          const rol = getInfoUser.data.rol.toLowerCase().replace(' ', '-');
          router.push(`/${rol}`)
        }
      }
    }, 1000)
  } else {
    return;
  }
}
</script>

<template>
  <Loading v-if="isLoading" />
  <main class="flex flex-col lg:flex-row min-h-screen p-4 lg:p-10 justify-center items-center">
    <img src="/src/assets/images/auth/access.svg" alt="Imagen de Login"
      class="w-full max-w-[300px] lg:max-w-[500px] mx-auto mb-8 lg:mb-0" />

    <div class="w-full md:w-1/2 flex justify-center items-center">
      <div class="w-full max-w-md">
        <h2 class="text-2xl md:text-3xl font-semibold text-center mb-6 text-CharcoalBlue">Inicio de sesión</h2>
        <h1 class="text-lg md:text-xl font-semibold text-center mb-8 text-CharcoalBlue">Bienvenido, por favor ingresa
          tus datos</h1>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="relative z-0 w-full mb-5 group">
            <input name="email" id="email" v-model="email" v-bind="emailAttrs" autocomplete="off"
              :class="`block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal !appearance-none focus:outline-none focus:ring-0 focus:border-DarkTeal peer ${errors.email ? 'border-rojo-error' : ''}`"
              placeholder=" " />
            <label for="email"
              :class="`peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${errors.email ? 'text-rojo-error' : ''}`">
              Ingresa tu correo
            </label>
            <p v-if="errors.email" class="text-rojo-error text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div class="relative z-0 w-full mb-8 group">
            <input :type="isPasswordVisible ? 'text' : 'password'" name="password" id="password" v-model="password"
              v-bind="passwordAttrs"
              :class="`block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none focus:outline-none focus:ring-0 focus:border-DarkTeal peer ${errors.password ? 'border-rojo-error' : ''}`"
              placeholder=" " />
            <label for="password"
              :class="`peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${errors.password ? 'text-rojo-error' : ''}`">
              Ingresa tu contraseña
            </label>
            <p v-if="errors.password" class="text-rojo-error text-sm mt-1">{{ errors.password }}</p>

            <button type="button" @click="togglePasswordVisibility"
              :class="`absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 cursor-pointer ${errors.password ? 'top-1/3' : ''}`">
              <i v-if="!isPasswordVisible" class="pi pi-eye-slash text-CharcoalBlue"></i>
              <i v-else class="pi pi-eye text-DarkTeal"></i>
            </button>
          </div>

          <div class="card flex justify-center">
            <SubmitButton :text="`Iniciar Sesión`" />
          </div>
        </form>
      </div>
    </div>
  </main>
</template>