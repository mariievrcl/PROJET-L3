<template>
  <div class="profile-container">
    <!-- Bannière du Profil -->
    <div class="banner">
      <img :src="user.profilePicture" alt="Profile Picture" class="profile-img" />
      <h1>{{ user.name }}</h1>
      <p>{{ user.bio }}</p>
    </div>

    <!-- Statistiques musicales -->
    <section class="user-stats">
      <h2>🎧 Statistiques musicales</h2>
      <div class="stat-card">
        <p>📈 Nombre de morceaux écoutés : {{ user.totalTracks }}</p>
        <p>🎵 Playlist la plus écoutée : {{ user.favoritePlaylist }}</p>
      </div>
    </section>
    
    <!-- Playlists créées -->
    <section class="created-playlists-section">
      <h2>🎶 Playlists créées par {{ user.name }}</h2>
      <div v-if="user.playlists.length > 0" class="playlists-grid">
        <div v-for="playlist in user.playlists" :key="playlist.id" class="card" @click="viewPlaylist(playlist)">
          <img :src="playlist.image" alt="Playlist Cover" class="cover" />
          <p class="title">{{ playlist.name }}</p>
        </div>
      </div>
      <p v-else class="no-playlists">Aucune playlist créée pour le moment.</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Ajout du hook useRouter pour la navigation

const router = useRouter(); // Initialisation du router

const user = ref({
  name: "Marie Viricel",
  profilePicture: "https://i.pinimg.com/736x/e7/83/4b/e7834b5fa7473b9793d256433096f86a.jpg",
  bio: "Musique, voyages et découvertes.",
  playlists: [
    { id: 1, name: "Favoris", image: "https://i.pinimg.com/474x/28/7a/80/287a80544bb2c1404188148213c34f93.jpg" },
    { id: 2, name: "Chill Vibes", image: "https://i.pinimg.com/474x/7d/c9/53/7dc953aa02a401bd28facfb0bfc4e7a1.jpg" }
  ]
});

// Fonction pour simuler la redirection vers la playlist
const viewPlaylist = (playlist) => {
  console.log(`Rediriger vers la playlist: ${playlist.name}`);
  if (playlist.name === "Favoris") {
    router.push({ name: 'Playlist' }); // Redirection vers la page Playlist si "Favoris"
  } else {
    router.push({ name: 'Playlist', params: { id: playlist.id } }); // Redirection vers la page de la playlist en fonction de l'ID
  }
};
</script>

<style scoped>
.profile-container {
  background: linear-gradient(to bottom, #1e1e2e, #15151e);
  color: white;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.banner {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 2rem;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #a65fdf;
}

h1 {
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: bold;
}

p {
  font-size: 1rem;
  color: #bbb;
  margin-top: 0.5rem;
}

.created-playlists-section {
  margin-top: 3rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.playlists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.card {
  background: rgba(255, 255, 255, 0.15);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.title {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
}

.no-playlists {
  color: #aaa;
  font-size: 1rem;
  text-align: center;
  margin-top: 2rem;
}
</style>
