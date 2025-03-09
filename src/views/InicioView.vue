<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue';

</script>

<template>
    <main class="py-4 flex flex-col gap-[2rem]">
        <div class="p-3 mt-[2rem] sm:py-[6rem] sm:px-[6rem] w-full flex sm:flex-row flex-col bg-[#2E3944]">
            <div class="w-full sm:w-2/6 p-2 flex flex-col px-[1rem] sm:py-[3rem]">
                <h1 class="text-[#D3D9D4] text-2xl sm:text-5xl font-bold">Optimiza tu flujo de trabajo y aumenta la productividad de tu equipo.</h1>
                <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
                    Tu equipo trabajará de forma más organizada y eficiente, con toda la información en un solo lugar. 
                    Asigna tareas, haz seguimiento en tiempo real y colabora sin esfuerzo, evitando malentendidos y optimizando cada proceso. 
                    Con herramientas intuitivas y automatización inteligente, lograrás mejores resultados en menos tiempo.
                </p>
            </div>
            <div class="w-full sm:w-4/6 px-2 py-[1rem] flex flex-col">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <img src="../assets/Imagenes/LandingPortada.jpg" alt="Imagen de Portada Inicio" class="w-full sm:w-4/6 sm:rounded-l-full sm:rounded rounded-full object-cover" />
                    <div class="w-full sm:w-2/6 rounded-4xl sm:rounded-r-2xl sm:rounded-none bg-white py-2 px-3 flex flex-col justify-center gap-2">
                        <label class="text-[#124E66] font-semibold uppercase text-sm">Colaboración</label>
                        <h1 class="text-[#124E66] font-semibold text-xl">Comunícate de muchas formas distintas desde un solo lugar.</h1>
                        <label class="text-base">Todo pensado para facilitar la conexión entre las personas y la información, pon tus ideas por escrito.</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full mt-[8rem] mb-[3rem] py-3 flex flex-col items-center justify-center">
            <div class="w-full text-center p-2">
                <h1 class="text-[#2E3944] text-3xl font-bold uppercase">Un solo lugar para planificar, ejecutar y entregar proyectos exitosos.</h1>
            </div>
            <div class="text-[#124E66] font-bold uppercase w-3/6 flex flex-row py-6 justify-between">
                <label>Colaboración</label>
                <label>Administración de proyectos</label>
                <label>Integraciones</label>
                <label>Inventariado de Stock</label>
            </div>
            <div class="bg-[#D3D9D4] w-1/2 h-[30rem] flex items-center justify-center mt-5">
                <label>Aqui una imagen</label>
            </div>
        </div>
        <div class="p-3 sm:px-[6rem] w-full flex sm:flex-row flex-col justify-center">
            <div class="w-full sm:w-4/6 px-2 pt-[1rem] flex flex-col">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <div class="w-full sm:w-2/6 rounded-4xl sm:rounded-l-2xl sm:rounded-none bg-white py-2 px-3 flex flex-col justify-center gap-2">
                        <label class="text-[#124E66] font-semibold uppercase text-sm">Administración de proyectos</label>
                        <h1 class="text-[#124E66] font-semibold text-xl">Gestiona proyectos y avanza más rápido con el trabajo.</h1>
                        <label class="text-base">Prioriza tareas, comparte ideas y mantén la sincronización. </label>
                    </div>
                    <img src="../assets/Imagenes/LandingPortada.jpg" alt="Imagen de Portada Inicio" class="w-full sm:w-4/6 sm:rounded-l-full sm:rounded rounded-full object-cover mirror" />
                </div>
            </div>
            <div class="w-full sm:w-4/6 px-2 pt-[1rem] flex flex-col">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <img src="../assets/Imagenes/LandingPortada.jpg" alt="Imagen de Portada Inicio" class="w-full sm:w-4/6 sm:rounded-l-full sm:rounded rounded-full object-cover" />
                    <div class="w-full sm:w-2/6 rounded-4xl sm:rounded-r-2xl sm:rounded-none bg-white py-2 px-3 flex flex-col justify-center gap-2">
                        <label class="text-[#124E66] font-semibold uppercase text-sm">Colaboración</label>
                        <h1 class="text-[#124E66] font-semibold text-xl">Comunícate de muchas formas distintas desde un solo lugar.</h1>
                        <label class="text-base">Todo pensado para facilitar la conexión entre las personas y la información, pon tus ideas por escrito.</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-3 mt-[1.5rem] sm:px-[6rem] w-full flex sm:flex-row flex-col justify-center">
            <div class="w-full sm:w-3/6 px-2 flex flex-col">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <div class="w-full sm:w-2/6 rounded-4xl sm:rounded-l-2xl sm:rounded-none bg-white py-2 px-3 flex flex-col justify-center gap-2">
                        <label class="text-[#124E66] font-semibold uppercase text-sm">Administración de proyectos</label>
                        <h1 class="text-[#124E66] font-semibold text-xl">Gestiona proyectos y avanza más rápido con el trabajo.</h1>
                        <label class="text-base">Prioriza tareas, comparte ideas y mantén la sincronización. </label>
                    </div>
                    <img src="../assets/Imagenes/LandingPortada.jpg" alt="Imagen de Portada Inicio" class="w-full sm:w-4/6 sm:rounded-l-full sm:rounded rounded-full object-cover mirror" />
                </div>
            </div>
        </div>
        <div class="w-full bg-[#2E3944] my-[4rem] py-[2rem] flex flex-col items-center justify-center">
            <div class="w-full text-center p-2">
                <h1 class="text-[#D3D9D4] text-3xl font-bold uppercase">Nuestro objetivo es impulsar el crecimiento de las empresas.</h1>
            </div>
            <div class="bg-[#D3D9D4] w-1/2 h-[30rem] flex items-center justify-center">
                <label>Aqui un video/gif</label>
            </div>
        </div>
    </main>
</template>
