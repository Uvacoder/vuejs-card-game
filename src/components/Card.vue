<template>
  <div class="card" :data-type="dataType">
    <div class="type">{{ type }}</div>
    <div class="image">{{ image }}</div>
    <div class="description">{{ description }}</div>

    <div v-if="lootCard" class="player-select">
      <select :disabled="disabled">
        <option value="" disabled selected>
          Select a party member...
        </option>
        <option v-for="(player, index) in players" :key="index" :value="player">
          {{ player }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    description: String,
    image: String,
    type: String,
    players: Array,
    disabled: Boolean
  },

  computed: {
    dataType() {
      return this.type.replace(/\s+/g, "-").toLowerCase();
    },

    lootCard() {
      return this.players.length > 1 && this.type !== "Encounter";
    }
  }
};
</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: var(--card-width);
  height: var(--card-height);
  border: 2px solid black;
  border-radius: 0.125rem;
  background-color: whitesmoke;
  overflow: hidden;
}

.type {
  font-size: 1.2rem;
  text-transform: uppercase;
  padding: calc(var(--space) / 2) var(--space);
  width: 100%;
  text-align: center;
}

.image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--color-primary);
  background-color: white;
  overflow: hidden;
}

.image::after {
  content: "";
  display: block;
  padding-bottom: calc(100% / (16 / 9));
}

.image img {
  position: absolute;
  object-fit: cover;
}

.description {
  flex: 1;
  padding: var(--space);
  font-size: 1rem;
  line-height: 1.15;
}

.player-select {
  position: relative;
  width: 100%;
  border-top: 2px solid var(--color-primary);
  background-color: var(--color-secondary);
}

.player-select select {
  --margin: 3px;
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 0 1em 0 0;
  margin: var(--margin);
  width: calc(100% - var(--margin) * 2);
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  text-align: center;
  padding: var(--space-xs) var(--space-sm);
  font-size: 16px;
  cursor: pointer;
}

.player-select::after {
  content: "";
  position: absolute;
  top: 50%;
  right: var(--space-sm);
  display: block;
  width: 12px;
  height: 8px;
  background-color: var(--color-primary);
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  transform: translateY(-50%);
  pointer-events: none;
}

/* Data types */
[data-type="rune"] {
  color: whitesmoke;
  background-color: darkslategray;
}

[data-type="hp-potion"] {
  color: whitesmoke;
  background-color: crimson;
}

[data-type="gold"] {
  background-color: gold;
}

[data-type="fools-gold"] {
  background-color: yellow;
}
</style>
