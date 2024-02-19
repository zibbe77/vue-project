<script setup>
import { ref, watch } from 'vue';
import { stringifyQuery } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'

const props = defineProps({name:{type:String, default:"?"}, id:{type:Number, default:0}} );
const linkPoke = "/src/assets/pokemon/";
const pokemonPage = "/pokemon/";
let imgLink = ref(linkPoke + props.id + '.png');

</script>

<template>
    <div class="border rounded-md duration-200 hover:bg-lime-100  m-2 p-2">
        <RouterLink class="text-gray-600 text-center" :to="pokemonPage + props.id" >{{ props.name }}</RouterLink>
        <RouterLink :to="pokemonPage + props.id" > <img :src="imgLink" :onerror="() => {
              imgLink = linkPoke + 'substitute.png';} ">
        </RouterLink>
    </div>
</template>