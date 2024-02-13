<script setup>
  import { ref, watch } from 'vue';
  import { useRoute , useRouter} from 'vue-router';

  let username = ref("");
  let password = ref("");
  let usernameDisplay = ref("");
  let responseText = ref("");
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
    responseText.value = await response.text();

    if(response.status === 200){
        logIn.value = true;
    }
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
    <div v-if="logIn === false">
        <form>
          <div class="input">
            <label for="fname">User name:</label><br>
            <input v-model="username" placeholder="enter username">
          </div>
          <div class="input">
            <label for="lname">Password:</label><br>
            <input v-model="password" placeholder="enter password">
        </div>
    </form>
    <button @click="request">Sign in</button>
    <p>{{ responseText }}</p>
    </div>
    <div v-else>
        <RouterLink to="/user"> {{ usernameDisplay }}</RouterLink>
    </div>

</template>

<style>

</style>