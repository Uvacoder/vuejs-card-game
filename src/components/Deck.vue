<template>
  <div :id="id" :class="{ 'active-view': showActiveView }" class="deck-container u-flow">
    <div :class="[showActiveView ? 'u-scroll-x' : 'u-flex-center']" class="deck">
      <div class="deck-name">
        {{ id }}
      </div>
      <transition-group name="card">
        <Card
          v-for="({ type, image, description }, index) in activeCards"
          :key="index"
          :type="type"
          :image="image"
          :description="description"
          :players="players"
          class="card"
        />
      </transition-group>
    </div>
    <div class="controls">
      <button
        v-if="!showActiveView"
        class="button"
        :disabled="disabledButton"
        @click="$emit('draw', id)"
      >
        {{ buttonText }}
      </button>
      <button class="button icon" :disabled="disabledActiveViewButton" @click="toggleActiveView">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            v-if="showActiveView"
            class="icon-close"
            fill="currentColor"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
          <path
            v-else
            class="icon-cards"
            fill="currentColor"
            d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "Deck",
  components: { Card },
  props: {
    id: {
      type: String,
      default: null
    },
    cards: {
      type: Array,
      default: null
    },
    players: {
      type: Number,
      default: 1
    }
  },
  emits: ["draw"],

  data() {
    return {
      showActiveView: false
    };
  },

  computed: {
    activeCards() {
      return this.cards.filter(card => card.active);
    },

    buttonText() {
      return this.disabledButton ? "Empty" : "Draw";
    },

    disabledButton() {
      return this.activeCards.length == this.cards.length;
    },

    disabledActiveViewButton() {
      return this.activeCards.length <= 1;
    }
  },

  methods: {
    toggleActiveView() {
      return (this.showActiveView = !this.showActiveView);
    }
  }
};
</script>

<style scoped>
.deck-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.deck {
  flex: 0 0 auto;
  position: relative;
  width: var(--card-width);
  height: var(--card-height);
  border: 2px dashed var(--color-grayscale);
}

.deck-name {
  color: var(--color-grayscale);
  text-transform: capitalize;
}

.card {
  position: absolute;
  top: -2px;
  left: -2px;
}

.card-enter-active {
  transition: opacity var(--duration-sm) var(--ease-out),
    transform var(--duration-md) var(--ease-out);
}

.card-enter-from {
  opacity: 0;
  transform: translateY(20%);
}

.controls {
  display: flex;
  gap: var(--space-sm);
  z-index: 1;
}

.active-view {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  margin: 0;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  background-color: var(--color-background);
  z-index: 100;
}

.active-view .deck {
  width: auto;
  min-width: 100%;
  height: auto;
  border-color: transparent;
  padding-left: var(--space);
}

.active-view .deck::after {
  content: "";
  display: block;
  flex: 0 0 var(--space);
}

.active-view .card {
  flex: 0 0 auto;
  position: relative;
  top: unset;
  left: unset;
  margin-right: var(--space);
}

.active-view .card:last-child {
  margin-right: 0;
}

.active-view .deck-name {
  display: none;
}
</style>
