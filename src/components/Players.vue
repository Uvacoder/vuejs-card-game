<template>
  <div class="player-settings u-flow">
    <Stepper
      id="players"
      label="How many are in the party?"
      :value="players.length"
      @update="updatePlayers"
    />
    <input
      v-for="(player, index) in players"
      :key="index"
      v-model="players[index]"
      class="player-input"
      type="text"
      spellcheck="false"
      @focus="focusInput"
      @blur="event => blurInput(event, index)"
    />
  </div>
</template>

<script>
import { computed, inject, reactive, toRefs } from "vue";
import Stepper from "../components/Stepper.vue";

export default {
  name: "Players",
  components: { Stepper },

  setup(props) {
    const players = inject("players");

    const blurInput = (event, index) => {
      if (event.target.value.length > 0) {
        return;
      }
      players.value[index] = `Party Member ${index + 1}`;
    };

    const focusInput = event => event.target.select();

    const updatePlayers = count => {
      if (count === players.value.length) {
        return;
      }
      if (count < players.value.length) {
        return players.value.pop();
      }
      players.value = [...players.value, `Party Member ${count}`];
    };

    return {
      blurInput,
      focusInput,
      players,
      updatePlayers
    };
  }
};
</script>

<style>
.player-settings {
  width: 100%;
}

.player-input {
  appearance: none;
  width: 100%;
  padding: var(--space-sm);
  font-size: inherit;
  font-family: inherit;
  border: var(--border-size) solid var(--border-color);
  box-shadow: inset rgba(0, 0, 0, 0.1) 3px 3px;
  border-radius: 0;
}

.player-input:focus {
  box-shadow: none;
}
</style>
