import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const _userToken = ref<string|null>(null);
  const userToken = computed(() => _userToken.value);
  const isLoggedIn = computed(() => !!userToken.value);

  function setUserToken(token: string|null) {
    _userToken.value = token;
  }

  

  return { userToken, setUserToken, isLoggedIn }
})
