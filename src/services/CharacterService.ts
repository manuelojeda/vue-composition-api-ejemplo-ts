import { Ref, ref } from 'vue'
import Character from '../interfaces/Character'

class CharacterService {
  private character: Ref<Character>
  private characters: Ref<Array<Character>>

  constructor () {
    this.character = ref<Character>({})
    this.characters = ref<Array<Character>>([])
  }

  getCharacter (): Ref<Character> {
    return this.character
  }

  getCharacters (): Ref<Array<Character>> {
    return this.characters
  }

  async fetchAll (): Promise<void> {
    try {
      const url = 'https://rickandmortyapi.com/api/character/'
      const response = await fetch(url)
      const json = await response.json()

      this.characters.value = await json.results
    } catch (error) {
      console.log(error)
    }
  }

  async fetchById (id: any): Promise<void> {
    try {
      const url = `https://rickandmortyapi.com/api/character/${id}`
      const response = await fetch(url)
      const json = await response.json()

      this.character.value = await json
    } catch (error) {
      console.log(error)
    }
  }
}

export default CharacterService
