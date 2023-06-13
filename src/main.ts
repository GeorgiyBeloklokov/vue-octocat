import { createApp } from 'vue';
import store from './store/store';
import GitHubRepositories from './components/GitHubRepositories.vue';

const app = createApp(GitHubRepositories);
app.config.globalProperties.$store = store;
app.use(store);
app.mount('#app');
