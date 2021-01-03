<template>
  <div :id="id" class="deck-container u-flow">
    <div :class="{ 'active-deck': isActiveView }" class="deck u-flex-center">
      <div class="deck-name">
        {{ id }}
      </div>
      <div :class="{ 'u-scroll-x': isActiveView }" class="view">
        <transition-group name="card">
          <Card
            v-for="({ type, image, description }, index) in activeCards"
            :key="index"
            :type="type"
            :image="image"
            :description="description"
            :players="players"
            :disabled="!isActiveView && index !== activeCards.length - 1"
            :style="`--i: ${index}`"
            class="card"
          />
        </transition-group>
      </div>
    </div>
    <div class="controls">
      <button class="button" :disabled="disableDrawButton" @click="$emit('draw', id)">
        {{ drawButtonText }}
      </button>
      <button class="button icon" :disabled="disableViewDeckButton" @click="toggleViewDeck">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            v-if="viewDeck.show"
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
import { computed, inject, reactive, toRefs } from "vue";
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
      type: Array,
      default: null
    },
    disableControls: Boolean
  },
  emits: ["draw"],

  setup(props, { emit }) {
    const viewDeck = inject("viewDeck");

    const state = reactive({
      isActiveView: computed(() => {
        return viewDeck.show && viewDeck.id === props.id;
      }),

      activeCards: computed(() => {
        return props.cards.filter(card => card.active);
      }),

      disableViewDeckButton: computed(() => {
        return state.activeCards.length <= 1 || (viewDeck.show && viewDeck.id !== props.id);
      }),

      disableDrawButton: computed(() => {
        return state.activeCards.length == props.cards.length || viewDeck.show;
      }),

      drawButtonText: computed(() => {
        return state.activeCards.length == props.cards.length ? "Empty" : "Draw";
      })
    });

    const toggleViewDeck = () => {
      viewDeck.id = props.id;
      viewDeck.show = !viewDeck.show;
    };

    return {
      viewDeck,
      toggleViewDeck,
      ...toRefs(state)
    };
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

.view::after {
  content: "";
  display: block;
  flex: 0 0 var(--space);
}

.deck-container:focus-within {
  z-index: 100;
}

.deck-name {
  color: var(--color-grayscale);
  text-transform: capitalize;
}

.card {
  order: calc(var(--i) * -1);
  position: absolute;
  top: -2px;
  left: -2px;
  transition: transform var(--duration-md) var(--ease-out);
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

.active-deck {
  position: unset;
}

.active-deck .view {
  position: absolute;
  top: calc(var(--space) * -1);
  left: 0;
  display: flex;
  padding: var(--space-md) var(--space);
  margin: 0;
  min-width: 100%;
  z-index: 100;
}

.active-deck .card {
  flex: 0 0 auto;
  position: relative;
  top: unset;
  left: unset;
  margin: 0 var(--space-xs);
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 0;
}
</style>
