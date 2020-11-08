<template>
  <div class="player-settings u-flow">
    <Stepper
      id="players"
      label="How many are in the party?"
      :value="players.length"
      @update="updatePlayers"
    />
    <input
      v-for="(player, index) in list"
      :key="index"
      v-model="list[index]"
      class="player-input"
      type="text"
    />
  </div>
</template>

<script>
import Stepper from "../components/Stepper.vue";

export default {
  name: "Players",
  components: { Stepper },
  props: {
    players: {
      type: Array,
      default: null
    }
  },
  emits: ["update-players"],

  computed: {
    list() {
      return this.players;
    }
  },

  methods: {
    updatePlayers(count) {
      this.$emit("update-players", { count, list: this.list });
    }
  }
};
</script>

<style>
.player-settings {
  width: 100%;
}

.player-input {
  width: 100%;
  padding: var(--space-sm);
  font-size: inherit;
  font-family: inherit;
}
</style>
