<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { Carousel } from "primevue";
import { ref } from "vue";

const authStore = useAuthStore()

const benefits = ref([
    {
        title: "Herramientas Centralizadas",
        description: "Integra todo lo necesario para planificar, ejecutar y monitorear proyectos de manera eficiente, evitando la falta de herramientas adecuadas."
    },
    {
        title: "Comunicación Efectiva",
        description: "Facilita la colaboración entre equipos con comunicación clara y constante, asegurando un flujo de trabajo ágil y eficiente."
    },
    {
        title: "Registro Preciso",
        description: "Controla de manera precisa horas trabajadas, nóminas y avances, evitando errores y mejorando la asignación de recursos."
    },
    {
        title: "Visibilidad en Tiempo Real",
        description: "Obtén una visión clara del progreso de los proyectos, identificando cuellos de botella y tomando decisiones informadas."
    },
    {
        title: "Sincronización de equipos",
        description: "Coordina tareas y recursos de forma eficiente, minimizando retrasos y maximizando la productividad en cada proyecto."
    }
]);

const features = ref([
    {
        img: "/src/assets/images/home/work.svg",
        title: "Planificación Efectiva",
        description: "Define el alcance de tus proyectos de manera clara y específica, asegurando que todos los requisitos estén documentados."
    },
    {
        img: "/src/assets/images/home/collaboration.svg",
        title: "Monitoreo en Tiempo Real",
        description: "Controla de manera efectiva el progreso de tus proyectos utilizando herramientas que te permitan tomar decisiones más acertadas."
    },
    {
        img: "/src/assets/images/home/automatization2.svg",
        title: "Automatización de Procesos",
        description: "Optimiza tus flujos de trabajo y reduce al mínimo los errores operativos mediante procesos automatizados."
    },
]);



const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

const responsiveOptions2 = ref([
    {
        breakpoint: '1400px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '390px',
        numVisible: 1,
        numScroll: 1
    }
]);

</script>

