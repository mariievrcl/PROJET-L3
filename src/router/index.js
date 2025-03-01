import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Search from '@/pages/Search.vue';
import Playlist from '@/pages/Playlist.vue';
import Album from '@/pages/Album.vue';
import Artist from '@/pages/Artist.vue';
import Player from '@/pages/Player.vue';
import Profile from '@/pages/Profile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist,
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: Album,
    props: true,  // permet de passer l'ID comme prop dans le composant
  },
  {
    path: '/artist',
    name: 'Artist',
    component: Artist,
  },
  {
    path: '/player',
    name: 'Player',
    component: Player,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

