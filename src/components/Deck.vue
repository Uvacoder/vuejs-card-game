<template>
  <div :id="id" class="deck-container u-flow">
    <div class="deck u-flex-center">
      <div class="deck-name">{{id}}</div>
      <Card
        v-for="({ type, image, description }, index) in activeCards"
        :key="index"
        :type="type"
        :image="image"
        :description="description"
        class="card"
      />
    </div>
    <button
      class="button"
      @click="drawCard"
      :disabled="activeCards.length == cards.length"
    >
      {{activeCards.length == cards.length ? 'Empty' : 'Draw'}}
    </button>
  </div>
</template>

<script>
  import Card from './Card';

  export default {
    name: 'Deck',
    components: { Card },
    props: {
      id: String,
      cards: Array,
    },

    methods: {
      drawCard() {
        this.$emit('draw', this.id);
      }
    },

    computed: {
      activeCards() {
        return this.cards.filter(card => card.active);
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
</style>