<template>
    <main class="flex flex-col" :class="authStore.isLoggedIn ? 'mt-12' : ''">
        <section class="p-3 sm:py-[6rem] sm:px-[6rem] w-full flex sm:flex-row flex-col bg-Gunmetal">
            <div class="w-full lg:w-2/6 p-2 flex flex-col px-[1rem] sm:py-[3rem] text-center lg:text-left">
                <h1 class="text-white text-2xl md:text-3xl lg:text-5xl font-bold">
                    Optimiza tu flujo de trabajo y aumenta la productividad de tu equipo.
                </h1>
                <p class="text-white text-sm sm:text-base pt-2 sm:pt-4">
                    En un entorno empresarial, la gestión eficiente de proyectos es clave para el éxito. Nuestra
                    plataforma centralizada permite planificar, ejecutar y monitorear proyectos de manera efectiva,
                    garantizando el cumplimiento de objetivos y la optimización de recursos.
                </p>

                <img src="/src/assets/images/home/teamCollaboration.svg" alt="Imagen portada"
                    class="w-full h-[300px] lg:hidden bg-white p-5 rounded-2xl mt-5">
            </div>

            <div class="w-full sm:w-4/6 px-2 py-[1rem] flex-col m-auto hidden lg:flex">
                <div class="w-full flex flex-col sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <img src="/src/assets/images/home/teamCollaboration.svg" alt="Imagen de Portada Inicio"
                        class="bg-white w-full sm:w-4/6 sm:rounded-l-full sm:rounded rounded-full object-cover" />
                    <div
                        class="w-full sm:w-2/6 rounded-4xl sm:rounded-r-2xl sm:rounded-none bg-DarkTeal text-white py-2 px-3 flex flex-col justify-center gap-2">
                        <label class="font-semibold uppercase text-sm">Registro de Actividades</label>
                        <h1 class="font-semibold text-xl">Lleva un control detallado de cada acción en tu
                            sistema.</h1>
                        <label class="text-base">Monitorea cambios, detecta incidencias y mejora la seguridad con
                            registros en tiempo real.</label>
                    </div>
                </div>
            </div>
        </section>


        <section class="w-full">
            <div class="w-full mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-Gunmetal text-3xl md:text-4xl font-bold uppercase">¿Por qué necesitas nuestra
                        plataforma?</h2>
                    <p class="text-2E3944 mt-4">Solucionamos los problemas más comunes en la gestión de proyectos
                        empresariales.</p>
                </div>
                <div>
                    <div
                        class="w-10/12 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-content-center hidden lg:grid">
                        <div
                            class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                            <h3 class="text-xl font-semibold text-DarkTeal">Herramientas Centralizadas</h3>
                            <p class="mt-2 text-2E3944">Evita la falta de herramientas adecuadas. Nuestra plataforma
                                integra todo lo necesario para planificar, ejecutar y monitorear proyectos en un solo
                                lugar.</p>
                        </div>
                        <div
                            class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                            <h3 class="text-xl font-semibold text-DarkTeal">Comunicación Efectiva</h3>
                            <p class="mt-2 text-2E3944">Mejora la colaboración entre equipos con una comunicación clara
                                y constante, evitando malentendidos y asegurando un flujo de trabajo más eficiente.</p>
                        </div>
                        <div
                            class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                            <h3 class="text-xl font-semibold text-DarkTeal">Registro Preciso</h3>
                            <p class="mt-2 text-2E3944">Lleva un control preciso de las horas trabajadas, nóminas y
                                avances, eliminando errores y optimizando la asignación de recursos para una mayor
                                eficiencia.</p>
                        </div>
                        <div class="flex col-span-3 gap-10">
                            <div
                                class="w-1/2 bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                                <h3 class="text-xl font-semibold text-DarkTeal">Visibilidad en Tiempo Real</h3>
                                <p class="mt-2 text-2E3944">Obtén una visión clara del progreso de los proyectos,
                                    identificando cuellos de botella y tomando decisiones informadas.</p>
                            </div>
                            <div
                                class="w-1/2 bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                                <h3 class="text-xl font-semibold text-DarkTeal">Sincronización de equipos</h3>
                                <p class="mt-2 text-2E3944">Coordina tareas y recursos de manera eficiente, minimizando
                                    retrasos y maximizando la productividad de tu equipo en cada proyecto.</p>
                            </div>
                        </div>
                    </div>

                    <div class="block lg:hidden">
                        <Carousel :value="benefits" :numVisible="2" :numScroll="1"
                            :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000">
                            <template #item="slotProps">
                                <div
                                    class="bg-white p-6 rounded-xl shadow-md transform transition-transform hover:scale-105 text-center mx-3 min-h-[250px]">
                                    <h3 class="text-xl font-semibold text-DarkTeal">{{ slotProps.data.title }}</h3>
                                    <p class="mt-2 text-2E3944">{{ slotProps.data.description }}</p>
                                </div>
                            </template>
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>

        <section class="w-full bg-Gunmetal">
            <div class="w-full max-w-6xl mx-auto px-4">
                <div class="text-center mb-8">
                    <h2 class="text-white text-3xl sm:text-4xl md:text-5xl font-bold uppercase">Lo que dicen los
                        expertos</h2>
                    <p class="text-white mt-4 text-base sm:text-lg md:text-xl">La gestión adecuada del alcance es
                        esencial para
                        el éxito de un proyecto.</p>
                </div>
                <img src="/src/assets/images/home/experts.svg" alt="los expertos"
                    class="w-full max-w-[500px] mx-auto my-4" />
                <div class="bg-white p-6 sm:p-8 rounded-xl text-CharcoalBlue">
                    <blockquote class="text-lg sm:text-xl italic">
                        “La gestión adecuada del alcance es esencial para el éxito de un proyecto. La mala gestión de
                        alcance
                        puede tener graves consecuencias y puede llevar a la falla del proyecto. Para superar estos
                        problemas,
                        es necesario definir el alcance de manera clara, documentar los requisitos y utilizar
                        herramientas
                        efectivas de gestión.”
                    </blockquote>
                    <p class="mt-4 font-semibold text-base sm:text-lg">— Rodríguez Rodrigo, Gerente de Deloitte
                        Consulting</p>
                </div>
            </div>
        </section>

        <section class="w-full py-16">
            <div class="w-full max-w-6xl mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-Gunmetal text-3xl md:text-4xl font-bold uppercase">Características Clave</h2>
                    <p class="text-2E3944 mt-4">Todo lo que necesitas para gestionar proyectos exitosos.</p>
                </div>
                <div class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 hidden lg:grid">
                    <div
                        class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <img src="/src/assets/images/home/work.svg" alt="Planificación Efectiva"
                            class="w-full h-[200px] mb-4" />
                        <h3 class="text-xl font-semibold text-DarkTeal">Planificación Efectiva</h3>
                        <p class="mt-2 text-2E3944">Define el alcance de tus proyectos de manera clara y específica,
                            asegurando
                            que todos los requisitos estén documentados.</p>
                    </div>
                    <div
                        class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <img src="/src/assets/images/home/collaboration.svg" alt="Monitoreo en Tiempo Real"
                            class="w-full h-[200px] mb-4" />
                        <h3 class="text-xl font-semibold text-DarkTeal">Monitoreo en Tiempo Real</h3>
                        <p class="mt-2 text-2E3944">Controla de manera efectiva el progreso de tus proyectos utilizando
                            herramientas que te permitan tomar decisiones más acertadas.</p>
                    </div>
                    <div
                        class="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-center">
                        <img src="/src/assets/images/home/automatization2.svg" alt="Automatización de Procesos"
                            class="w-full h-[200px] mb-4" />
                        <h3 class="text-xl font-semibold text-DarkTeal">Automatización de Procesos</h3>
                        <p class="mt-2 text-2E3944">Optimiza tus flujos de trabajo y reduce al mínimo los errores
                            operativos
                            mediante procesos automatizados.</p>
                    </div>
                </div>

                <div class="block lg:hidden px-4">
                    <Carousel :value="features" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions2"
                        circular :autoplayInterval="3000">
                        <template #item="slotProps">
                            <div
                                class="bg-white p-3 rounded-lg shadow-md transform transition-transform hover:scale-105 text-center mx-auto w-[90%] max-w-[320px] min-h-[150px] flex flex-col justify-center">


                                <img :src="slotProps.data.img" alt="Imagen"
                                    class="hidden sm:block w-full h-auto max-h-[200px] object-contain mb-2" />


                                <h3 class="text-sm sm:text-lg font-semibold text-DarkTeal">
                                    {{ slotProps.data.title }}
                                </h3>


                                <p class="mt-1 text-xs sm:text-sm text-2E3944 leading-snug">
                                    {{ slotProps.data.description }}
                                </p>
                            </div>
                        </template>
                    </Carousel>
                </div>
            </div>
        </section>
    </main>
</template>
