<script setup lang="ts">
import LinkComponent from "@/components/ui/LinkButton.vue";
import Button from "primevue/button";
import Card from "primevue/card";
import DataView from "primevue/dataview";
import SelectButton from "primevue/selectbutton";
import { ref, onMounted } from "vue";

onMounted(() => {
    teams.value = [
        {
            nombre: "Equipo de Desarrollo Web",
            descripcion: "Este equipo se encarga de crear y mantener aplicaciones web, asegurándose de que sean funcionales, eficientes y de fácil acceso.",
            fechaCreacion: "2023-01-15",
            lider: "Carlos Gómez",
            miembros: 5,
            estado: "Activo",
        },
        {
            nombre: "Equipo de Marketing Digital",
            descripcion: "Responsable de crear estrategias de marketing en redes sociales, SEO y publicidad digital para aumentar la presencia en línea de la empresa.",
            fechaCreacion: "2022-11-22",
            lider: "Ana Martínez",
            miembros: 4,
            estado: "Activo",
        },
        {
            nombre: "Equipo de Soporte Técnico",
            descripcion: "Brinda soporte técnico a los clientes y resuelve problemas relacionados con productos y servicios tecnológicos.",
            fechaCreacion: "2021-08-10",
            lider: "José Pérez",
            miembros: 6,
            estado: "Inactivo",
        },
        {
            nombre: "Equipo de Investigación y Desarrollo",
            descripcion: "Se encarga de investigar nuevas tecnologías y desarrollar productos innovadores para mejorar los servicios de la empresa.",
            fechaCreacion: "2020-03-05",
            lider: "Laura Ruiz",
            miembros: 7,
            estado: "Activo",
        },
        {
            nombre: "Equipo de Ventas",
            descripcion: "Su misión es captar nuevos clientes y gestionar las relaciones comerciales, ofreciendo soluciones personalizadas.",
            fechaCreacion: "2019-07-14",
            lider: "Pedro Sánchez",
            miembros: 8,
            estado: "Activo",
        },
        {
            nombre: "Equipo de Recursos Humanos",
            descripcion: "Encargado de la gestión del talento humano, reclutamiento, formación y bienestar de los empleados.",
            fechaCreacion: "2018-12-01",
            lider: "María López",
            miembros: 3,
            estado: "Activo",
        },
        {
            nombre: "Equipo de Finanzas",
            descripcion: "Gestiona los aspectos financieros de la empresa, incluyendo presupuestos, informes financieros y control de gastos.",
            fechaCreacion: "2017-06-17",
            lider: "Luis Hernández",
            miembros: 4,
            estado: "Activo",
        },
        {
            nombre: "Equipo de Calidad",
            descripcion: "Se encarga de la calidad y control de los productos y servicios de la empresa, asegurando que cumplan con los estándares establecidos.",
            fechaCreacion: "2022-05-10",
            lider: "Sara Gómez",
            miembros: 5,
            estado: "Inactivo",
        },
    ];

});

const teams = ref();
const layout = ref('grid');
const options = ref(['list', 'grid']);

</script>

<template>
    <main>
        <div class="flex justify-between mb-4">
            <h1 class="text-2xl font-bold">Equipos</h1>
            <LinkComponent to="" texto="Crear" />
        </div>
        <div class="card">
            <DataView :value="teams" paginator :rows="6">
                <template #list="slotProps">
                    <div class="grid grid-cols-3 gap-5 p-4">
                        <div v-for="(item, index) in slotProps.items" :key="index">
                            <Card style="width: 24rem; overflow: hidden">
                                <template #title>Advanced Card</template>
                                <template #subtitle>Card subtitle</template>
                                <template #content>
                                    <p class="m-0">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
                                        consequuntur
                                        error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
                                        nobis, culpa ratione quam perferendis esse, cupiditate neque
                                        quas!
                                    </p>
                                </template>
                                <template #footer>
                                    <div class="flex gap-4 mt-1">
                                        <Button label="Cancel" severity="secondary" outlined class="w-full" />
                                        <Button label="Save" class="w-full" />
                                    </div>
                                </template>
                            </Card>
                        </div>
                    </div>
                </template>
            </DataView>
        </div>
    </main>
</template>