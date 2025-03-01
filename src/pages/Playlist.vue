<template>
  <div class="liked-tracks-container">
    <!-- Section d'en-tête -->
    <div class="header-section">
      <div class="header-content">
        <div class="heart-icon">❤️</div>
        <div class="header-text">
          <h1>Mes Favoris</h1>
          <p>{{ likedTracks.length }} pistes que vous adorez</p>
        </div>
      </div>
    </div>

    <!-- Contenu des pistes likées -->
    <div v-if="likedTracks.length > 0" class="tracks-content">
      <!-- Barre de recherche -->
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher dans vos favoris..." 
          class="search-input"
        />
      </div>

      <!-- Liste des pistes -->
      <div class="tracks-list">
        <div 
          v-for="(track, index) in filteredTracks" 
          :key="track.id" 
          class="track-item"
          :class="{ 'playing': currentPlayingIndex === index }"
        >
          <div class="track-number">{{ index + 1 }}</div>
          
          <!-- Image de la piste -->
          <div class="track-image" v-if="track.album && track.album.images && track.album.images.length">
            <img :src="track.album.images[0].url" :alt="track.name" />
          </div>
          <div class="track-image placeholder" v-else>
            <span>🎵</span>
          </div>
          
          <!-- Informations sur la piste -->
          <div class="track-info">
            <div class="track-name">{{ track.name }}</div>
            <div class="track-artist">{{ track.artists[0].name }}</div>
            <div class="track-album" v-if="track.album">{{ track.album.name }}</div>
          </div>
          
          <!-- Durée de la piste -->
          <div class="track-duration" v-if="track.duration_ms">
            {{ formatDuration(track.duration_ms) }}
          </div>
          
          <!-- Actions sur la piste -->
          <div class="track-actions">
            <button 
              class="play-button" 
              @click="playTrack(track, index)"
              :disabled="!track.preview_url"
            >
              <span v-if="currentPlayingIndex === index && isPlaying">⏸️</span>
              <span v-else>▶️</span>
            </button>
            <button class="remove-button" @click="removeTrack(index)">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- État vide si aucune piste likée -->
    <div v-else class="empty-state">
      <div class="empty-icon">💔</div>
      <h2>Aucune piste likée</h2>
      <p>Explorez des albums et ajoutez des pistes à vos favoris</p>
    </div>

    <!-- Lecteur audio fixe en bas de page -->
    <div class="audio-player" v-if="currentTrack">
      <audio 
        ref="audioPlayer" 
        :src="currentTrack.preview_url" 
        @ended="handleTrackEnd"
        @play="isPlaying = true"
        @pause="isPlaying = false"
      ></audio>
      
      <div class="player-track-info">
        <div class="player-image" v-if="currentTrack.album && currentTrack.album.images">
          <img :src="currentTrack.album.images[0].url" :alt="currentTrack.name" />
        </div>
        <div class="player-text">
          <div class="player-track-name">{{ currentTrack.name }}</div>
          <div class="player-artist-name">{{ currentTrack.artists[0].name }}</div>
        </div>
      </div>
      
      <div class="player-controls">
        <button @click="playPrevious" :disabled="!hasPrevious">⏮️</button>
        <button @click="togglePlay" class="play-pause-btn">
          <span v-if="isPlaying">⏸️</span>
          <span v-else>▶️</span>
        </button>
        <button @click="playNext" :disabled="!hasNext">⏭️</button>
      </div>
      
      <div class="player-volume">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          v-model="volume" 
          @input="updateVolume"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const likedTracks = ref([]); // Liste des pistes likées
const searchQuery = ref(''); // Requête de recherche
const currentTrack = ref(null); // Piste actuelle
const currentPlayingIndex = ref(null); // Index de la piste en cours de lecture
const isPlaying = ref(false); // État de lecture
const audioPlayer = ref(null); // Référence au lecteur audio
const volume = ref(0.7); // Volume du lecteur

// Filtrer les pistes en fonction de la recherche
const filteredTracks = computed(() => {
  if (!searchQuery.value) return likedTracks.value;
  
  const query = searchQuery.value.toLowerCase();
  return likedTracks.value.filter(track => 
    track.name.toLowerCase().includes(query) || 
    track.artists[0].name.toLowerCase().includes(query)
  );
});

// Vérifier si on peut passer à la piste précédente/suivante
const hasPrevious = computed(() => currentPlayingIndex.value > 0);
const hasNext = computed(() => currentPlayingIndex.value < filteredTracks.value.length - 1);

// Charger les pistes likées depuis le localStorage
onMounted(() => {
  const storedTracks = JSON.parse(localStorage.getItem('likedTracks')) || [];
  likedTracks.value = storedTracks;
  
  // Initialiser le volume du lecteur
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value;
  }
});

// Observer les changements sur le lecteur audio
watch(audioPlayer, (newPlayer) => {
  if (newPlayer) {
    newPlayer.volume = volume.value;
  }
});

