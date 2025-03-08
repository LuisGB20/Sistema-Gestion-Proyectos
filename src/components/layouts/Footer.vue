<template>
    <footer class="bg-[#002855] text-white py-5 px-6 md:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 text-center lg:text-left">
        <div
          class="flex flex-col justify-center items-center lg:items-start border-b lg:border-b-0 lg:border-r border-whisper p-4">
          <h2 class="text-lg font-semibold">Sistema de Gestión de Proyectos</h2>
          <p class="text-sm">Optimiza tus proyectos, maximiza tus resultados.</p>
        </div>
        <div class="flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-whisper p-4">
          <ul class="flex flex-col gap-1 text-center">
            <RouterLink to="/" class="text-whisper">Inicio</RouterLink>
            <RouterLink to="/descubrir" class="text-whisper">Descubrir</RouterLink>
            <RouterLink to="/sobre-nosotros" class="text-whisper">Sobre nosotros</RouterLink>
          </ul>
        </div>
        <div class="flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-whisper p-4">
          <ul class="flex flex-col gap-1 text-center">
            <RouterLink to="/politicas-de-privacidad" class="text-whisper">Políticas de privacidad</RouterLink>
            <RouterLink to="/terminos-y-condiciones" class="text-whisper">Términos y condiciones</RouterLink>
            <RouterLink to="/politicas-de-cookies" class="text-whisper">Política de cookies</RouterLink>
          </ul>
        </div>
        <div class="flex flex-col justify-center items-center p-4">
          <h2 class="text-lg">Nuestras redes sociales</h2>
          <div class="flex justify-center mt-2 gap-2">
            <a target="_blank" href="https://www.facebook.com/?locale=es_LA"
              class="hover:scale-110 transition-transform duration-200">
              <img src="../../assets/Icons/facebook.png" alt="Facebook" class="w-8 md:w-10 h-8 md:h-10">
            </a>
            <a target="_blank" href="https://www.instagram.com/"
              class="hover:scale-110 transition-transform duration-200">
              <img src="../../assets/Icons/instagram.png" alt="Instagram" class="w-8 md:w-10 h-8 md:h-10">
            </a>
            <a target="_blank" href="https://x.com/?lang=es" class="hover:scale-110 transition-transform duration-200">
              <img src="../../assets/Icons/x.png" alt="X" class="w-8 md:w-10 h-8 md:h-10">
            </a>
          </div>
        </div>
      </div>
      <h1 class="text-center text-sm md:text-base mt-5">Todos los derechos reservados | Equipo SGP ©</h1>
    </footer>
  </template>
  