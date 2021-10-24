<template>
  <div class="mt-1 relative rounded-md shadow-sm">
    <label class="block text-sm font-medium text-left text-gray-700" :for="id">{{ label }}</label>
    <input
      class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      :id="id"
      :type="type"
      :value="modelValue"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String
    },
    label: {
      type: String
    },
    type: {
      type: String,
      required: true,
      default: 'text',
    },
    modelValue: {
      type: String,
      required: true
    }
  },

  setup(props, context) {
    const handleInput = (event: any) => {
      context.emit('update:modelValue', event.target.value);
    }

    return {
      handleInput
    }
  },
})
</script>
