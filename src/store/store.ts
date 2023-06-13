import { createStore  } from 'vuex';
import axios from 'axios';
import { YOUR_GITHUB_TOKEN } from '../assets/helpers'

export interface Repository {
  id: string;
  name: string;
}

export interface Issue {
  id: string;
  title: string;
  state: string;
  body: string;
}

interface RootState {
  repositories: Repository[];
  selectedRepository: Repository | null;
  issues: Issue[];
}

export default createStore<RootState>({
  state: {
    repositories: [],
    selectedRepository: null,
    issues: [],
  },
  mutations: {
    SET_REPOSITORIES(state: RootState, repositories: Repository[]) {
      state.repositories = repositories;
    },
    SET_SELECTED_REPOSITORY(state: RootState, repository: Repository) {
      state.selectedRepository = repository;
    },
    SET_ISSUES(state: RootState, issues: Issue[]) {
      state.issues = issues;
    },
  },
  actions: {
    async fetchRepositories({ commit }) {
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

      try {
        const response = await axios.post('https://api.github.com/graphql', { query }, {
          headers: {
            Authorization: `Bearer ${YOUR_GITHUB_TOKEN}`
          },
        });

        const repositories = response.data.data.user.repositories.nodes;
        commit('SET_REPOSITORIES', repositories);
        return repositories;
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    },
    async fetchIssues({ commit }, query: string) {
      try {
        const response = await axios.post('https://api.github.com/graphql', { query }, {
          headers: {
            Authorization: `Bearer ${YOUR_GITHUB_TOKEN}`
          },
        });

        const issues = response.data.data.repository.issues.nodes;
        commit('SET_ISSUES', issues);
        return issues;
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    },
  },
});
