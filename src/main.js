import { createApp } from "vue";
import App from "./App.vue";
import "./css/variables.css";
import "./css/base.css";
import "./css/components.css";
import "./css/utilities.css";

const app = createApp(App);

app.provide("message", {
  loading: "Fetching cards...",
  settings: "Add party members",
  start: "Begin your quest",
  continue: "Continue your quest",
  encounter: "New encounter!",
  loot: "Loot acquired!",
  empty: "Last encounter!",
  done: "The quest is over",
  error: "There was an issue assembling the decks :("
});

app.mount("#app");
