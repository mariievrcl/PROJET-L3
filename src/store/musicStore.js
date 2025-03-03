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
    
      const response = await fetch("https://api.spotify.com/v1/browse/categories/toplists/playlists", {
        headers: { Authorization: `Bearer ${token}` }
      });
    
      const data = await response.json();
      console.log("Données reçues pour artistes tendances :", data);
    
      return data;
    },
    async fetchUnknownArtists() {
      const token = await getAccessToken();
      console.log("Token récupéré pour artistes peu connus :", token);
    
      const response = await fetch("https://api.spotify.com/v1/artists?ids=..."); // Remplace "..." par la bonne requête
      const data = await response.json();
      console.log("Données reçues pour artistes peu connus :", data);
    
      return data;
    },
    async fetchPopularAlbums() {
      const token = await getAccessToken();
      console.log("Token récupéré pour albums populaires :", token);
    
      const response = await fetch("https://api.spotify.com/v1/browse/new-releases", {
        headers: { Authorization: `Bearer ${token}` }
      });
    
      const data = await response.json();
      console.log("Données reçues pour albums populaires :", data);
    
      return data;
    },
    
    setCurrentTrack(track) {
      this.currentTrack = track;
    }
  }
});
