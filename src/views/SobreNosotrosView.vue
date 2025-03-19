
<script setup lang="ts">
import backgroundImage from '@/assets/images/landing/AboutNosotros.png';
</script>

<template>
    <main class="flex flex-col gap-[2rem]">
        <div class="my-[1rem] sm:py-[6rem] sm:px-[6rem] w-full flex sm:flex-row flex-col  relative bg-cover bg-center"
        :style="{ backgroundImage: `url(${backgroundImage})` }">
            <div class="w-full sm:w-4/6 p-2 flex flex-col px-[1rem] sm:py-[3rem] bg-[#2E3944]/80">
                <h1 class="text-[#D3D9D4] text-2xl sm:text-5xl font-bold uppercase">
                    Sobre nosotros
                </h1>
                <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
                    Quiénes somos Somos una empresa tecnológica líder dedicada a la creación de soluciones innovadoras para mejorar la productividad y eficiencia de equipos de trabajo en diversas industrias. Nuestra misión es ayudar a organizaciones a optimizar sus flujos de trabajo y mejorar su rendimiento a través de herramientas digitales intuitivas.
                </p>
                <h1 class="text-[#D3D9D4] text-2xl sm:text-2xl font-bold uppercase pt-2 sm:pt-4">
                    Misión
                </h1>
                <p class="text-[#D3D9D4] text-sm sm:text-base pt-2">
                    Nuestra misión es ofrecer herramientas que mejoren la eficiencia de los equipos de trabajo. Ayudamos a las empresas a gestionar sus proyectos y tareas de manera efectiva, permitiendo que sus equipos se enfoquen en lo que realmente importa: la innovación y el crecimiento.
                </p>
                <h1 class="text-[#D3D9D4] text-2xl sm:text-2xl font-bold uppercase pt-2 sm:pt-4">
                    Visión
                </h1>
                <p class="text-[#D3D9D4] text-sm sm:text-base pt-2">
                    Aspiramos a ser el líder mundial en soluciones de productividad empresarial, brindando a nuestros clientes herramientas avanzadas de automatización y gestión de tareas que les permitan ahorrar tiempo y recursos.
                </p>
                <h1 class="text-[#D3D9D4] text-2xl sm:text-2xl font-bold uppercase pt-2 sm:pt-4">
                    Nuestros Valores
                </h1>
                <ul class="text-[#D3D9D4] text-sm sm:text-base pt-2">
                    <li>Innovación: Creemos que la tecnología tiene el poder de transformar los negocios. Estamos comprometidos con la creación de soluciones innovadoras.</li>
                    <li>Eficiencia: Nuestra filosofía es simplificar los procesos y maximizar los resultados mediante herramientas eficientes.</li>
                    <li>Colaboración: Trabajamos codo a codo con nuestros clientes para entender sus necesidades y ofrecerles soluciones a medida.</li>
                    <li>Transparencia: Valoramos la honestidad y la claridad en todas nuestras interacciones, tanto internas como externas.</li>
                </ul>
                <h1 class="text-[#D3D9D4] text-2xl sm:text-2xl font-bold uppercase pt-2 sm:pt-4">
                    Conoce a Nuestro Equipo
                </h1>
                <ul class="text-[#D3D9D4] text-sm sm:text-base pt-2">
                    <li>Nuestro equipo está formado por profesionales apasionados y experimentados en las áreas de desarrollo de software, gestión de proyectos, y atención al cliente. Cada miembro de nuestro equipo juega un papel crucial en el éxito de nuestros clientes.</li>
                    <div class="flex flex-col sm:pt-4">
                        <label class="text-[#D3D9D4] text-base font-bold uppercase">Gomez Broca Luis Alberto</label>
                        <label>Experiencia</label>
                    </div>
                    <div class="flex flex-col">
                        <label class="text-[#D3D9D4] text-base font-bold uppercase">Valier Sanchez Carlos Francisco</label>
                        <label>Experiencia</label>
                    </div>
                    <div class="flex flex-col">
                        <label class="text-[#D3D9D4] text-base font-bold uppercase">Misael De Jesus Rosado Paat</label>
                        <label>Experiencia</label>
                    </div>
                    <div class="flex flex-col">
                        <label class="text-[#D3D9D4] text-base font-bold uppercase">Fernando Alberto Villafaña Alfonseca</label>
                        <label>Experiencia</label>
                    </div>
                    <div class="flex flex-col">
                        <label class="text-[#D3D9D4] text-base font-bold uppercase">Juan Diego Mendoza Gutierrez</label>
                        <label>Experiencia</label>
                    </div>
                </ul>
                <h1 class="text-[#D3D9D4] text-2xl sm:text-2xl font-bold uppercase pt-2 sm:pt-4">Contáctanos </h1>
                <p class="text-[#D3D9D4] text-sm sm:text-base pt-2">
                    ¿Estás listo para llevar tu equipo al siguiente nivel? Contáctanos para obtener más información sobre nuestras soluciones o solicitar una demostración gratuita.
                </p>
            </div>
        </div>
    </main>
</template>