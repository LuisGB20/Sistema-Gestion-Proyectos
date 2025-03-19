<template>
  <div class="w-full flex flex-col items-center p-4">
    <div class="w-full sm:w-[98%] md:w-[98%] lg:w-4/5 xl:w-3/5">
      <div
        class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col">
        <h3 class="text-gainsboro text-xl font-semibold text-start">Sistemas ejecutandose</h3>
      </div>

      <h1 class="text-end text-neutral-500 mt-[4rem] font-light">Tiempo de actividad en los ultimos 90 días.</h1>
      <div v-for="(service, index) in services" :key="index"
        class="service bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-start">
        <h3 class="font-semibold">{{ service.name }}</h3>
        <UptimeChart :uptimeData="service.uptimeData" />
        <div class="flex flex-row justify-between text-xs text-neutral-500">
          <span>{{ service.details.lastUpdated }}</span>
          <span>{{ service.details.uptimePercentage }}% tiempo de actividad</span>
          <span>{{ service.details.today }}</span>
        </div>
      </div>

      <!-- Grafica de logs lineal? -->
      <ResponseTimeChart/>
    </div>
  </div>
</template>

<!-- Script para el funcionamiento de las graficas de tiempo -->
<script>
import { getStatusData, getServicesList } from '@/Services/test/statusService';
import UptimeChart from '@/components/__tests__/UptimeChart.vue';
import ResponseTimeChart from '@/components/__tests__/ResponseTimeChart.vue'

export default {
  components: {
    UptimeChart,
    ResponseTimeChart,
  },
  data() {
    return {
      services: [],
      serviceName: '',
      serviceStatus: '',
      serviceStatusText: ''
    };
  },
  mounted() {
    this.fetchServiceStatus();
  },
  methods: {
    async fetchServiceStatus() {
      try {
        // Obtener la lista de servicios desde la API
        const servicesList = await getServicesList();

        // Usamos Promise.all para ejecutar las solicitudes de manera concurrente
        const servicesWithDetails = await Promise.all(
          servicesList.map(async (service) => {
            // Aseguramos que details esté correctamente inicializado
            service.details = service.details || {
              uptimePercentage: 'N/A',
              lastUpdated: 'N/A',
              today: 'N/A'
            };

            try {
              const data = await getStatusData(service.name);  // Se usa el nombre del servicio para obtener los datos

              if (data) {
                // Asignamos los datos obtenidos a las propiedades correspondientes
                service.uptimeData = data.uptimeData;
                service.details.uptimePercentage = data.uptime || 'N/A';
                service.details.lastUpdated = data.details?.lastUpdated || 'N/A';
                service.details.today = data.details?.today || 'N/A';
                service.serviceStatus = data.status || 'N/A';
                service.serviceStatusText = data.status === 'operational' ? 'Operational' : 'Partial Outage';
              }
            } catch (err) {
              console.error(`Error al obtener datos de estado para el servicio ${service.name}:`, err);
              service.serviceStatusText = 'Error al obtener datos';
            }

            return service;
          })
        );
        // Asignar servicios con sus datos actualizados
        this.services = servicesWithDetails;
      } catch (err) {
        console.error('Error al obtener la lista de servicios:', err);
      }
    },
  },
};
</script>

<style scoped>
.service {
  margin-bottom: 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}



.status.operational {
  color: green;
}
</style>
