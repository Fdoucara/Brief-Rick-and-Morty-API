var startTime = new Date().getTime()
var elapsedTime = 0;


function affichagePersonnages(personnages) {
    const mainContainer = document.querySelector("body");
    mainContainer.innerHTML += 
    `<h2>${personnages.name}</h2>
    <div class="info_personnages_C hide_C">
        <img src="${personnages.image}" alt="image de ${personnages.name}">
        <div>
            <p>${personnages.name}</p>
            <p>${personnages.gender}</p>
            <p>${personnages.species}</p>
            <p>${personnages.type}</p>
            <p>${personnages.origin.name}</p>
            <p>${personnages.status}</p>
            <p>${personnages.location.name}</p>
        </div>
        <div class="episodes">
            <ul id="${personnages.id}">`
    personnages.episode.forEach(element => {
        fetch(element)
        .then(function(responseAPI) {return responseAPI.json();})
        .then(function(reponseEnJson) {
            const containerBuild = document.getElementById(personnages.id)
            containerBuild.innerHTML +=
            `<li>${reponseEnJson.name}</li>`
        })
        .catch(function(error) {
            console.error(error);
        })
    })
    mainContainer.innerHTML += 
            `</ul>
        </div>
    </div>
    `
}


function showOrHide(elem){
    var cliquable = document.querySelectorAll(elem)
    cliquable.forEach(cliquable =>{
        cliquable.addEventListener("click", function(){
            console.log("clicked")
            if (this.nextElementSibling.classList.contains("hide_C")){
                this.nextElementSibling.classList.remove("hide_C")
                this.nextElementSibling.classList.add("show_C")
            } else {
                this.nextElementSibling.classList.remove("show_C")
                this.nextElementSibling.classList.add("hide_C")
            }
            
        })
    })
}

fetch("https://rickandmortyapi.com/api/character")
.then(function(responseAPI) {
  return responseAPI.json(); // Ici je retourne l'objet reponse formater en JSON
})
.then(function(reponseEnJson) {
    for (let i=1; i < 10/*reponseEnJson.info.count + 1*/; i++){
        fetch("https://rickandmortyapi.com/api/character/" + i)
        .then(function(responseAPI) {return responseAPI.json();})
        .then(function(reponseEnJson) {affichagePersonnages(reponseEnJson);showOrHide("h2")})        
        .catch(function(error) {console.error(error);})
    }
    elapsedTime = new Date().getTime() - startTime;
    console.log("fin personnages.js en "+ elapsedTime + "ms")
})
.catch(function(error) {
  console.error(error);
})


// Fonctions de recherches
function espece(){
    console.log("espece")
}

const selecteur_espece = document.getElementById("selecteur_espece_C")
//selecteur_espece.setAttribute("onchange", function(){espece()})
console.log(selecteur_espece)
selecteur_espece.addEventListener("click", function(e){
    //espece()
    console.log('tttt')
})

document.querySelector("#test").addEventListener("click", function(e){
    //espece()
    console.log('test')
})

//selecteur_espece.onchange = function(){
//    var a = selecteur_espece.value
//    console.log(a)
//    console.log("tt")
//}