<script setup>
import { RouterLink, RouterView } from 'vue-router'
import userhedercard from './components/userhedercard.vue';


</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <header class="flex flex-row mb-5 pb-2 justify-between border border-gray-200" >
      <RouterLink class="flex items-center justify-start h-12 mx-2 px-4 mt-2 Times-New-Roman text-2xl text-center text-lime-500 underline decoration-double tracking-wide	transition-colors duration-200 transform xl:h-10 hover:text-lime-600 focus:outline-none" to="/pokemongallary/1"> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
       Gallary
      </RouterLink>
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