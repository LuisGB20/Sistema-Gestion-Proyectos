
<script setup lang="ts">
import backgroundImage from '@/assets/Imagenes/AboutNosotros.jpg';
</script>

<template>
    <main class="py-4 flex flex-col gap-[2rem]">
    <div class="mt-[2rem] sm:py-[6rem] sm:px-[6rem] w-full flex sm:flex-row flex-col  relative bg-cover bg-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div class="w-full sm:w-4/6 p-2 flex flex-col px-[1rem] sm:py-[3rem] bg-[#2E3944]/80">
            <h1 class="text-[#D3D9D4] text-2xl sm:text-5xl font-bold">
                Sobre nosotros.
            </h1>
            <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
                Quiénes somos Somos una empresa tecnológica líder dedicada a la creación de soluciones innovadoras para mejorar la productividad y eficiencia de equipos de trabajo en diversas industrias. Nuestra misión es ayudar a organizaciones a optimizar sus flujos de trabajo y mejorar su rendimiento a través de herramientas digitales intuitivas.
            </p>
            <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
                Nuestra Historia Fundada en 2010, [Nombre de la Empresa] nació con la visión de revolucionar la forma en que las empresas gestionan sus proyectos. Desde nuestros humildes comienzos en una pequeña oficina en [Ciudad], hemos crecido hasta convertirnos en una empresa global que atiende a miles de clientes en más de 30 países.
            </p>
            <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
            Misión Nuestra misión es ofrecer herramientas que mejoren la eficiencia de los equipos de trabajo. Ayudamos a las empresas a gestionar sus proyectos y tareas de manera efectiva, permitiendo que sus equipos se enfoquen en lo que realmente importa: la innovación y el crecimiento.
            </p>
            <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
            Visión Aspiramos a ser el líder mundial en soluciones de productividad empresarial, brindando a nuestros clientes herramientas avanzadas de automatización y gestión de tareas que les permitan ahorrar tiempo y recursos.
            </p>
            <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
            Nuestros Valores
            Innovación: Creemos que la tecnología tiene el poder de transformar los negocios. Estamos comprometidos con la creación de soluciones innovadoras.
            Eficiencia: Nuestra filosofía es simplificar los procesos y maximizar los resultados mediante herramientas eficientes.
            Colaboración: Trabajamos codo a codo con nuestros clientes para entender sus necesidades y ofrecerles soluciones a medida.
            Transparencia: Valoramos la honestidad y la claridad en todas nuestras interacciones, tanto internas como externas.
            </p>

            <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
            Conoce a Nuestro Equipo Nuestro equipo está formado por profesionales apasionados y experimentados en las áreas de desarrollo de software, gestión de proyectos, y atención al cliente. Cada miembro de nuestro equipo juega un papel crucial en el éxito de nuestros clientes.

            [Nombre del Fundador] - CEO y Fundador
            Con más de 15 años de experiencia en la industria tecnológica, [Nombre del Fundador] es el motor detrás de nuestra misión de transformar el mundo de la productividad empresarial.

            [Nombre del Director de Tecnología] - CTO
            [Nombre] lidera el equipo de desarrollo y garantiza que nuestras soluciones tecnológicas sean innovadoras y de alta calidad.

            [Nombre del Gerente de Atención al Cliente] - Gerente de Soporte
            [Nombre] y su equipo están comprometidos con ofrecer un servicio al cliente excepcional, asegurando que nuestros clientes saquen el máximo provecho de nuestras herramientas.
            </p>
            <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
            Contáctanos ¿Estás listo para llevar tu equipo al siguiente nivel? Contáctanos para obtener más información sobre nuestras soluciones o solicitar una demostración gratuita.
            </p>
        </div>
    </div>
</main>
</template>