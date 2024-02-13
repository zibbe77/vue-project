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
    <div class="card">
        <RouterLink class="titel" :to="pokemonPage + props.id" >{{ props.name }}</RouterLink>
        <RouterLink :to="pokemonPage + props.id" > <img :src="imgLink" :onerror="() => {
              imgLink = linkPoke + 'substitute.png';} ">
        </RouterLink>
    </div>
</template>

<style>
    .card {
        margin: 0.5rem;
        padding: 1rem;
        background-color: darkgray;
        width: 11rem;
        height: 11rem;
        justify-content: center;
    }
    .img {
        margin: auto;
        display: block;
    }
    .titel {
        color: black;
        font-size: larger;
    }
</style>