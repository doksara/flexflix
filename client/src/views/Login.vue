<template>
  <div class="v-login inline-flex rounded-lg justify-center p-5 shadow-md bg-white">
    <form @submit.prevent="loginUser" class="v-login__form">
      <FormInputField
        label="Username"
        id="username"
        type="text"
        v-model="username"
      />
      <FormInputField
        class="mt-2"
        label="Password"
        id="password"
        type="password"
        v-model="password"
      />
      <button type="submit" class="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Log In</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormInputField from '@/components/FormInputField.vue'
import { useAuthClient } from '@/http/authClient'

export default defineComponent({
  components: {
    FormInputField
  },

  setup() {
    const { login, isLoading, error, userData } = useAuthClient()

    const username = ref('')
    const password = ref('')

    const loginUser = async (e: Event) => {
      await login(username.value, password.value);

      console.log(userData)
    }

    return {
      username,
      password,
      loginUser
    }
  },
})
</script>