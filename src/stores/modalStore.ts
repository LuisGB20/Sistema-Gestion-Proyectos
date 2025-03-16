import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', () => {
    const isCreateModalOpen = ref(false);
    const isEditModalOpen = ref(false);

    return { isCreateModalOpen, isEditModalOpen}

})