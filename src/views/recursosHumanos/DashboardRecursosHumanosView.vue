<template>
    <main class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <header class="text-center mb-8">
          <h1 class="text-3xl font-bold text-DarkTeal">Panel de Recursos Humanos</h1>
          <p class="text-gray-600 mt-2">Gestión de Empleados y Actividades</p>
        </header>
  
        <!-- Resumen de empleados -->
        <section class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <!-- Total de empleados -->
          <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
            <h3 class="text-sm md:text-lg font-semibold">Empleados Totales</h3>
            <p class="text-2xl md:text-4xl font-bold mt-2">250</p> <!-- Valor estático -->
          </div>
  
          <!-- Empleados activos -->
          <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
            <h3 class="text-sm md:text-lg font-semibold">Empleados Activos</h3>
            <p class="text-2xl md:text-4xl font-bold mt-2">220</p> <!-- Valor estático -->
          </div>
  
          <!-- Empleados en proyectos -->
          <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
            <h3 class="text-sm md:text-lg font-semibold">Empleados en Proyectos</h3>
            <p class="text-2xl md:text-4xl font-bold mt-2">50</p> <!-- Valor estático -->
          </div>
  
          <!-- Desempeño General -->
          <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
            <h3 class="text-sm md:text-lg font-semibold">Desempeño General</h3>
            <p class="text-xl md:text-2xl font-bold mt-2">87%</p> <!-- Valor estático -->
          </div>
        </section>
  
        <!-- Actividad mensual de empleados -->
        <div class="grid grid-cols-1 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad Mensual de Empleados</h2>
            <!-- Gráfica estática -->
            <div class="h-[300px] md:h-[400px] w-full rounded-lg bg-white flex justify-center items-center">
              <!-- Imagen o gráfico estático de ejemplo -->
              <img src="https://via.placeholder.com/800x400.png?text=Gráfica+de+Actividad+Mensual+de+Empleados" alt="Gráfica de actividad mensual" class="w-full h-full object-cover rounded-lg">
            </div>
          </div>
        </div>
  
        <!-- Sección de Últimos Desempeños -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Últimos Desempeños Registrados</h2>
            <!-- Tabla de últimos empleados evaluados -->
            <table class="min-w-full text-left table-auto">
              <thead>
                <tr class="bg-gray-100">
                  <th class="py-2 px-4 font-semibold">Empleado</th>
                  <th class="py-2 px-4 font-semibold">Puntuación</th>
                  <th class="py-2 px-4 font-semibold">Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2 px-4">Juan Pérez</td>
                  <td class="py-2 px-4">85%</td>
                  <td class="py-2 px-4">2025-03-01</td>
                </tr>
                <tr>
                  <td class="py-2 px-4">Ana López</td>
                  <td class="py-2 px-4">90%</td>
                  <td class="py-2 px-4">2025-03-02</td>
                </tr>
                <tr>
                  <td class="py-2 px-4">Carlos Gómez</td>
                  <td class="py-2 px-4">78%</td>
                  <td class="py-2 px-4">2025-03-03</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Últimos Proyectos Asignados -->
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Últimos Proyectos Asignados</h2>
            <!-- Tabla de últimos proyectos -->
            <table class="min-w-full text-left table-auto">
              <thead>
                <tr class="bg-gray-100">
                  <th class="py-2 px-4 font-semibold">Proyecto</th>
                  <th class="py-2 px-4 font-semibold">Empleado</th>
                  <th class="py-2 px-4 font-semibold">Fecha Asignada</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2 px-4">Desarrollo App Móvil</td>
                  <td class="py-2 px-4">Juan Pérez</td>
                  <td class="py-2 px-4">2025-03-01</td>
                </tr>
                <tr>
                  <td class="py-2 px-4">Rediseño Página Web</td>
                  <td class="py-2 px-4">Ana López</td>
                  <td class="py-2 px-4">2025-03-02</td>
                </tr>
                <tr>
                  <td class="py-2 px-4">Automatización Procesos</td>
                  <td class="py-2 px-4">Carlos Gómez</td>
                  <td class="py-2 px-4">2025-03-03</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  </template>
  