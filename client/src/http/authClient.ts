import HTTP from './baseClient'
import { ref, reactive } from 'vue'

const URL = '/api/auth/login'

type UserData = {
  id: number
  role: string
  username: string
}

const decodeJwt= (token: string): UserData | null => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

type TokenData = {
  token: string
  expiration: string
}

type HttpResponse = {
  data: TokenData | null
  success: boolean
  customMessage: string | null
  message: string | null
}

export const useAuthClient = () => {
  const isLoading = ref(false)
  const error = ref(null)
  const userData = reactive({
    id: -1,
    token: '',
  });

  const login = async (loginUsername: string, loginPassword: string) => {
    isLoading.value = true;
    
    const request = {
      username: loginUsername,
      password: loginPassword
    }

    await HTTP
      .post<HttpResponse>(URL, request)
      .then((response) => {
        if (response.data.data){
          const data = decodeJwt(response.data.data.token)

          if (data !== null){
            userData.id = data.id
            userData.token = response.data.data.token
          }
        }
      })
      .catch(err => {
        error.value = err
      })
    
    isLoading.value = false
  }
  
  return {
    isLoading,
    error,
    userData,
    login
  }
}