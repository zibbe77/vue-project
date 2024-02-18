<script setup>
  import { ref } from 'vue';
  import { useRoute , useRouter} from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const pokemonPage = "/pokemon/";
  
  const moveData = ref(0);
  const contestEffect = ref(0);
  const superContestEffect = ref(0);
  const moveTarget = ref(0);
    
  const isFav = ref(false);
  const logIn = ref(false);

//functions
//-----------------------------------------

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

async function addFav(){
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Vueproject",
      'Content-Type': 'application/json' 
    }

    let response = await fetch("http://localhost:8080/addfavmove", { 
      method: "post",
      mode: "cors",
      headers: headersList,
      credentials: "include",
      body: JSON.stringify({
          move: moveData.value.name,
          moveId: moveData.value.id
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

    let response = await fetch("http://localhost:8080/removefavmove", { 
      method: "post",
      mode: "cors",
      headers: headersList,
      credentials: "include",
      body: JSON.stringify({
          moveId: moveData.value.id,
      })
    });
    isFav.value = false;
  }

//code
//-----------------------------------------
  if(isNaN(route.params.id)){
    router.push("/notvaild");
  }
  let response;

  try {
    response = await fetch("https://pokeapi.co/api/v2/move/" + route.params.id);
    moveData.value = await response.json();

    if(moveData.value.contest_effect != null){
        response = await fetch ( moveData.value.contest_effect.url);
        contestEffect.value = await response.json();
    }

    if(moveData.value.super_contest_effect != null){
        response = await fetch ( moveData.value.super_contest_effect.url);
        superContestEffect.value = await response.json();
    }

    response = await fetch ( moveData.value.target.url);
    moveTarget.value = await response.json();


    //find if its a fav 
    var myCookie = getCookie("auth");

    if (myCookie == null) {
    logIn.value = false;
    }
    else {
      logIn.value = true;
        let headersList = {
         "Accept": "*/*",
        "User-Agent": "Vueproject",
      }
    
      response = await fetch( "http://localhost:8080/isfavmove/" + route.params.id, {
        method: "get",
        mode: "cors",
        headers: headersList,
        credentials: "include",
      });
    }

  } catch (error) {}
</script>

<template>
    <div class="m-3">
        <p>Name >>> {{ moveData.name }}</p>
        <p>Power >>> {{ moveData.power }}</p>
        <p>PP >>> {{ moveData.pp }}</p>
        <p>Priority >>> {{ moveData.priority }}</p>
        <p>Accuracy >>> {{ moveData.accuracy }}</p>
        <p v-if="moveData.effect_chance === null">Effect chance >>> Non</p>
        <p v-else>Effect chance >>> {{ moveData.effect_chance }}</p>
        <p>Damage class >>> {{ moveData.damage_class.name }}</p>
        <p>target >>> {{ moveData.target.name }}</p>
        <p>target descripion >>> {{ moveTarget.descriptions[1].description }}</p>
        <p>---------------------</p>

        <h3>Effect entries</h3>
        <li v-for="(element) in moveData.effect_entries">
        <span> {{ element.effect }}</span>
        </li>

        <p>---------------------</p>
        <p v-if="moveData.contest_effect != null">Contest type {{ moveData.contest_type.name }}</p>
        
        <div v-if="moveData.contest_combos != null">
            <h3>Normal contest combos</h3>
            <h4>Before</h4>
            <li v-if="moveData.contest_combos.normal.use_before === null">
            <span> Non </span>
            </li>
            <li v-for="(element) in moveData.contest_combos.normal.use_before">
                <span> {{ element.name }}</span>
            </li>
    
            <h4>After</h4>
            <li v-if="moveData.contest_combos.normal.use_after === null">
            <span> Non </span>
            </li>
            <li v-for="(element) in moveData.contest_combos.normal.use_after">
                <span> {{ element.name }}</span>
            </li>
    
            <h3>Super contest combos</h3>
            <h4>Before</h4>
            <li v-if="moveData.contest_combos.super.use_before === null">
            <span> Non </span>
            </li>
            <li v-for="(element) in moveData.contest_combos.super.use_before">
                <span> {{ element.name }}</span>
            </li>
    
            <h4>After</h4>
            <li v-if="moveData.contest_combos.super.use_after === null">
            <span> Non </span>
            </li>
            <li v-for="(element) in moveData.contest_combos.super.use_after">
                <span> {{ element.name }}</span>
            </li>
        </div>


        <h3>Conest effects </h3>
        <li v-for="(element) in contestEffect.effect_entries">
            <span> {{ element.effect }}  </span>
        </li>
        <h4> flaver text</h4>
        <li v-for="(element) in contestEffect.flavor_text_entries">
            <span> {{ element.flavor_text }}  </span>
        </li>
        <p v-if="moveData.contest_effect != null">appeal {{ contestEffect.appeal }} </p>

        <h3>Super conest effects</h3>
        <li v-for="(element) in superContestEffect.flavor_text_entries">
            <span> {{ element.flavor_text }}  </span>
        </li>
        <p v-if="moveData.super_contest_effect != null" >appeal {{ superContestEffect.appeal }} </p>
        
        <div v-if="logIn === true">
        <button v-if="isFav === false" class="flex items-center justify-center h-4 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-md xl:h-6 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" @click="addFav">Add to favourites</button>
        <button v-if="isFav === true" class="flex items-center justify-center h-4 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-md xl:h-6 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" @click="removeFav">Remove from favourites</button>
        </div>

        <div>
            <li v-for="(element) in moveData.learned_by_pokemon">
                <RouterLink :to="pokemonPage + element.url.substr(34, 5).replace('/','')" >{{ element.name }}</RouterLink>
            </li>
        </div>

    </div>

</template>

<style>
</style>