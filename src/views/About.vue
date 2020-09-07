<template>
  <div class="about" >
    <div v-if="!isLoading">
      <img :src="character.image" :alt="character.name">
      <h3>
        {{character.name}}
      </h3>
      <p>
        <b>Specie: </b>{{character.species}}
      </p>
      <p>
        <b>Type: </b>{{character.type}}
      </p>
      <p>
        <b>Status: </b>{{character.status}}
      </p>
      <p>
        <b>Origin: </b>{{character.origin.name}} - {{character.origin.url}}
      </p>
      <p>
        <b>Location: </b>{{character.location.name}} - {{character.location.url}}
      </p>
      <p>
        <router-link to="/">
          Return
        </router-link>
      </p>
    </div>
    <div v-else>
      Is Loading
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CharacterService from '../services/CharacterService'

export default defineComponent({
  name: 'About',
  setup () {
    const service = new CharacterService()
    const character = service.getCharacter()
    const isLoading = ref<boolean>(true)
    const { id } = useRoute().params

    onMounted(async () => {
      await service.fetchById(id)
      isLoading.value = false
    })

    return {
      character,
      isLoading
    }
  }
})
</script>
