<template>
  <footer
    class="bg-linear-to-b from-DarkTeal to-CharcoalBlue text-white py-5 px-6 md:px-10 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start">
    <h1 class="text-center text-sm md:text-base mb-4 lg:mb-0">Todos los derechos reservados ©</h1>
    <div
      class="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-x-5 md:space-y-0 text-center md:text-left">
      <RouterLink to="/politicas-de-privacidad" class="text-white hover:underline hover:underline-offset-2">Políticas de
        privacidad</RouterLink>
      <RouterLink to="/terminos-y-condiciones" class="text-white hover:underline hover:underline-offset-2">Términos y
        condiciones</RouterLink>
      <RouterLink to="/politicas-de-cookies" class="text-white hover:underline hover:underline-offset-2">Política de
        cookies</RouterLink>
    </div>
  </footer>
</template>
