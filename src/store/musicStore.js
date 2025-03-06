// store/musicStore.js
import { defineStore } from 'pinia';
import { getAccessToken } from '../../src/services/spotify'; // Ajoutez cette ligne

export const useMusicStore = defineStore('music', {
  state: () => ({
    currentAlbum: null,
    albumTracks: [],
    currentTrack: null
  }),
  
  actions: {
    async fetchAlbum(albumId) {
      // Récupérer les détails de l'album depuis l'API Spotify
      const token = await getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      this.currentAlbum = data;
      this.albumTracks = data.tracks.items;
      return data;
    },

    async fetchTrendingArtists() {
      const token = await getAccessToken();
      console.log("Token récupéré :", token);
    
      const response = await fetch("https://api.spotify.com/v1/search?q=genre:pop&type=artist&limit=10", {
        headers: { Authorization: `Bearer ${token}` }
      });
    
      const data = await response.json();
      console.log("Données reçues pour artistes tendances :", data);
    
      return data.artists.items; // Récupère la liste des artistes
    },
    
    async fetchUnknownArtists() {
  const token = await getAccessToken();
  console.log("Token récupéré pour artistes peu connus :", token);

  const response = await fetch("https://api.spotify.com/v1/me/player", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await response.json();
  console.log("Données reçues pour artistes peu connus :", data);

  return data.artists.items;
},

async fetchPopularAlbums() {
  const token = await getAccessToken();
  console.log("Token récupéré pour albums populaires :", token);

  const response = await fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await response.json();
  console.log("Données reçues pour albums populaires :", data);

  return data.items.map(item => item.track.album); // Récupère uniquement les albums des morceaux de la playlist
},
    
    setCurrentTrack(track) {
      this.currentTrack = track;
    }
  }
});
