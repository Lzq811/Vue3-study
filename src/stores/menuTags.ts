import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuTagsStore = defineStore('use-menu-tags', () => {
  const menusTags: Ref<string[]> = ref([])
  function addMenuTags(path: string) {
    const idx = menusTags.value.findIndex(item => item === path)
    if (idx !== -1) {
      menusTags.value.push(path)
    }
  }

  return { menusTags, addMenuTags }
})
