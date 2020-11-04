import { createApp } from 'vue';
import App from './App.vue';
import './css/variables.css';
import './css/base.css';
import './css/components.css';
import './css/utilities.css';

const app = createApp(App);

app.config.globalProperties.$notification = {
  loading: 'Setting up game.',
  start: 'Begin your quest.',
  encounter: 'New encounter!',
  loot: 'Loot acquired!',
  empty: 'Last encounter!',
  done: 'The quest is over.',
  error: 'There was an issue assembling the decks.',
};

app.mount('#app');
