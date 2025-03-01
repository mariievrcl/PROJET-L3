<template>
  <div>
    <Header />
    <router-view /> <!-- C'est ici que les pages vont s'afficher -->
  </div>
</template>
<script setup>
import Header from './components/Header.vue'
</script>

<style scoped>
nav {
  background: rgba(30, 30, 46, 0.95);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

nav a:hover {
  color: #a65fdf;
  background: rgba(255, 255, 255, 0.1);
}

.spotify-connect-btn {
  background: #1DB954;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spotify-connect-btn:hover {
  background: #1ed760;
  transform: scale(1.05);
}

/* Ajoutez un padding en haut du contenu principal pour compenser la navbar fixe */
:deep(router-view) {
  padding-top: 70px;
}
</style>

