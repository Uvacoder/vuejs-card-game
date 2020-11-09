<template>
  <header class="header">
    <button
      class="button secondary"
      title="Start a new game"
      :disabled="showSettings"
      @click="setupNewQuest"
    >
      <span>New Quest</span>
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
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
        <Players :players="players" @update-players="updatePlayers" />
        <button class="button start" @click="startNewQuest">
          Start
        </button>
      </div>
      <div v-else class="decks u-scroll-x">
        <Deck
          id="encounter"
          :disableControls="showActiveView && showActiveViewId !== 'encounter'"
          :players="players"
          :cards="encounter"
          @draw="drawCard"
          @show-active-view="handleActiveView"
        />
        <Deck
          id="loot"
          :disableControls="showActiveView && showActiveViewId !== 'loot'"
          :players="players"
          :cards="loot"
          :active="showActiveView && showActiveViewId"
          @draw="drawCard"
          @show-active-view="handleActiveView"
        />
      </div>
    </transition>
  </main>
  <footer class="footer">
    {{ notification }}
  </footer>
</template>

<script>
import Deck from "./components/Deck.vue";
import Players from "./components/Players.vue";

export default {
  name: "App",
  components: { Deck, Players },

  data() {
    return {
      encounter: [],
      loot: [],
      notification: this.$notification.settings,
      players: [`${this.$defaultPlayerName} 1`],
      showSettings: true,
      showActiveView: false,
      showActiveViewId: ""
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
      } catch (error) {
        this.notification = this.$notification.error;
      }
    },

    deactivateDeck(deck) {
      deck.forEach(card => (card.active = false));
    },

    drawCard(type) {
      this[type].find(card => {
        if (!card.active) {
          return (card.active = true);
        }
      });
      this.notification = this.$notification[type];
    },

    shuffleDeck(deck) {
      deck.sort(() => Math.random() - 0.5);
      this.deactivateDeck(deck);
    },

    setupNewQuest() {
      this.showSettings = true;
      this.notification = this.$notification.settings;
    },

    handleActiveView(active, id) {
      this.showActiveViewId = id;
      this.showActiveView = active;
    },

    startNewQuest() {
      this.shuffleDeck(this.encounter);
      this.shuffleDeck(this.loot);
      this.showSettings = false;
      this.notification = this.$notification.start;
    },

    updatePlayers({ count, list }) {
      if (count === this.players.length) {
        return;
      }
      if (count < this.players.length) {
        return this.players.pop();
      }
      this.players = [...list, `${this.$defaultPlayerName} ${count}`];
    }
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
  padding: var(--padding);
}

.decks > :first-child {
  margin-left: auto;
}

.decks > :last-child {
  margin-left: var(--space);
  margin-right: auto;
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
