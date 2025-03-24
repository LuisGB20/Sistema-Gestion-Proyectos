import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', () => {
    const isCreateModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const isEmployeeActivityModalOpen = ref(false);
    const isEmployeeDataModalOpen = ref(false);

    return { isCreateModalOpen, isEditModalOpen, isEmployeeActivityModalOpen, isEmployeeDataModalOpen}

})