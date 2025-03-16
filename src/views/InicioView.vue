<script setup lang="ts">
import AdminLayout from '@/layouts/Layout.vue';
</script>

<template>
    <main class="flex flex-col">
        <!-- Primera sección (sin cambios) -->
        <section class="p-3 sm:py-[6rem] sm:px-[6rem] w-full flex sm:flex-row flex-col bg-Gunmetal">
            <div class="w-full sm:w-2/6 p-2 flex flex-col px-[1rem] sm:py-[3rem]">
                <h1 class="text-white text-2xl sm:text-5xl font-bold">Optimiza tu flujo de trabajo y aumenta la productividad de tu equipo.</h1>
                <p class="text-white text-sm sm:text-base pt-2 sm:pt-4">
                    En un entorno empresarial, la gestión eficiente de proyectos es clave para el éxito. Nuestra plataforma centralizada permite planificar, ejecutar y monitorear proyectos de manera efectiva, garantizando el cumplimiento de objetivos y la optimización de recursos.
                </p>
            </div>
            <div class="w-full sm:w-4/6 px-2 py-[1rem] flex flex-col m-auto">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <img src="../assets/Imagenes/LandingPortada.jpg" alt="Imagen de Portada Inicio" class="w-full sm:w-4/6 sm:rounded-l-full sm:rounded rounded-full object-cover" />
                    <div class="w-full sm:w-2/6 rounded-4xl sm:rounded-r-2xl sm:rounded-none bg-white py-2 px-3 flex flex-col justify-center gap-2">
                        <label class="text-DarkTeal font-semibold uppercase text-sm">Registro de Actividades</label>
                        <h1 class="text-DarkTeal font-semibold text-xl">Lleva un control detallado de cada acción en tu sistema.</h1>
                        <label class="text-base">Monitorea cambios, detecta incidencias y mejora la seguridad con registros en tiempo real.</label>
                    </div>
                </div>
            </div>
        </section>

        <!-- Segunda sección: Beneficios de la Plataforma -->
        <section class="w-full">
            <div class="w-full mx-auto px-4">
                <!-- Encabezado -->
                <div class="text-center mb-12">
                    <h2 class="text-Gunmetal text-3xl md:text-4xl font-bold uppercase">¿Por qué necesitas nuestra plataforma?</h2>
                    <p class="text-2E3944 mt-4">Solucionamos los problemas más comunes en la gestión de proyectos empresariales.</p>
                </div>

                <!-- Beneficios -->
                <div class="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-content-center">
                    <!-- Beneficio 1: Herramientas Centralizadas -->
                    <div class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <h3 class="text-xl font-semibold text-DarkTeal">Herramientas Centralizadas</h3>
                        <p class="mt-2 text-2E3944">Evita la falta de herramientas adecuadas. Nuestra plataforma integra todo lo necesario para planificar, ejecutar y monitorear proyectos en un solo lugar.</p>
                    </div>
                    <!-- Beneficio 2: Comunicación Efectiva -->
                    <div class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <h3 class="text-xl font-semibold text-DarkTeal">Comunicación Efectiva</h3>
                        <p class="mt-2 text-2E3944">Mejora la colaboración entre equipos con una comunicación clara y constante, evitando malentendidos y retrasos.</p>
                    </div>
                    <!-- Beneficio 3: Registro Preciso -->
                    <div class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <h3 class="text-xl font-semibold text-DarkTeal">Registro Preciso</h3>
                        <p class="mt-2 text-2E3944">Lleva un control exacto de las horas trabajadas, nóminas y avances, eliminando errores y optimizando recursos.</p>
                    </div>
                    <div class="flex col-span-3 gap-10">
                        <!-- Beneficio 4: Visibilidad en Tiempo Real -->
                    <div class="w-1/2 bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <h3 class="text-xl font-semibold text-DarkTeal">Visibilidad en Tiempo Real</h3>
                        <p class="mt-2 text-2E3944">Obtén una visión clara del progreso de los proyectos, identificando cuellos de botella y tomando decisiones informadas.</p>
                    </div>
                    <!-- Beneficio 5: Sincronización de Equipos -->
                    <div class="w-1/2 bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <h3 class="text-xl font-semibold text-DarkTeal">Sincronización de Equipos</h3>
                        <p class="mt-2 text-2E3944">Coordina tareas y recursos de manera eficiente, evitando retrasos y maximizando la productividad.</p>
                    </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- Tercera sección: Testimonio -->
        <section class="w-full bg-Gunmetal">
            <div class="w-full max-w-6xl mx-auto px-4">
                <!-- Encabezado -->
                <div class="text-center mb-8">
                    <h2 class="text-white text-3xl md:text-4xl font-bold uppercase">Lo que dicen los expertos</h2>
                    <p class="text-white mt-4">La gestión adecuada del alcance es esencial para el éxito de un proyecto.</p>
                </div>
                <img src="/src/assets/images/home/experts.svg" alt="los expertos" class="w-[500px] mx-auto my-4" />

                <!-- Testimonio -->
                <div class="bg-white p-8 rounded-xl text-CharcoalBlue">
                    <blockquote class="text-lg italic">
                        “La gestión adecuada del alcance es esencial para el éxito de un proyecto. La mala gestión de alcance puede tener graves consecuencias y puede llevar a la falla del proyecto. Para superar estos problemas, es necesario definir el alcance de manera clara, documentar los requisitos y utilizar herramientas efectivas de gestión.”
                    </blockquote>
                    <p class="mt-4 font-semibold">— Rodríguez Rodrigo, Gerente de Deloitte Consulting</p>
                </div>
            </div>
        </section>

        <!-- Cuarta sección: Características Clave -->
        <section class="w-full bg-[#F0F4F8] py-16">
            <div class="w-full max-w-6xl mx-auto px-4">
                <!-- Encabezado -->
                <div class="text-center mb-12">
                    <h2 class="text-Gunmetal text-3xl md:text-4xl font-bold uppercase">Características Clave</h2>
                    <p class="text-2E3944 mt-4">Todo lo que necesitas para gestionar proyectos exitosos.</p>
                </div>

                <!-- Características -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Característica 1: Planificación Efectiva -->
                    <div class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <h3 class="text-xl font-semibold text-DarkTeal">Planificación Efectiva</h3>
                        <p class="mt-2 text-2E3944">Define el alcance de tus proyectos de manera clara y específica, asegurando que todos los requisitos estén documentados.</p>
                    </div>
                    <!-- Característica 2: Monitoreo en Tiempo Real -->
                    <div class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <h3 class="text-xl font-semibold text-DarkTeal">Monitoreo en Tiempo Real</h3>
                        <p class="mt-2 text-2E3944">Controla el progreso de tus proyectos con herramientas que te permiten tomar decisiones informadas.</p>
                    </div>
                    <!-- Característica 3: Automatización de Procesos -->
                    <div class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <h3 class="text-xl font-semibold text-DarkTeal">Automatización de Procesos</h3>
                        <p class="mt-2 text-2E3944">Optimiza flujos de trabajo y reduce errores con procesos automatizados.</p>
                    </div>
                </div>

                <div class="flex justify-between items-center my-5">
                <img src="/src/assets/images/home/work.svg" alt="los expertos" class="w-[30%]" />
                <img src="/src/assets/images/home/collaboration.svg" alt="los expertos" class="w-[30%]" />
                <img src="/src/assets/images/home/automatization2.svg" alt="los expertos" class="w-[30%]" />

                </div>

            </div>
        </section>
    </main>
</template>