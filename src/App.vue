<template>
  <header class="header">
    {{ notification }}
  </header>
  <main class="main">
    <transition name="fade" mode="out-in">
      <div v-if="settings" class="settings u-flow">
        <Stepper id="players" label="How many are in the party?" />
        <button class="button" @click="toggleSettingsDisplay">
          Submit
        </button>
      </div>
      <div v-else class="decks u-scroll-x">
        <Deck id="encounter" @draw="drawCard" :cards="encounter" />
        <Deck id="loot" @draw="drawCard" :cards="loot" />
      </div>
    </transition>
  </main>
  <footer class="footer">
    <button class="button secondary" title="Start a new game" @click="startNewQuest">
      New Quest
    </button>
    <button class="button secondary" title="Open settings" @click="toggleSettingsDisplay">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
        />
      </svg>
    </button>
  </footer>
</template>

<script>
import Deck from "./components/Deck.vue";
import Stepper from "./components/Stepper.vue";

export default {
  name: "App",
  components: { Deck, Stepper },

  data() {
    return {
      encounter: [],
      loot: [],
      notification: this.$notification.loading,
      settings: true
    };
  },

  mounted() {
    this.fetchCardData();
  },

  methods: {
    async fetchCardData() {
      try {
        const response = await fetch("https://assets.codepen.io/225363/cardsTestData.json");
        const data = await response.json();
        const cards = await data.map(card => Object.assign(card, { active: false }));

        this.encounter = cards.filter(({ type }) => type === "Encounter");
        this.loot = cards.filter(({ type }) => type !== "Encounter");
        this.startNewQuest();
      } catch (error) {
        this.notification = this.$notification.error;
      }
    },

    drawCard(type) {
      this[type].find(card => {
        if (!card.active) {
          return (card.active = true);
        }
      });
      this.notification = this.$notification[type];
    },

    deactivateDeck(deck) {
      deck.forEach(card => (card.active = false));
    },

    shuffleDeck(deck) {
      deck.sort(() => Math.random() - 0.5);
      this.deactivateDeck(deck);
    },

    startNewQuest() {
      this.shuffleDeck(this.encounter);
      this.shuffleDeck(this.loot);
      this.notification = this.$notification.start;
    },

    toggleSettingsDisplay() {
      this.settings = !this.settings;
    }
  }
};
</script>

<style>
#app {
  --padding: var(--space-md);

  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
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

.footer {
  flex-wrap: wrap;
  gap: var(--space);
}

.main {
  overflow: hidden;
  backface-visibility: hidden;
}

.settings {
  padding: var(--padding);
  text-align: center;
}

.decks {
  position: relative;
  display: flex;
  margin: 0 auto;
  padding: var(--padding);
  scroll-snap-type: x mandatory;
}

.decks > * {
  scroll-snap-align: center;
}

.decks > * + * {
  margin-left: var(--space);
}

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
