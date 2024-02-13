<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SignIn from './components/SignIn.vue'

</script>

<template>
  <header>
      <nav>
        <RouterLink to="/pokemongallary/1">pokemongallary</RouterLink>
        <RouterLink to="/creatuser">Creat user</RouterLink>
        <SignIn></SignIn>
      </nav>
  </header>
  <Suspense>
    <RouterView />
  </Suspense>
  <footer></footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  /* max-height: 30vh;
  display: flex;
  justify-content: space-between; */
  align-items: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  justify-content: space-around;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
