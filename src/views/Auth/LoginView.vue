<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import SubmitButton from '@/components/ui/SubmitButton.vue';

const authStore = useAuthStore();

const { values, errors, defineField, validate } = useForm({
  validationSchema: yup.object({
    email: yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo es obligatorio'),
    contrasena: yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es obligatoria'),
  }),
});

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
});

const [contrasena, contrasenadAttrs] = defineField('contrasena', {
  validateOnModelUpdate: false,
});

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;  // Alternar la visibilidad
};

const handleLogin = async () => {
  const isValid = await validate();
  if (isValid.valid) {
    const response = await authStore.login(email.value, contrasena.value);
    console.log(response);
  } else {
    console.log(isValid)
    return;
  }
}

</script>

<template>
  <main class="flex min-h-screen p-10">
    <img src="/src/assets/images/auth/access.svg" alt="Imagen de Login" class="size-[500px]" />

    <div class="flex-1 flex justify-center items-center">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-semibold text-center mb-8 -mt-8 text-CharcoalBlue">Inicio de sesión</h2>
        <h1 class="text-1xl font-semibold text-center mb-10 text-CharcoalBlue ">Bienvenido, Por favor ingresa tus datos
        </h1>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email"
              class="block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none   focus:outline-none focus:ring-0 focus:border-DarkTeal peer"
              placeholder=" " />
            <label for="email"
              class="peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingresa
              tu correo</label>
          </div>
          <div class="relative z-0 w-full mb-10 group">
            <input :type="isPasswordVisible ? 'text' : 'password'" name="password" id="password"
              class="block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none   focus:outline-none focus:ring-0 focus:border-DarkTeal peer"
              placeholder=" " />
            <label for="password"
              class="peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingresa
              tu contraseña</label>
            <button type="button" @click="togglePasswordVisibility"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3">
              <i v-if="!isPasswordVisible" class="pi pi-eye-slash text-CharcoalBlue"></i>
              <i v-else class="pi pi-eye-slash text-DarkTeal"></i>
            </button>
          </div>

          <div class="card flex justify-center ">
            <SubmitButton :text="`Iniciar Sesion`" />
          </div>

        </form>
        <div class="text-CharcoalBlue flex justify-between mt-5 text-sm">
          <p class="">¿No tienes una cuenta?</p>
          <RouterLink to="/registro" class="text-DarkTeal hover:underline hover:underline-offset-2">Registrate aqui</RouterLink>
        </div>

      </div>
    </div>
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
