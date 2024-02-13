<script setup>
  import { ref } from 'vue';
  import { useRoute , useRouter} from 'vue-router';
  
  const linkPoke = "/src/assets/pokemon/";
  const imgSrc = ref("/src/assets/pokemon/0.png");
  const linkMove = "/move/"
  const route = useRoute();
  const router = useRouter();
  const pokeData = ref(0);
  const isFav = ref(false);
  const logIn = ref(false);

  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

  async function getPokInfo() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + route.params.id);
  
    if(response.ok){
      let jsonResponse = await response.json();
      imgSrc.value = linkPoke + jsonResponse.id + ".png";
      pokeData.value = jsonResponse;
    } else {
      pokeData.value = false;
    }

    var myCookie = getCookie("auth");

    if (myCookie == null) {
    logIn.value = false;
    }
    else {
      logIn.value = true;
     //gets if it is fav pokemon 
        let headersList = {
         "Accept": "*/*",
        "User-Agent": "Vueproject",
      }
    
      response = await fetch( "http://localhost:8080/isfavpokemon/" + route.params.id, {
        method: "get",
        mode: "cors",
        headers: headersList,
        credentials: "include",
      });
    
      if(response.ok){
        let jsonResponse = await response.json();
        isFav.value = jsonResponse;
        console.log(isFav.value);
      } else {
        isFav.value = false;
      }
    }  
  }

  async function addFav(){
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Vueproject",
      'Content-Type': 'application/json' 
    }

    let response = await fetch("http://localhost:8080/addfavpokemon", { 
      method: "post",
      mode: "cors",
      headers: headersList,
      credentials: "include",
      body: JSON.stringify({
          pokemon: pokeData.value.name,
          pokemonId: pokeData.value.id
      })
    });
    isFav.value = true;
  }
  async function removeFav(){
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Vueproject",
      'Content-Type': 'application/json' 
    }

    let response = await fetch("http://localhost:8080/removefavpokemon", { 
      method: "post",
      mode: "cors",
      headers: headersList,
      credentials: "include",
      body: JSON.stringify({
          pokemonId: pokeData.value.id
      })
    });
    isFav.value = false;
  }
  
  if(isNaN(route.params.id)){
    router.push("/notvaild");
  }

  getPokInfo();

</script>

<template>
  <div>
    <p v-if="pokeData">{{ pokeData.name }}</p>
    <p v-else-if="pokeData === false">Not found</p>
    <p v-else>Loading...</p>

    <div v-if="pokeData" class="content">
      <img v-bind:src="imgSrc" />
      <p>Height {{ pokeData.height }} </p>
      <p>Weight {{ pokeData.weight }} </p>
      <p>Base experience  {{ pokeData.base_experience }} </p>
      <p>Id {{ pokeData.id }}</p>

      <p v-if="pokeData.types.length === 1">Type {{ pokeData.types[0].type.name }} </p>
      <p v-else-if="pokeData.types.length === 2">Types {{ pokeData.types[0].type.name }} {{ pokeData.types[1].type.name }} </p>
      <h3>Stats</h3>
      <li v-for="(element) in pokeData.stats">
        <span> {{ element.stat.name }} {{ element.base_stat }} >>> Effort {{ element.effort }}</span>
      </li>
      <h3>Abilities</h3>
      <li v-for="(element) in pokeData.abilities">
        <span> {{ element.ability.name }}</span>
      </li>
      <div v-if="logIn === true">
        <button v-if="isFav === false" @click="addFav">Add to favourites</button>
        <button v-if="isFav === true" @click="removeFav">Remove from favourites</button>
      </div>

      <h3>moves</h3> 
      <li v-for="(element) in pokeData.moves">
          <!-- <span> {{ element.move.name }} </span> element.url.substr(33, 5).replace('/','') -->
          <RouterLink :to="linkMove + element.move.url.substr(31, 5).replace('/','')" >{{ element.move.name }}</RouterLink>
       </li>
    </div>
  </div>



</template>

<style>
</style>