<script setup>
import { ref, watch } from 'vue';
import { useRoute , useRouter} from 'vue-router';

  let responseValue = ref("");
  const router = useRouter();

    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Vueproject"
    }

    let response = await fetch("http://localhost:8080/mypage", { 
      method: "GET",
      mode: "cors",
      headers: headersList,
      credentials: "include"
    });
    responseValue.value = await response.json();
    
    function logOut(){
      document.cookie = 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
     
      router.push('/pokemongalary/1');
    }
</script>

<template>

    <div>
      <h2>My favourit Pokemons</h2>
      <li v-for="(element, index) in responseValue.favPokemon">
       <RouterLink :to="'pokemon/' + responseValue.favPokemonId[index]"> {{ element }} </RouterLink>
      </li>
    </div>
    <div>
      <h2>My favourit moves</h2>
      <li v-for="(element, index) in responseValue.favMove">
       <RouterLink :to="'move/' + responseValue.favMoveId[index]"> {{ element }} </RouterLink>
      </li>
    </div>
    <button @click="logOut">log out</button>
</template>

<style>

</style>