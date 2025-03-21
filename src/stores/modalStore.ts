import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', () => {
    const isCreateModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const isEmployeeActivityModalOpen = ref(true);

    return { isCreateModalOpen, isEditModalOpen, isEmployeeActivityModalOpen}

})