<template>
  <div class="player-container" v-if="currentTrack">
    <!-- Informations sur la piste en cours -->
    <div class="player-info">
      <div class="track-info">
        <h3>{{ currentTrack.name }}</h3>
        <p>{{ artistName }}</p>
      </div>
    </div>
    
    <!-- Contrôles du lecteur -->
    <div class="player-controls">
      <!-- Intégration du lecteur Spotify -->
      <iframe 
        :src="spotifyEmbedUrl" 
        width="100%" 
        height="152" 
        frameborder="0" 
        allowfullscreen 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
      </iframe>
      
      <!-- Bouton de retour à l'accueil -->
      <div class="control-buttons">
        <router-link to="/" class="back-btn">Retour à l'accueil</router-link>
      </div>
    </div>
  </div>
  <div v-else class="no-track">
    <!-- Message affiché si aucune piste n'est sélectionnée -->
    <p>Aucune piste sélectionnée</p>
    <router-link to="/" class="back-btn">Retour à l'accueil</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useMusicStore } from '@/store/musicStore';

const musicStore = useMusicStore(); // Utilisation du store pour gérer la musique

const currentTrack = computed(() => musicStore.currentTrack); // Piste actuelle
const albumImage = computed(() => {
  if (currentTrack.value && currentTrack.value.album && currentTrack.value.album.images && currentTrack.value.album.images.length > 0) {
    return currentTrack.value.album.images[0].url; // Image de l'album
  }
  return ''; // Image par défaut ou vide
});

const artistName = computed(() => {
  if (currentTrack.value && currentTrack.value.artists && currentTrack.value.artists.length > 0) {
    return currentTrack.value.artists[0].name; // Nom de l'artiste
  }
  return 'Artiste inconnu';
});

// Générer l'URL d'intégration Spotify pour la piste actuelle
const spotifyEmbedUrl = computed(() => {
  if (currentTrack.value && currentTrack.value.id) {
    return `https://open.spotify.com/embed/track/${currentTrack.value.id}`;
  }
  return '';
});
</script>

<style scoped>
.player-container {
  background: rgba(30, 30, 46, 0.9);
  border-radius: 10px;
  padding: 1.5rem;
  max-width: 600px;
  margin: 10rem auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.player-info {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.player-cover {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 1rem;
}

.track-info h3 {
  margin: 0 0 0.5rem 0;
  color: white;
}

.track-info p {
  margin: 0;
  color: #a65fdf;
}

.player-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.no-track {
  text-align: center;
  padding: 2rem;
  color: white;
}

.back-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #a65fdf;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.2s;
}

.back-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}
</style>