![Screenshot_4](https://github.com/GeorgiyBeloklokov/vue-octocat/assets/77876368/dee89a71-b849-4ae0-ba8b-1b947694a910)
# Task description: 

Разработать компоненты (vue+vuex)  для работы с репозиториями Github-graphQL API (v4). 

Реализовать: 
Отображение списка  репозиториев для логина octocat в виде дропбокса с возможностью фильтрации по имени.
 (имя репозитория с логином)

При выборе из списка репозиториев отображаются карточки с issues (название, статус, описание)
По клику на issue отображается список комментариев (время создания, текст)
Визуальное представление свободное.

Дополнительная информация: 

https://developer.github.com/v4/guides/forming-calls/#example-query

https://developer.github.com/v4/explorer/

----

# vue-octocat

## This is a test task for the position of a vue developer. 
### Was used  `TypeScript`, `Vue3`, `Composition Api`, `Vuex`, `GraphQL`, `GitHub Api` and `'octocat'` login 
---
## Project Setup
### GitHub token is required for working this App, [how to make one](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

### Place your token in src/assets/helpers.ts
---

### After clone this repo install node_modules
```sh
npm install
```

### Compile and Hot-Reload for Development and testing

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
