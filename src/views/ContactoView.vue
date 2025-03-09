<script lang="ts">
import { defineComponent, ref } from 'vue';

import Button from 'primevue/button';



export default defineComponent({
  name: 'Contacto',
  components: {
    Button,  // Asegúrate de registrar el componente aquí
  },
});
</script>
<template>
    <main class="py-4 flex flex-col gap-[2rem]">
        <div class="p-3 mt-[2rem] sm:py-[3rem] sm:px-[6rem] w-full flex sm:flex-row flex-col bg-[#2E3944]">
            <div class="w-full sm:w-1/2 p-2 flex flex-col px-[1rem] sm:py-[3rem] items-center justify-start">
                <h1 class="text-[#D3D9D4] text-2xl sm:text-5xl font-bold">Contactanos</h1>
                <p class="text-[#D3D9D4] text-sm sm:text-base pt-2 sm:pt-4">
                    Porque contactarnos
                </p>
            </div>
            <div class="w-full sm:w-1/2 px-2 py-[1rem] flex flex-col ">
                <div class="w-full flex flex-col items-end justify-end sm:flex-row sm:px-4 gap-2 sm:gap-0">
                    <div class="w-3/4 rounded-4xl sm:rounded-2xl bg-white py-[2rem] px-[2rem] flex flex-col justify-center gap-2">
                        <label class="text-[#124E66] font-semibold uppercase text-sm">Facil y rapido</label>
                        <h1 class="text-[#124E66] font-semibold text-xl mb-6">Ingresa tus datos</h1>
                        <form @submit.prevent="" class="space-y-4">
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" name="name" id="name"
                                class="block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none   focus:outline-none focus:ring-0 focus:border-DarkTeal peer"
                                placeholder=" " required />
                                <label for="name"
                                class="peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre completo</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" name="phone" id="phone"
                                class="block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none   focus:outline-none focus:ring-0 focus:border-DarkTeal peer"
                                placeholder=" " required />
                                <label for="phone"
                                class="peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Celular</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="email" name="email" id="email"
                                class="block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none   focus:outline-none focus:ring-0 focus:border-DarkTeal peer"
                                placeholder=" " required />
                                <label for="email"
                                class="peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo electronico</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input
                                class="block py-2.5 px-0 w-full text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none   focus:outline-none focus:ring-0 focus:border-DarkTeal peer"
                                placeholder=" " required/>
                                <label for="affair"
                                class="peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Asunto</label>
                            </div>
                            <div class="relative z-0 w-full mb-10 group">
                                <textarea
                                class="block py-2.5 px-0 w-full h-[6rem] text-sm text-DarkTeal bg-transparent border-0 border-b-2 border-DarkTeal appearance-none   focus:outline-none focus:ring-0 focus:border-DarkTeal peer"
                                placeholder=" " required></textarea>
                                <label for="observation"
                                class="peer-focus:font-medium absolute text-sm text-DarkTeal duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-DarkTeal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripción</label>
                            </div>
                            <div class="card flex justify-center ">
                                <Button label="Envianos un correo"  class="w-1/2 flex justify-center items-center my-4" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>