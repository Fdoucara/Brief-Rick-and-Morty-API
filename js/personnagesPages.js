function affichagePersonnages(personnages) {
    console.log("affichagePersonnages()")
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
    console.log("showOrHide()")
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


function pageActuelle(firstElemList, nbElemPage){
    console.log("pageActuelle()")
    currentPage = (firstElemList-1) / nbElemPage + 1
    console.log("page actuelle : " + currentPage)
    return currentPage
}


function affichageButtonNavPages(prev, x, next, uri) {
    console.log("affichageButtonNavPages()")
    let Container = document.querySelector("body .page_nav_C");
    if (prev == null) {
        Container.innerHTML = 
        `
        <button disabled>Page précédante</button>
        <button disabled>${x-2}</button>
        <button disabled>${x-1}</button>
        <button disabled>${x}</button>
        <button>${x+1}</button>
        <button>${x+2}</button>
        <button class="nextPage">Page suivante</button>
        `
        Container = Container.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x+1))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x+2))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x+1))})
    } else if (next == null){
        Container.innerHTML = 

        `<button class="previousPage">Page précédante</button>
        <button>${x-2}</button>
        <button>${x-1}</button>
        <button disabled>${x}</button>
        <button disabled>${x+1}</button>
        <button disabled>${x+2}</button>
        <button disabled>Page suivante</button>
        `
        Container = Container.firstElementChild
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x-1))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x-2))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x-1))})
    } else {
        Container.innerHTML = 
        `
        <button class="previousPage">Page précédante</button>
        <button>${x-2}</button>
        <button>${x-1}</button>
        <button disabled>${x}</button>
        <button>${x+1}</button>
        <button>${x+2}</button>
        <button class="nextPage">Page suivante</button>
        `
        Container = Container.firstElementChild
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x-1))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x-2))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x-1))})
        Container = Container.nextElementSibling.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x+1))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x+2))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages("https://rickandmortyapi.com/api/character/?page=" + (x+1))})
    }
}


function afficherPages(uri){
    console.log("afficherPages")
    fetch(uri)
    .then(function(responseAPI) {return responseAPI.json();})
    .then(function(listePersonnages) {
        document.querySelector("body .results_C").innerHTML = ""
        listePersonnages.results.forEach(element => {
            affichagePersonnages(element);
        });
        showOrHide("h2")
        affichageButtonNavPages(listePersonnages.info.prev, 
                                pageActuelle(listePersonnages.results[0].id, 20), 
                                listePersonnages.info.next,
                                uri)
    })
    .catch(function(error) {
        console.error(error);
    })
}

afficherPages("https://rickandmortyapi.com/api/character/?page=1")