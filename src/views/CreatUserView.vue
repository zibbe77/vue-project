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
  <div class="grid place-content-center p-3 m-3 ">
    <form class=" border border-gray-200 p-2 m-2 rounded-sm">
        <div class="p-2">
          <label>User name:</label><br>
          <input v-model="username" placeholder="enter username">
          <div v-if="usernameWarningbool === true" class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(220, 38, 38)" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
             </svg>
            <p class="text-sm text-red-600"> {{ usernameWarningText }}</p>
          </div>

        </div>
        <div class="p-2">
          <label for="lname">Password:</label><br>
          <input v-model="password" placeholder="enter password">
          <div v-if="usernameWarningbool === true" class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(220, 38, 38)" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
             </svg>
            <p class="text-sm text-red-600"> {{ passwordWarningText }} </p>
          </div>
        </div>
    </form>
      <button class="flex items-center justify-center mx-2 h-12 px-4 mt-2 text-lg text-gray-600 text-center transition-colors duration-200 transform border rounded-lg xl:h-10 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" @click="CreatUser">Sign up</button>
      <p> {{ didUserGetCreated }}  </p>
  </div>
 
</template>