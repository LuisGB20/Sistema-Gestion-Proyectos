<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import SubmitButton from '@/components/ui/SubmitButton.vue';
import { useToast } from 'primevue/usetoast';
import router from '@/router';
import Toast from 'primevue/toast';

const authStore = useAuthStore();

const { values, errors, defineField, validate } = useForm({
  validationSchema: yup.object({
    email: yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo es obligatorio'),
    password: yup.string()
      .required('La contraseña es obligatoria'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('La confirmación de la contraseña es obligatoria'),
  }),
});

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
});

const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: false,
});

const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword', {
  validateOnModelUpdate: false,
});

const isPasswordVisible = ref(false);
const toast = useToast();

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;  // Alternar la visibilidad
};

const handleRegister = async () => {
  const isValid = await validate();
  if (isValid.valid) {
    console.log(email.value, password.value, confirmPassword.value)
    const response = await authStore.register(email.value, password.value, confirmPassword.value);
    console.log(response)
    if (!response.success) {
      toast.add({ severity: 'error', summary: 'Algo salió mal', detail: response.message, life: 3000 });
    } else {
      toast.add({ severity: 'success', summary: '¡Bienvenido!', detail: 'Registro exitoso.', life: 3000 });
      setTimeout(() => {
        router.push(`/iniciar-sesion`);
      }, 1500);
    }
  } else {
    return;
  }
}
</script>

<template>
  <main class="flex min-h-screen p-10">
    <Toast />
    <div class="w-1/2 flex justify-center items-center">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-semibold text-center mb-8 mt-8 text-CharcoalBlue">Registro</h2>
        <h1 class="text-1xl font-semibold text-center mb-10 text-CharcoalBlue ">Crea tu cuenta, te esperamos...</h1>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="relative z-0 w-full mb-5 group">
            <input name="email" id="email" v-model="email" v-bind="emailAttrs"
            autocomplete="off"
              :class="`block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal !appearance-none focus:outline-none focus:ring-0 focus:border-DarkTeal peer  ${errors.email ? 'border-rojo-error' : ''}`"
              placeholder=" " />
            <label for="email"
              :class="`peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${errors.email ? 'text-rojo-error' : ''}`">Ingresa
              tu correo</label>
            <p v-if="errors.email" class="text-rojo-error">{{ errors.email }}</p>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <input :type="isPasswordVisible ? 'text' : 'password'" name="password" id="password" v-model="password"
              v-bind="passwordAttrs"
              :class="`block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none   focus:outline-none focus:ring-0 focus:border-DarkTeal peer ${errors.password ? 'border-rojo-error' : ''}`"
              placeholder=" " />
            <label for="password"
              :class="`peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${errors.password ? 'text-rojo-error' : ''}`">Ingresa
              tu contraseña</label>
            <p v-if="errors.password" class="text-rojo-error">{{ errors.password }}</p>

            <button type="button" @click="togglePasswordVisibility"
              :class="`absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 cursor-pointer ${errors.password ? 'top-1/3' : ''}`">
              <i v-if="!isPasswordVisible" class="pi pi-eye-slash text-CharcoalBlue"></i>
              <i v-else class="pi pi-eye-slash text-DarkTeal"></i>
            </button>
          </div>

          <div class="relative z-0 w-full mb-8 group">
            <input :type="isPasswordVisible ? 'text' : 'password'" name="confirmPassword" id="confirmPassword"
              v-model="confirmPassword"
              :class="`block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none focus:outline-none focus:ring-0 focus:border-DarkTeal peer ${errors.confirmPassword ? 'border-rojo-error' : ''}`"
              placeholder=" " />
            <label for="confirmPassword"
              :class="`peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${errors.confirmPassword ? 'text-rojo-error' : ''}`">Confirma
              tu contraseña</label>
            <p v-if="errors.confirmPassword" class="text-rojo-error">{{ errors.confirmPassword }}</p>
          </div>

          <div class="card flex justify-center">
            <SubmitButton :text="`Registrarme`" />
          </div>
        </form>

        <div class="text-CharcoalBlue flex justify-between mt-5 text-sm">
          <p>¿Ya tienes una cuenta?</p>
          <RouterLink to="/iniciar-sesion" class="text-DarkTeal hover:underline hover:underline-offset-2">Inicia sesión aquí</RouterLink>
        </div>
      </div>
    </div>
    <img src="/src/assets/images/auth/register.svg" alt="Imagen de Registro" class="size-[500px] mx-auto" />
  </main>
</template>

<style scoped>
main {
  display: flex;
}

section {
  padding: 40px;
}
</style>
