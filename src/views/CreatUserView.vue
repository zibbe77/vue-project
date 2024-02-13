<script setup>
  import { ref, watch } from 'vue';
  import { useRoute , useRouter} from 'vue-router';
  
let headersList = {
 "Accept": "*/*",
 "User-Agent": "Vueproject",
 "authorization": "Basic bGVvc2VuZXJkOjExMTExMTEx"
}
const allowedCharsArray = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "å", "a", "s", "d", "f", "g", "h", "j", "k", "l","ö","ä","z","x","c","v","b","n","m","Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Å", "A", "S", "D", "F", "G","H", "J", "k", "L", "Ö", "Ä", "Z", "X","C","V", "B", "N", "M", "1", "2", "3", "4", "5", "6", "7", "8", "9", "_"]; 


let username = ref("");
let password = ref("");
let passwordWarningText = ref("");
let passwordWarningbool = ref(false);
let usernameWarningText = ref("");
let usernameWarningbool = ref(false);

let didUserGetCreated = ref("");
const router = useRouter();

//funktions 
//------------------------------
async function CreatUser(){

  if(password.value === ""){
    passwordWarningText.value = "Password is empty"
    passwordWarningbool.value = true;
  }
  if(username.value === ""){
    usernameWarningText.value = "Username is empty"
    usernameWarningbool.value = true;
  }

  if(passwordWarningbool.value === false && usernameWarningbool.value === false ){
    headersList.authorization = "Basic " + window.btoa(username.value + ":" + password.value);

    let response = await fetch("http://localhost:8080/user/create", { 
      method: "GET",
      mode: "cors",
      headers: headersList,
      credentials: "include"
    });
    console.log("----------------------");
    console.log(response.status);
    didUserGetCreated.value = await response.text();
    
    if(response.status === 201){
        router.push('/pokemongallary/1');
    }
  }
}
//checks all allowed chars
function FindSpecialChars(string){
  let specialCharBool = false;
  for(let i = 0; i < string.length; i++){
    let foundChar = false;
    allowedCharsArray.forEach((element) => {
      if(string[i] === element){
        foundChar = true
      }
    });
    if(foundChar === false){
      specialCharBool = true;
    }
  }
  return specialCharBool;
}

//watchers
//------------------------------
  watch(password, ()=> {
    if(password.value.length < 8){ 
      passwordWarningText.value = "Too short needs to be 8 characters"
      passwordWarningbool.value = true;
    } else if(password.value.length > 64){
      passwordWarningText.value = "Too longe needs to be less than 64 character";
      passwordWarningbool.value = true;
    }
     else if (FindSpecialChars(password.value)){
      passwordWarningText.value = "Special charactets is not allowed "
      passwordWarningbool.value = true;
    }
    else {
      passwordWarningbool.value = false;
    }
  });

  watch(username, ()=> {
    if(username.value.length < 3){
      usernameWarningText.value = "Too short needs to be 3 characters"
      usernameWarningbool.value = true;
    } else if (username.value.length > 64){
      usernameWarningText.value = "Too longe needs to be less than 64 characters"
      usernameWarningbool.value = true;
    } else if(FindSpecialChars(username.value)){
      usernameWarningText.value = "Special charactets is not allowed";
      usernameWarningbool.value = true;
    }
    else {
      usernameWarningbool.value = false;
    }
  })

</script>

<template>
  <form>
      <div class="input">
        <label for="fname">User name:</label><br>
        <input v-model="username" placeholder="enter username">
        <p v-if="usernameWarningbool === true"> {{ usernameWarningText }}</p>
      </div>
      <div class="input">
        <label for="lname">Password:</label><br>
        <input v-model="password" placeholder="enter password">
        <p v-if="passwordWarningbool === true">{{ passwordWarningText }} </p>
      </div>
  </form>
    <button @click="CreatUser">CreatNewUser</button>
    <p> {{ didUserGetCreated }}  </p>
 
</template>