<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from 'primevue/button';

export default defineComponent({
  name: 'Register',
  components: {
    Button,
  },
  setup() {
    const email = ref<string>('');
    const password = ref<string>('');
    const confirmPassword = ref<string>('');
    const isPasswordVisible = ref<boolean>(false);

    const register = () => {
      // Lógica para registrar al usuario
      console.log(`Correo: ${email.value}, Contraseña: ${password.value}`);
    };

    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    return {
      email,
      password,
      confirmPassword,
      register,
      isPasswordVisible,
      togglePasswordVisibility,
    };
  },
});
</script>

<template>
  <main class="flex min-h-screen">
    <!-- Formulario a la izquierda -->
    <div class="flex-1 p-8 flex justify-center items-center">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-semibold text-center mb-6 text-CharcoalBlue">Registrate</h2>
        <h1 class="text-1xl font-semibold text-center mb-10 text-CharcoalBlue">Crea tu cuenta, te esperamos...</h1>

        <form @submit.prevent="register" class="space-y-4">
          <div class="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email"
              v-model="email"
              class="block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none focus:outline-none focus:ring-0 focus:border-DarkTeal peer"
              placeholder=" " required />
            <label for="email"
              class="peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingresa tu correo</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input :type="isPasswordVisible ? 'text' : 'password'" name="password" id="password"
              v-model="password"
              class="block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none focus:outline-none focus:ring-0 focus:border-DarkTeal peer"
              placeholder=" " required />
            <label for="password"
              class="peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingresa tu contraseña</label>
            <button type="button" @click="togglePasswordVisibility"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3">
              <i v-if="!isPasswordVisible" class="pi pi-eye-slash text-CharcoalBlue"></i>
              <i v-else class="pi pi-eye-slash text-DarkTeal"></i>
            </button>
          </div>
          <div class="relative z-0 w-full mb-8 group">
            <input :type="isPasswordVisible ? 'text' : 'password'" name="confirmPassword" id="confirmPassword"
              v-model="confirmPassword"
              class="block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none focus:outline-none focus:ring-0 focus:border-DarkTeal peer"
              placeholder=" " required />
            <label for="confirmPassword"
              class="peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirma tu contraseña</label>
          </div>

          <div class="flex items-center">
            <input id="terms-checkbox" type="checkbox" value="" class="w-4 h-4 rounded-sm">
            <label for="terms-checkbox" class="ms-2 text-xs font-medium text-CharcoalBlue">Acepto los <RouterLink to=""
                class="text-SteelBlue hover:text-LightGray">términos y condiciones</RouterLink>.</label>
          </div>
          <div class="card flex justify-center">
            <Button label="Registrarme" class="w-1/2 flex justify-center items-center my-4" />
          </div>
        </form>
        <div class="text-CharcoalBlue flex mt-8 text-xs">
          <p class="">¿Ya tienes una cuenta?</p>
          <router-link  to="/iniciar-sesion" class="text-DarkTeal hover:underline hover:underline-offset-2 ml-8">Inicia sesión aquí</router-link >
        </div>
      </div>
    </div>

    <!-- Imagen a la derecha -->
    <div class="flex-1 flex justify-center items-center">
      <img src="../../assets/Imagenes/LoginPortada.png" alt="Imagen de Registro"
        class="max-w-full max-h-full object-cover" />
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
