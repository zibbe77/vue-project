<script setup>
  import { ref, watch } from 'vue';
  import { useRoute , useRouter} from 'vue-router';

  let username = ref("");
  let password = ref("");
 
  let responseText = ref("");
  const router = useRouter();

//functions
//-----------------------------------------

async function request (){

    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Vueproject"
    }

    headersList.authorization = "Basic " + window.btoa(username.value + ":" + password.value);

    let response = await fetch("http://localhost:8080/signin", { 
      method: "GET",
      mode: "cors",
      headers: headersList,
      credentials: "include"
    });
    
    if(response.status === 200){
        router.push('/pokemongallary/1');
    }
    responseText.value = await response.text();
  }
</script>

<template>
  <div class="grid place-content-center p-3 m-3 ">
    <form class="border border-gray-200 p-2 m-2 rounded-sm">
        <div class="flex text-center">
            <label class="pr-2">User name:</label><br>
            <input v-model="username" placeholder="enter username">
          </div>
        <div class="flex text-center pt-1">
            <label class="pr-3">Password: </label><br>
            <input v-model="password" placeholder="enter password">
        </div>
      </form>
      <button class="flex items-center justify-center mx-2 h-12 px-4 mt-2 text-lg text-gray-600 text-center transition-colors duration-200 transform border rounded-lg xl:h-10 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" @click="request"> Sign in </button>
      <p> {{ responseText }}</p>
  </div>
</template>
