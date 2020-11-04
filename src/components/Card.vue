<template>
  <div class="card" :data-type="dataType">
    <div class="type">{{type}}</div>
    <div class="image">{{image}}</div>
    <div class="description">{{description}}</div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    type: String,
    image: String,
    description: String,
  },

  computed: {
    dataType() {
      return this.type.replace(/\s+/g, '-').toLowerCase();
    },
  },
};
</script>

<style scoped>
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: var(--card-size);
    height: calc(var(--card-size) * 1.3);
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

  /* Data types */
  [data-type="one"] {
    color: whitesmoke;
    background-color: darkslategray;
  }

  [data-type="two"] {
    color: black;
    background-color: gold;
  }

  [data-type="three"] {
    color: whitesmoke;
    background-color: crimson;
  }
</style>
