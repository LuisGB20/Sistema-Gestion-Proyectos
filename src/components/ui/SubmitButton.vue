<template>
    <button type="submit"
        class="flex text-lg py-2 font-semibold px-4 rounded-lg border-2 border-DarkTeal bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white transition duration-250 ease-in
        hover:bg-transparent hover:border-DarkTeal hover:text-transparent hover:bg-clip-text hover:from-DarkTeal hover:to-CharcoalBlue w-full justify-center items-center my-4 cursor-pointer">
        {{ text }}
    </button>
</template>

<script setup lang="ts">

const props = defineProps<{
    text: string
}>();

const { text } = props
</script>