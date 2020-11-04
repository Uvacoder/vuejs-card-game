<template>
  <header class="header">
    {{ notification }}
  </header>
  <main class="main">
    <div class="decks u-scroll-x">
      <Deck id="encounter" @draw="drawCard" :cards="encounter" />
      <Deck id="loot" @draw="drawCard" :cards="loot" />
    </div>
  </main>
  <footer class="footer">
    <button class="button secondary" @click="startNewQuest">
      Start New Quest
    </button>
  </footer>
</template>

<script>
import Deck from './components/Deck.vue';

export default {
  name: 'App',
  components: { Deck },

  data() {
    return {
      encounter: [],
      loot: [],
      notification: this.$notification.loading,
    };
  },

  mounted() {
    this.fetchCardData();
  },

  methods: {
    async fetchCardData() {
      try {
        const response = await fetch('https://assets.codepen.io/225363/cardsTestData.json');
        const data = await response.json();
        const cards = await data.map((card) => Object.assign(card, { active: false }));

        this.encounter = cards.filter(({ type }) => type === 'Encounter');
        this.loot = cards.filter(({ type }) => type !== 'Encounter');
        this.startNewQuest();
      } catch (error) {
        this.notification = this.$notification.error;
      }
    },

    drawCard(type) {
      this.notification = this.$notification[type];
      return this[type].find((card) => {
        if (card.active) {
          return;
        }
        return card.active = true;
      });
    },

    deactivateDeck(deck) {
      deck.forEach((card) => card.active = false);
    },

    shuffleDeck(deck) {
      this.deactivateDeck(deck);
      deck.sort(() => Math.random() - 0.5);
    },

    startNewQuest() {
      this.shuffleDeck(this.encounter);
      this.shuffleDeck(this.loot);
      this.notification = this.$notification.start;
    },
  },
};
</script>

<style>
  #app {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
  }

  .header,
  .main,
  .footer  {
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

  .main {
    overflow: hidden;
  }

  .decks {
    --padding: var(--space-md);
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
</style>
