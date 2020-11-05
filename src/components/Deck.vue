<template>
  <div :id="id" class="deck-container u-flow">
    <div class="deck u-flex-center">
      <div class="deck-name">{{ id }}</div>
      <transition-group name="card">
        <Card
          v-for="({ type, image, description }, index) in activeCards"
          :key="index"
          :type="type"
          :image="image"
          :description="description"
          class="card"
        />
      </transition-group>
    </div>
    <button class="button" @click="drawCard" :disabled="activeCards.length == cards.length">
      {{ activeCards.length == cards.length ? "Empty" : "Draw" }}
    </button>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "Deck",
  components: { Card },
  props: {
    id: String,
    cards: Array
  },

  computed: {
    activeCards() {
      return this.cards.filter(card => card.active);
    }
  },

  methods: {
    drawCard() {
      this.$emit("draw", this.id);
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
  width: var(--card-size);
  height: calc(var(--card-size) * 1.3);
  border: 2px dashed var(--color-grayscale);
  transform: translateZ(0);
  transform-style: preserve-3d;
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

.button {
  z-index: 1;
}
</style>
