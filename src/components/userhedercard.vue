<script setup>
  import { ref } from 'vue';

  let usernameDisplay = ref("");
  const logIn = ref("false");

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

function getCookieName(name){
    var pattern = RegExp(name + "=.[^;]*")
    var matched = document.cookie.match(pattern)
    if(matched){
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}

//code
//-----------------------------------------

window.setInterval(()=>{
        let myCookie = getCookie("auth");
        
        if (myCookie == null) {
            logIn.value = false;
            }
            else {
            logIn.value = true;
               usernameDisplay.value = getCookieName("username");
            }

    }, 100); // run every 100 ms
</script>

<template>
    <div class="flex relative justify-center float-right" v-if="logIn === false">
        <RouterLink class="flex items-center justify-center mx-2 h-12 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-lg xl:h-10 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" to="/signin">Sign in</RouterLink>
        <RouterLink class="flex items-center justify-center mx-2 h-12 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-lg xl:h-10 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" to="/creatuser">Sign up</RouterLink>
    </div>
    <div v-else class="pr-2">
        <RouterLink to="/user"> {{ usernameDisplay }}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        </RouterLink>
    </div>

</template>