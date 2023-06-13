<template>
  <div class="github-repositories">
    <h1 class="title">GitHub Repositories</h1>
    <div class="filter">
      <label for="login" class="filter-label">Filter by Name of Repo:</label>
      <input type="text" id="login" v-model="filter" @input="applyFilter" class="filter-input" />
    </div>
    <ul v-if="filteredRepositories.length" class="repository-list">
      <li v-for="repository in filteredRepositories" :key="repository.id" class="repository-item" @click="selectRepository(repository)">
        {{ repository.name }}
      </li>
    </ul>
    <div v-else class="no-repositories">
      No repositories found.
    </div>
    <div v-if="selectedRepository" class="issue-list">
      <h2 class="subtitle">Issues for {{ selectedRepository.name }}</h2>
      <ul>
        <li v-for="issue in issues" :key="issue.id" class="issue-item">
          <h3>Title: {{ issue.title }}</h3>
          <p>Status: {{ issue.state }}</p>
          <p>Description: {{ issue.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import type { Issue, Repository } from '@/store/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GitHubRepositories',
  computed: {
    repositories(): Repository[] {
      return this.$store.state.repositories;
    },
    filteredRepositories(): Repository[] {
      const filter = this.filter.trim().toLowerCase();
      if (filter) {
        return this.repositories.filter((repo) =>
          repo.name.toLowerCase().includes(filter)
        );
      }
      return this.repositories;
    },
    selectedRepository(): Repository | null {
      return this.$store.state.selectedRepository;
    },
    issues(): Issue[] {
      return this.$store.state.issues;
    },
  },
  data() {
    return {
      filter: '',
    };
  },
  created() {
    this.fetchRepositories();
  },
  methods: {
    async fetchRepositories() {
      const query = `
        query {
          user(login: "octocat") {
    repositories(first: 100, ownerAffiliations: [OWNER]) {
      nodes {
        id
        name
        url
      }
    }
  }
        }
      `

      const response = await this.$store.dispatch('fetchRepositories', query);
      console.log(response);
    },
    async fetchIssues(repositoryName: string) {
      const query = `
        query {
          repository(owner: "octocat", name: "${repositoryName}") {
            issues(first: 5) {
              nodes {
                id
                title
                state
                body
              }
            }
          }
        }
      `;

      const response = await this.$store.dispatch('fetchIssues', query);
      console.log(response);
    },
    selectRepository(repository: Repository) {
      this.$store.commit('SET_SELECTED_REPOSITORY', repository);
      this.fetchIssues(repository.name);
    },
    applyFilter() {
      this.$forceUpdate();
    },
  },
});
</script>

<style scoped>

ul {
       list-style-type: none;
       display: contents;
   }

ul > li {

        padding: 0;
        margin: 0; 
        text-align: center;
   }
.github-repositories {
  text-align: center;
  padding: 20% 10%;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.filter {
  margin-bottom: 10px;
}

.filter-label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.filter-input {
  padding: 5px;
  border: 1px solid #999;
  border-radius: 3px;
}

.repository-list {
  padding-left: 0;
  margin-top: 20px;
}

.repository-item {
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  /* margin-bottom: 5px; */
  color: #555;
  cursor: pointer;
}

.no-repositories {
  color: #888;
  font-style: italic;
}

.issue-list {
  margin-top: 20px;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.issue-item {
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style-type: none;
}

.issue-item h3 {
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
}

.issue-item p {
  margin: 10px;
  color: #555;
}
</style>
