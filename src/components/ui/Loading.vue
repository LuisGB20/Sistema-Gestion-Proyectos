<template>
  <div class="loading-overlay">
    <div class="custom-loader">
      <div class="outer-circle"></div>
      <div class="inner-circle"></div>
      <p class="loading-text">Cargando...</p>
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.custom-loader {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.outer-circle {
  width: 80px;
  height: 80px;
  border: 4px solid transparent;
  border-top-color: #124E66;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.inner-circle {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #212A31; 
  border-radius: 50%;
  opacity: 0.7;
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-text {
  position: absolute;
  bottom: -40px;
  color: white;
  font-weight: 600;
  letter-spacing: 1px;
  animation: fade 2s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
}

@keyframes fade {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>