
<template>
    <div class="uptime-chart">
        <div class="bar" v-for="(bar, index) in uptimeData" :key="index" :class="bar.status">
        </div>
    </div>
</template>


<script>
export default {
    props: {
        uptimeData: Array,
    },
};
</script>

<style scoped>

.uptime-chart {
  display: flex;
  margin: 15px 0;
}
.bar {
    width: 10px;
    height: 30px;
    margin-right: 2px;
}

.bar.operational {
    background-color: green;
}

.bar.partial {
    background-color: orange;
}
</style>
