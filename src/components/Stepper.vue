<template>
  <div :id="id" class="stepper">
    <div :id="labelId" class="label">
      {{ label }}
    </div>

    <div class="control">
      <button
        class="button decrease"
        aria-label="Decrease amount"
        :aria-describedby="labelId"
        @click="decrease"
      >
        −
      </button>
      <div class="count">
        {{ count }}
      </div>
      <button
        class="button increase"
        aria-label="Increase amount"
        :aria-describedby="labelId"
        @click="increase"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stepper",
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 50
    }
  },

  data() {
    return {
      count: 1
    };
  },

  computed: {
    labelId() {
      return this.id + "-label";
    }
  },

  methods: {
    decrease() {
      return this.count > this.min && this.count--;
    },

    increase() {
      return this.count < this.max && this.count++;
    }
  }
};
</script>

<style scoped>
.control {
  display: flex;
}

.label {
  margin-bottom: var(--space-md);
}

.button {
  box-shadow: none;
}

.button.decrease {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.button.increase {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.count {
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: var(--border-size) dashed var(--border-color);
  border-bottom: var(--border-size) dashed var(--border-color);
}
</style>
