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
    <form>
      <div class="flex flex-col items-center justify-center h-12 px-4 mt-2 text-sm text-center">
        <div class="flex text-center">
            <label>User name:</label><br>
            <input v-model="username" placeholder="enter username">
          </div>
        <div class="flex text-center">
            <label>Password:</label><br>
            <input v-model="password" placeholder="enter password">
        </div>
        <button @click="request"> Sign in </button>
        <p> {{ responseText }}</p>
      </div>
    </form>
</template>
