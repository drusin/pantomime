<script setup lang="ts">
import type { Profile } from '@/types';
import { useGameStore } from '@/stores/game';
import { useProfileStore } from '@/stores/profiles';
import { ref, type Ref } from 'vue';
import AvatarComponent from '@/components/AvatarComponent.vue';
import { useRouter } from 'vue-router';

const gameStore = useGameStore();
const profileStore = useProfileStore();

type ResultLine = {
  profile: Profile,
  points: number
}

const results: Ref<Array<ResultLine>> = ref([]);

async function getResults() {
  for (const id of gameStore.currentPlayers) {
    const profile = await profileStore.getProfile(id);
    const points = gameStore.pointsFor(id);
    results.value.push({ profile, points });
  }
}
getResults();

const router = useRouter();

</script>

<template>
<div class="container">
  <header>
    <h1>Das Spiel ist vorbei!</h1>
    <button @click="router.push('/')">Zurück</button>
  </header>
  <main>
    <div class="contaier">
      <p v-for="line of results" :key="line.profile.id">
        <AvatarComponent :profile="line.profile"></AvatarComponent>
        <strong>{{ line.points }}</strong>
        <img src="/cards.svg" class="small-element"/>
      </p>
    </div>
  </main>
</div>
</template>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
}

p {
  display: flex;
  align-items: center;
  strong {
    font-size: 4rem;
    padding: 1rem;
  }
}
</style>
