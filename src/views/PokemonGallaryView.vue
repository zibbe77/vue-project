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
  <div class="grid grid-cols-3 gap-4 justify-center place-items-center text-sm text-center text-gray-600 place-content-center"> 
      <PokeCard v-for="(pokeName, index) in pokeData" 
      :name="pokeName"
      :id="pokeId[index]"/>
  </div>
  <div class="flex place-items-center items-center justify-center">
    <button class="flex items-center justify-center h-4 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-md xl:h-6 hover:bg-gray-100 focus:outline-none" v-if="fetchOffset != 0" @click="previousPage">Previous page</button>
    <button class="flex items-center justify-center h-4 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-md xl:h-6 hover:bg-gray-100 focus:outline-none" @click="nextPage">Next page</button>
  </div>
</template>