// Formater la durée en minutes:secondes
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Jouer une piste
const playTrack = (track, index) => {
  if (!track.preview_url) {
    alert("❌ Aucun extrait disponible pour cette piste !");
    return;
  }
  
  if (currentPlayingIndex.value === index && isPlaying.value) {
    // Pause si la même piste est déjà en cours de lecture
    audioPlayer.value.pause();
  } else {
    // Jouer la piste sélectionnée
    currentTrack.value = track;
    currentPlayingIndex.value = index;
    
    // Attendre que le DOM soit mis à jour
    setTimeout(() => {
      audioPlayer.value.play();
    }, 50);
  }
};

// Basculer entre lecture et pause
const togglePlay = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
};

// Jouer la piste précédente
const playPrevious = () => {
  if (hasPrevious.value) {
    const newIndex = currentPlayingIndex.value - 1;
    playTrack(filteredTracks.value[newIndex], newIndex);
  }
};

// Jouer la piste suivante
const playNext = () => {
  if (hasNext.value) {
    const newIndex = currentPlayingIndex.value + 1;
    playTrack(filteredTracks.value[newIndex], newIndex);
  }
};

// Gérer la fin d'une piste
const handleTrackEnd = () => {
  isPlaying.value = false;
  
  // Passer automatiquement à la piste suivante si disponible
  if (hasNext.value) {
    playNext();
  }
};

// Mettre à jour le volume
const updateVolume = () => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value;
  }
};

// Supprimer une piste des favoris
const removeTrack = (index) => {
  // Si la piste à supprimer est en cours de lecture, arrêter la lecture
  if (currentPlayingIndex.value === index) {
    if (audioPlayer.value) {
      audioPlayer.value.pause();
    }
    currentTrack.value = null;
    currentPlayingIndex.value = null;
    isPlaying.value = false;
  }
  
  // Ajuster l'index de lecture si nécessaire
  if (currentPlayingIndex.value !== null && currentPlayingIndex.value > index) {
    currentPlayingIndex.value--;
  }
  
  // Supprimer la piste
  const updatedTracks = [...likedTracks.value];
  updatedTracks.splice(index, 1);
  likedTracks.value = updatedTracks;
  
  // Mettre à jour le localStorage
  localStorage.setItem('likedTracks', JSON.stringify(updatedTracks));
};
</script>

<style scoped>
.liked-tracks-container {
  background: linear-gradient(to bottom, #1e1e2e, #15151e);
  color: white;
  min-height: 100vh;
  padding-bottom: 80px; /* Espace pour le lecteur fixe */
}

.header-section {
  background: rgba(166, 95, 223, 0.2);
  padding: 3rem 2rem;
  position: relative;
}

.header-content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.heart-icon {
  font-size: 4rem;
  margin-right: 2rem;
  background: linear-gradient(45deg, #ff4081, #a65fdf);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.header-text h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.header-text p {
  margin: 0.5rem 0 0;
  opacity: 0.8;
  font-size: 1.1rem;
}

.tracks-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-bar {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  border-radius: 30px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 2px rgba(166, 95, 223, 0.5);
}

.tracks-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.track-item {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.2s;
}

.track-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.track-item.playing {
  background: rgba(166, 95, 223, 0.2);
  border-left: 4px solid #a65fdf;
}

.track-number {
  width: 30px;
  text-align: center;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
}

.track-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 1rem;
}

.track-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.track-image.placeholder {
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.track-info {
  flex: 1;
  min-width: 0;
}

.track-name {
  font-weight: 600;
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artist, .track-album {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-duration {
  margin: 0 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.track-actions {
  display: flex;
  gap: 0.5rem;
}

.play-button, .remove-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.play-button {
  background: rgba(166, 95, 223, 0.7);
}

.play-button:hover {
  background: rgba(166, 95, 223, 1);
}

.play-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.remove-button {
  background: rgba(255, 255, 255, 0.1);
}

.remove-button:hover {
  background: rgba(255, 59, 59, 0.7);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h2 {
  margin: 0;
  font-size: 1.8rem;
}

.empty-state p {
  margin: 0.5rem 0 0;
  opacity: 0.7;
}

/* Lecteur audio fixe */
.audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(20, 20, 30, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 0.8rem 2rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
  height: 80px;
}

.player-track-info {
  display: flex;
  align-items: center;
  width: 30%;
}

.player-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
}

.player-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-text {
  min-width: 0;
}

.player-track-name {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-artist-name {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 1;
}

.player-controls button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.player-controls button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.player-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.play-pause-btn {
  background: #a65fdf !important;
  width: 50px !important;
  height: 50px !important;
}

.play-pause-btn:hover {
  background: #8a4dba !important;
}

.player-volume {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}

.player-volume input[type="range"] {
  width: 100px;
  -webkit-appearance: none;
  height: 5px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
}

.player-volume input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #a65fdf;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .heart-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .track-item {
    flex-wrap: wrap;
  }
  
  .track-duration {
    display: none;
  }
  
  .audio-player {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }
  
  .player-track-info, .player-controls, .player-volume {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .player-volume {
    justify-content: center;
  }
}
</style>