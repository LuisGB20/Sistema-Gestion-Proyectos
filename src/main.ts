import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue,
    {
        unstyled: true,
        pt: {
            button: {
                root: 'bg-gradient-to-r from-[#124E66] to-[#2E3944] shadow-md  cursor-pointer py-2 px-4 rounded-xl border-0 flex gap-2 duration-150 ease-in hover:scale-105',
                label: 'text-[#FFF] font-semibold',
                icon: 'text-white text-xl'
            },
        }
    }
);

app.mount('#app')
