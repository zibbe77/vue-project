<script setup>
  import { ref, watch } from 'vue';
  import { useRoute , useRouter} from 'vue-router';
  import PokeCard from '../components/PokeCard.vue'

  const router = useRouter();
  const route = useRoute();
  const pokeData = ref([]);
  const pokeId = ref([]);

  let fetchOffset = ref((parseInt(route.params.page) - 1) * 30);
  let pageNum = parseInt(route.params.page);
  let pageLimit = 30;
  
  async function getPokInfo() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=" + fetchOffset.value + "&limit=" + pageLimit);
    pokeData.value = [];
    pokeId.value = [];
      
    if(response.ok){
        response = await response.json();

        response.results.forEach( element => { 
            pokeId.value.push(parseInt(element.url.substr(34, 5).replace("/","")));
            pokeData.value.push(element.name.replace("-", " ").replace("-", " "));
        });}
    }
    
  function nextPage(){
    pageNum++;
    fetchOffset.value += 30;
    router.push("/pokemongallary/" + pageNum);
    getPokInfo();
  }
  function previousPage(){
    pageNum--;
    fetchOffset.value -= 30;
    router.push("/pokemongallary/" + pageNum);
    getPokInfo();
  }
  
  if(isNaN(fetchOffset.value)){
    router.push("/notvaild")
  }
  
  getPokInfo();
</script>

<template>
    <div class="content"> 
        <button v-if="fetchOffset != 0" @click="previousPage">Previous page</button>
        <button @click="nextPage">Next page</button>

        <div class="pokeCards">
            <PokeCard v-for="(pokeName, index) in pokeData" 
                :name="pokeName"
                :id="pokeId[index]"/>
        </div>
    </div>
</template>

<style>

.pokeCards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>