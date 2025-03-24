<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TabMenu from 'primevue/tabmenu'

interface TabItem {
  route: string
  icon: string
  text: string
}

const props = defineProps<{
  tabs: TabItem[]
}>()

const router = useRouter()
const route = useRoute()

const items = props.tabs.map(tab => ({
  label: tab.text,
  icon: tab.icon,
  command: () => {
    if (route.path !== tab.route) {
      router.push(tab.route)
    }
  }
}))

const activeIndex = computed(() => {
  return props.tabs.findIndex(tab => tab.route === route.path)
})
</script>

<template>
  <TabMenu :model="items" :activeIndex="activeIndex" />
</template>
