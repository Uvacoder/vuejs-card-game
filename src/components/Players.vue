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
  props: {
    players: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update-players"],

  setup(props, { emit }) {
    const defaultPlayerName = inject("defaultPlayerName");

    const state = reactive({
      list: computed(() => props.players)
    });

    const blurInput = (event, index) => {
      if (event.target.value.length > 0) {
        return;
      }
      state.list[index] = `${defaultPlayerName} ${index + 1}`;
    };

    const focusInput = event => event.target.select();

    const updatePlayers = count => {
      emit("update-players", {
        count,
        list: state.list
      });
    };

    return {
      blurInput,
      focusInput,
      updatePlayers,
      ...toRefs(state)
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
