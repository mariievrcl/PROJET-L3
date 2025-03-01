// stores/authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: null
  }),
  actions: {
    setToken(token) {
      this.token = token
      this.isAuthenticated = true
      localStorage.setItem('spotify_token', token)
    },
    clearToken() {
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('spotify_token')
    }
  }
})