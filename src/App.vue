<template>
  <header class="header">
    <button
      class="button button--secondary"
      title="Start a new game"
      :disabled="showSettings"
      @click="setupNewQuest"
    >
      <span>New Quest</span>
      <svg class="icon" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"
        />
      </svg>
    </button>
  </header>
  <main class="main">
    <transition name="fade" mode="out-in">
      <div v-if="showSettings" class="settings u-flow">
        <Players />
        <button class="button start" @click="startNewQuest">
          Start
        </button>
      </div>
      <div v-else class="decks u-scroll-x">
        <Deck id="encounter" :cards="encounter" @draw="drawCard" />
        <Deck id="loot" :cards="loot" @draw="drawCard" />
      </div>
    </transition>
  </main>
  <footer class="footer">{{ appMessage }}</footer>
</template>

<script>
import { inject, provide, onMounted, reactive, ref, toRefs } from "vue";
import Deck from "./components/Deck.vue";
import Players from "./components/Players.vue";

export default {
  name: "App",
  components: { Deck, Players },
  setup() {
    const message = inject("message");
    const appMessage = ref(message.settings);
    const players = ref(["Party Member 1"]);
    const viewDeck = reactive({ show: false, id: null });

    provide("appMessage", appMessage);
    provide("players", players);
    provide("viewDeck", viewDeck);

    const state = reactive({
      encounter: [],
      loot: [],
      showSettings: true
    });

    const fetchCardData = async () => {
      try {
        const response = await fetch("https://assets.codepen.io/225363/cardsTestData.json");
        const data = await response.json();
        const cards = await data.map(card => {
          return { ...card, active: false };
        });

        state.encounter = cards.filter(({ type }) => type === "Encounter");
        state.loot = cards.filter(({ type }) => type !== "Encounter");
      } catch (error) {
        appMessage.value = message.error;
      }
    };

    const drawCard = type => {
      state[type].find(card => {
        if (!card.active) {
          return (card.active = true);
        }
      });
      appMessage.value = message[type];
    };

    const shuffleDeck = deck => {
      deck.forEach(card => (card.active = false));
      deck.sort(() => Math.random() - 0.5);
    };

    const setupNewQuest = () => {
      viewDeck.show = false;
      state.showSettings = true;
      appMessage.value = message.settings;
    };

    const startNewQuest = () => {
      shuffleDeck(state.encounter);
      shuffleDeck(state.loot);
      state.showSettings = false;
      appMessage.value = message.start;
    };

    onMounted(() => fetchCardData());

    return {
      drawCard,
      appMessage,
      players,
      setupNewQuest,
      shuffleDeck,
      startNewQuest,
      viewDeck,
      ...toRefs(state)
    };
  }
};
</script>

<style>
#app {
  --padding: var(--space-md);

  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100%;
  overflow: hidden;
}

.header,
.main,
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.header,
.footer {
  width: 100%;
  padding: var(--space);
  background-color: var(--color-secondary);
}

.header {
  flex-wrap: wrap;
  gap: var(--space);
}

.main {
  overflow: hidden;
  backface-visibility: hidden;
}

.settings {
  align-self: flex-start;
  margin: var(--space-lg) 0;
  padding: var(--padding);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.button.start {
  margin-left: auto;
  margin-right: auto;
}

.decks {
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  padding-top: var(--padding);
  padding-bottom: var(--padding);
}

.decks > :first-child {
  margin-left: auto;
}

.decks > :last-child {
  margin-left: var(--space);
  margin-right: auto;
}

.decks::before,
.decks::after {
  content: "";
  display: block;
  flex: 0 0 var(--padding);
}

.fade-enter-active,
.fade-leave-active {
  transition: var(--duration-md) var(--ease-out);
  transition-property: opacity, transform;
}

.fade-enter-active {
  transition-duration: var(--duration);
  transition-timing-function: var(--ease-in);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-to {
  transform: translateY(-20px);
}
</style>
