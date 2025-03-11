<script setup lang="ts">
import AdminLayout from '@/layouts/Layout.vue';

</script>

<template>
    <main class="flex flex-col gap-[2rem]">
        <section class="p-3 sm:py-[6rem] sm:px-[6rem] w-full flex sm:flex-row flex-col bg-[#2E3944]">
            <div class="w-full sm:w-2/6 p-2 flex flex-col px-[1rem] sm:py-[3rem]">
                <h1 class="text-[#D3D9D4] text-2xl sm:text-5xl font-bold">Optimiza tu flujo de trabajo y aumenta la productividad de tu equipo.</h1>
                <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
                    Tu equipo trabajará de forma más organizada y eficiente, con toda la información en un solo lugar. 
                    Asigna tareas, haz seguimiento en tiempo real y colabora sin esfuerzo, evitando malentendidos y optimizando cada proceso. 
                    Con herramientas intuitivas y automatización inteligente, lograrás mejores resultados en menos tiempo.
                </p>
            </div>
            <div class="w-full sm:w-4/6 px-2 py-[1rem] flex flex-col m-auto">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <img src="../assets/Imagenes/LandingPortada.jpg" alt="Imagen de Portada Inicio" class="w-full sm:w-4/6 sm:rounded-l-full sm:rounded rounded-full object-cover" />
                    <div class="w-full sm:w-2/6 rounded-4xl sm:rounded-r-2xl sm:rounded-none bg-white py-2 px-3 flex flex-col justify-center gap-2">
                        <label class="text-[#124E66] font-semibold uppercase text-sm">Registro de Actividades</label>
                        <h1 class="text-[#124E66] font-semibold text-xl">Lleva un control detallado de cada acción en tu sistema.</h1>
                        <label class="text-base">Nuestra nueva implementación de logs te permite monitorear cambios, detectar incidencias y mejorar la seguridad con registros en tiempo real.</label>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full flex flex-col items-center justify-center">
            <div class="w-full text-center p-2">
                <h1 class="text-[#2E3944] text-3xl font-bold uppercase">Un solo lugar para planificar, ejecutar y entregar proyectos exitosos.</h1>
            </div>
            <div class="text-[#124E66] font-bold capitalize w-4/6 flex flex-row py-6 justify-between space-x-5 text-center">
                <div class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <p class="text-gainsboro text-xl font-bold">Colaboración</p>
                </div>
                <div class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <p class="text-gainsboro text-xl font-bold">Administración de proyectos</p>
                </div>
                <div class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <p class="text-gainsboro text-xl font-bold">Gestión de Tareas</p>
                </div>
                <div class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <p class="text-gainsboro text-xl font-bold">Inventariado de Stock</p>
                </div>
            </div>
            <div class="w-1/2  flex items-center justify-center mt-5">
                <img src="../assets/Imagenes/LandingInformacion.jpg" alt="Imagen de Portada Inicio" class="w-full object-cover bg-white p-6 rounded-lg shadow-xl" />
            </div>
        </section>
        <section class="p-3 sm:px-[6rem] w-full flex sm:flex-row flex-col justify-center flex-wrap">
            <div class="w-full sm:w-1/2 px-2 flex flex-col">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <div class="bg-white w-full min-h-[230px] p-6 rounded-lg shadow-xl">
                        <h2 class="text-lg font-semibold mb-4 text-DarkTeal border-b border-SteelBlue">Administración de proyectos</h2>
                        <div class="bg-white h-fit w-full rounded-lg flex flex-col justify-center items-center">
                            <h1 class="text-[#124E66] font-semibold text-xl uppercase pb-2">Gestiona proyectos y avanza más rápido con el trabajo.</h1>
                            <label class="text-base">Colabora en tiempo real, optimiza procesos y alcanza tus objetivos con eficiencia.
                                Automatiza flujos de trabajo, asigna responsabilidades y mantén el control en todo momento.</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full sm:w-1/2 px-2 flex flex-col">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <div class="bg-white  min-h-[230px] p-6 rounded-lg shadow-xl">
                        <h2 class="text-lg font-semibold mb-4 text-DarkTeal border-b border-SteelBlue">Gestión de Tareas</h2>
                        <div class="bg-white h-fit w-full rounded-lg flex flex-col justify-center items-center">
                            <h1 class="text-[#124E66] font-semibold text-xl uppercase pb-2">Organiza, asigna y da seguimiento a cada tarea en un solo lugar.</h1>
                            <label class="text-base">
                                Establece prioridades, define plazos y mejora la productividad con flujos de trabajo optimizados.</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full sm:w-1/2 mt-[2rem] px-2 flex flex-col">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <div class="bg-white  min-h-[230px] p-6 rounded-lg shadow-xl">
                        <h2 class="text-lg font-semibold mb-4 text-DarkTeal border-b border-SteelBlue">Colaboración</h2>
                        <div class="bg-white h-fit w-full rounded-lg flex flex-col justify-center items-center">
                            <h1 class="text-[#124E66] font-semibold text-xl uppercase pb-2">Comunícate de muchas formas distintas desde un solo lugar.</h1>
                            <label class="text-base">Todo pensado para facilitar la conexión entre las personas y la información, pon tus ideas por escrito.</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full sm:w-1/2 px-2 pt-[2rem] flex flex-col">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <div class="bg-white  min-h-[230px] p-6 rounded-lg shadow-xl">
                        <h2 class="text-lg font-semibold mb-4 text-DarkTeal border-b border-SteelBlue">Inventariado de Stock</h2>
                        <div class="bg-white h-fit w-full rounded-lg flex flex-col justify-center items-start">
                            <h1 class="text-[#124E66] font-semibold text-xl uppercase pb-2">Mantén un control preciso de tus productos.</h1>
                            <label class="text-base">
                                Gestiona entradas y salidas, automatiza actualizaciones y toma decisiones basadas en datos en tiempo real.</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full bg-[#2E3944] py-[2rem] flex flex-col items-center justify-center">
            <div class="w-full text-center p-2">
                <h1 class="text-[#D3D9D4] text-3xl font-bold uppercase mb-5">Nuestro objetivo es impulsar el crecimiento de los proyectos</h1>
            </div>
            <div class="w-1/2 h-fit flex items-center justify-center">
                <img src="../assets/Imagenes/LandingCrecimiento.avif" alt="Imagen de Portada Inicio" class="w-5/6 object-cover bg-white p-6 rounded-lg shadow-xl" />
            </div>
        </section>
    </main>
</template>
