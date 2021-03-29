var startTime = new Date().getTime()
var elapsedTime = 0;


function affichagePersonnages(personnages) {
    const mainContainer = document.querySelector("body .results_C");
    mainContainer.innerHTML += 
    `<h2>${personnages.id} : ${personnages.name}</h2>
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
            console.log(personnages.type)
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
    for (let i=1; i < reponseEnJson.info.count + 1; i++){
        fetch("https://rickandmortyapi.com/api/character/" + i)
        .then(function(responseAPI) {return responseAPI.json();})
        .then(function(reponseEnJson) {affichagePersonnages(reponseEnJson);showOrHide("h2");addEvent();})
        .catch(function(error) {console.error(error);})
    }
})
.then(function(){
    console.log("deuxieme then")
    elapsedTime = new Date().getTime() - startTime;
    console.log("fin personnages.js en "+ elapsedTime + "ms")
})
.catch(function(error) {
  console.error(error);
})


// Fonctions de recherches


function addEvent(){
    const selecteur_filtre = document.getElementById("selecteur_filtre_C")
    //console.log(selecteur_filtre.value)
    selecteur_filtre.addEventListener("change", function(){majValueSelecteur(selecteur_filtre.value)})
}


function majValueSelecteur(categ){
    console.log("majValueSelecteur")
    console.log(categ)
    const selecteur_filtre = document.getElementById("selecteur_filtre_C")
    console.log("selecteur filtre : " + selecteur_filtre)
    console.log(selecteur_filtre.nextElementSibling)

    if (categ ==''){
        selecteur_filtre.parentNode.lastElementChild.innerHTML = 
        `<option value=''>--------------Choisir une valeur--------------</option>`
        document.getElementById("selecteur_value_C").setAttribute("disabled", false)
    } else {
        switch (categ){
            case 'species':
                console.log('type')
                document.getElementById("selecteur_value_C").removeAttribute("disabled")
                selecteur_filtre.parentNode.lastElementChild.innerHTML = 
                `
                <option value=''>--------------Choisir une espèce--------------</option>
                `
                break;
            case 'type':
                console.log('type')
                document.getElementById("selecteur_value_C").removeAttribute("disabled")
                selecteur_filtre.parentNode.lastElementChild.innerHTML = 
                `
                <option value=''>--------------Choisir un type--------------</option>
                `
                break;
            case 'gender':
                console.log('type')
                document.getElementById("selecteur_value_C").removeAttribute("disabled")
                selecteur_filtre.parentNode.lastElementChild.innerHTML = 
                `
                <option value=''>--------------Choisir un genre--------------</option>
                <option value='female'>Femelle</option>
                <option value='male'>Mâle</option>
                <option value='genderless'>Sans genre</option>
                <option value='unknown'>Inconnu</option>
                `
                break;
            case 'status':
                console.log('type')
                document.getElementById("selecteur_value_C").removeAttribute("disabled")
                selecteur_filtre.parentNode.lastElementChild.innerHTML = 
                `
                <option value=''>--------------Choisir un status--------------</option>
                <option value='alive'>Vivant</option>
                <option value='dead'>Mort</option>
                <option value='unknown'>Inconnu</option>
                `
                break;
            default:
                break;
        }
    }
}


function recherche(categ, value){}