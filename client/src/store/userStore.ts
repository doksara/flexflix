import { defineStore } from 'pinia'

export type UserState = {
  id: number | undefined,
  token: string | undefined
}

const defaultState: UserState = {
  id: undefined,
  token: undefined
}

export const useUserStore = defineStore('userStore', {
  state: () => {
    return defaultState
  },
  actions: {
    loginUser(username: string, password: string) {
      
    }
  }
})