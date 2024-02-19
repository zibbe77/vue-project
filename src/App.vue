<script setup>
import { RouterLink, RouterView } from 'vue-router'
import userhedercard from './components/userhedercard.vue';


</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <header class="flex flex-row mb-5 pb-2 justify-between border border-gray-200" >
      <RouterLink class="flex items-center justify-start h-12 mx-2 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-lg xl:h-10 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" to="/pokemongallary/1">Gallary</RouterLink>
      <userhedercard></userhedercard>
    </header>
    
      <Suspense>
        <RouterView />
      </Suspense>
  
    <footer class="bg-white dark:bg-gray-900 ">
      <div class="container px-6 py-8 mx-auto">
          <hr class="my-10 border-gray-200 dark:border-gray-700" />
          <div class="flex flex-col items-center sm:flex-row sm:justify-between" >
              <p class="text-sm text-gray-500">© Copyright 2024. All Rights Reserved.</p>
              <div class="flex mt-3 -mx-2 sm:mt-0">
                  <a href="#" class="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Teams </a>
  
                  <a href="#" class="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Privacy </a>
  
                  <a href="#" class="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Cookies </a>
              </div>
          </div>
      </div>
  </footer>
  </div>
</template>