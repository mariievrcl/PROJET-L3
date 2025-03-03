// Importation des identifiants client et secret depuis les variables d'environnement
const CLIENT_ID = import.meta.env.VITE_API_KEY_SPOTIFY;
const CLIENT_SECRET = import.meta.env.VITE_API_SECRET_SPOTIFY;

// Fonction pour obtenir un token d'accès à l'API Spotify
export async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST", // Méthode POST pour envoyer les données
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Type de contenu
      Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`), // Authentification de base encodée en base64
    },
    body: "grant_type=client_credentials", // Type de grant pour obtenir un token d'accès
  });

  const data = await response.json(); // Conversion de la réponse en JSON
  return data.access_token; // Retourne le token d'accès
}

// Fonction pour obtenir les nouvelles sorties d'albums
async function getNewReleases() {
  const token = await getAccessToken(); // Obtention du token d'accès
  const response = await fetch(
    "https://api.spotify.com/v1/browse/new-releases",
    {
      headers: { Authorization: `Bearer ${token}` }, // Ajout du token dans les en-têtes de la requête
    }
  );

  const data = await response.json(); // Conversion de la réponse en JSON
  console.log(data)
  return data.albums.items; // Retourne la liste des nouveaux albums
}

// Fonction pour obtenir les artistes d'une playlist spécifique
async function getArtists() {
  const token = await getAccessToken(); // Obtention du token d'accès
  const response = await fetch("https://api.spotify.com/v1/playlists/4eMwMyoiGx9GtDpDaRz3qA", {
    headers: { Authorization: `Bearer ${token}` }, // Ajout du token dans les en-têtes de la requête
  });

  const data = await response.json(); // Conversion de la réponse en JSON
  return data.tracks.items; // Retourne la liste des pistes de la playlist
}

// Fonction pour obtenir des recommandations d'albums
async function getRecommandations() {

  try{
  
  const token = await getAccessToken(); // Obtention du token d'accès
  
  const response = await fetch("hhttps://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
  {
  
  headers: { Authorization: `Bearer ${token}`
  }, // Ajout du token dans les en-têtes de la requête
  
  });
  
  const data = await response.json(); // Conversion de la
  // réponse en JSON
  
  return data.albums.items; // Retourne la liste des albums recommandés
  
  }
  
  catch(e) {
  
  console.log(`Erreur lors de la récupération des recommandations: ${e}`)
  
  return []
  
  }
  
  }

// Fonction pour obtenir les playlists populaires
async function getPlaylists() {
  const token = await getAccessToken(); // Obtention du token d'accès
  const response = await fetch("https://api.spotify.com/v1/browse/categories", {
    headers: { Authorization: `Bearer ${token}` }, // Ajout du token dans les en-têtes de la requête
  });

  const data = await response.json(); // Conversion de la réponse en JSON
  return data.albums.items; // Retourne la liste des albums populaires
}

// Exportation des fonctions pour les utiliser dans d'autres fichiers
export { getNewReleases, getArtists, getRecommandations, getPlaylists };