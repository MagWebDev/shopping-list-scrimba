import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-4e34f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")
let mySound = new Audio('notification.mp3')
console.log(mySound)


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListDB, inputValue)
    mySound.play()
    clearInputFieldEl()
    
}
)

onValue(shoppingListDB, function (snapshot){
    if(snapshot.exists()){
   let shoppingItems = Object.entries(snapshot.val())
   
   clearShoppinList()
   for (let i=0; i < shoppingItems.length; i++){
        let currentItem = shoppingItems[i];
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1];
      appendItem(currentItem)
      
      
   }

} else {
   shoppingList.innerHTML = "no items here...yet"
}
})


function clearShoppinList() {
    shoppingList.innerHTML = ""  //clearing the list of item on page when updating database (prevent duplication of whole item list)
}
function clearInputFieldEl() {
    inputFieldEl.value = '';
}

function appendItem (item){
    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    newEl.addEventListener('click', function (){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
       
        
    })
    
    shoppingList.append(newEl)
   

    
}