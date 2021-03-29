function affichagePersonnages(personnages) {
    //console.log("affichagePersonnages()")
    const mainContainer = document.querySelector("body .results_C");
    mainContainer.innerHTML += 
    `<h2>${personnages.id} : ${personnages.name}</h2>
    <div class="info_personnages_C hide_C">
        <img src="${personnages.image}" alt="image de ${personnages.name}">
        <div class="info_perso_C">
            <p>${personnages.name}</p>
            <p>${personnages.gender}</p>
            <p>${personnages.species}</p>
            <p>${personnages.type}</p>
            <p>${personnages.origin.name}</p>
            <p>${personnages.status}</p>
            <p>${personnages.location.name}</p>
        </div>
        <div class="episodes">
            <h4>Episodes :</h4>
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
    //console.log("showOrHide()")
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


function pageActuelle(uri){
    //console.log("pageActuelle()")
    //currentPage = (firstElemList-1) / nbElemPage + 1
    //console.log("page actuelle : " + currentPage)

    uri2Part = uri.split("?")
    //separation parametres entre eux
    parametres = uri2Part[1].split("&")
    //parametresEtCible contient spearé 
    parametresEtCible = []
    parametres.forEach(element => {
        //separation parametres et value
        tempo = element.split("=")
        parametresEtCible.push(tempo[0])
        parametresEtCible.push(tempo[1])
    })
    // identification de l'idex du parametre "page"
    indexParamPage = parametresEtCible.findIndex(element => element == "page")
    currentPage = parseInt(parametresEtCible[indexParamPage + 1])
    return currentPage
}


function affichageButtonNavPages(prev, x, next, uri) {
    //console.log("affichageButtonNavPages()")
    let Container = document.querySelector("body .page_nav_C .button_container");
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
            afficherPages(prevNextUri(uri, "next"))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages(prevNextUri(uri, "next", 2))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages(prevNextUri(uri, "next"))})
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
            afficherPages(prevNextUri(uri, "prev"))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages(prevNextUri(uri, "prev", 2))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages(prevNextUri(uri, "prev"))})
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
            afficherPages(prevNextUri(uri, "prev"))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages(prevNextUri(uri, "prev", 2))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages(prevNextUri(uri, "prev"))})
        Container = Container.nextElementSibling.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages(prevNextUri(uri, "next"))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages(prevNextUri(uri, "next", 2))})
        Container = Container.nextElementSibling
        Container.addEventListener("click", function(){
            afficherPages(prevNextUri(uri, "next"))})
    }
}


function majValueSelecteur(categ){
    //console.log("majValueSelecteur()")
    const selecteur_filtre = document.getElementById("selecteur_filtre_C")
    if (categ ==''){
        selecteur_filtre.parentNode.lastElementChild.innerHTML = 
        `<option value=''>--------------Choisir une valeur--------------</option>`
        document.getElementById("selecteur_value_C").setAttribute("disabled", false)
        //return afficherPages("https://rickandmortyapi.com/api/character/?page=1")
    } else {
        switch (categ){
            case 'species':
                document.getElementById("selecteur_value_C").removeAttribute("disabled")
                selecteur_filtre.parentNode.lastElementChild.innerHTML = 
                `
                <option value=''>--------------Choisir une espèce--------------</option>
                <option value='Human'>Humain</option>
                <option value='Humanoid'>Humanoid</option>
                <option value='Alien'>Alien</option>
                <option value='Poopybutthole'>Poopybutthole</option>
                <option value='Mythological Creature'>Créature mythologique</option>
                <option value='Animal'>Animal</option>
                <option value='Robot'>Robot</option>
                <option value='Cronenberg'>Cronenberg</option>
                <option value='Planet'>Planete</option>
                <option value='Disease'>maladie</option>
                <option value='unknown'>unknown</option>
                `
                break;
            case 'gender':
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
    categ2 = categ
    document.getElementById("selecteur_value_C").addEventListener("change", function(){
        afficherPages("https://rickandmortyapi.com/api/character/?" 
        + categ2
        + "=" 
        + document.getElementById("selecteur_value_C").value
        + "&page=1")})
}


function afficherPages(uri){
    //console.log("afficherPages()")
    fetch(uri)
    .then(function(responseAPI) {return responseAPI.json();})
    .then(function(listePersonnages) {
        document.querySelector("body .results_C").innerHTML = ""
        listePersonnages.results.forEach(element => {
            affichagePersonnages(element);
        });
        showOrHide("h2")
        affichageButtonNavPages(listePersonnages.info.prev, 
                                pageActuelle(uri),
                                listePersonnages.info.next,
                                uri)
        document.getElementById("selecteur_filtre_C")
        .addEventListener("change", function(){majValueSelecteur(selecteur_filtre_C.value)})
    })
    .catch(function(error) {
        console.error(error);
    })
}

function prevNextUri(uri, direction, jump){
    //console.log("prevNextUri()")
    if (jump == null){jump = 1}
    //separation uri et parametres
    uri2Part = uri.split("?")
    //separation parametres entre eux
    parametres = uri2Part[1].split("&")
    //parametresEtCible contient spearé 
    parametresEtCible = []
    parametres.forEach(element => {
        //separation parametres et value
        tempo = element.split("=")
        parametresEtCible.push(tempo[0])
        parametresEtCible.push(tempo[1])
    })
    // identification de l'idex du parametre "page"
    indexParamPage = parametresEtCible.findIndex(element => element == "page")

    if (direction == "next"){
        parametresEtCible[indexParamPage + 1] = parseInt(parametresEtCible[indexParamPage + 1]) + jump
    } else if (direction == "prev"){
        parametresEtCible[indexParamPage + 1] = parseInt(parametresEtCible[indexParamPage + 1]) - jump
    }
    page = uri2Part[0] + "?"
    for (let i = 0; i < parametresEtCible.length; i++){
        page += parametresEtCible[i]
        page += "="
        page += parametresEtCible[i+1]
        if (i + 2 != parametresEtCible.length){
            page += "&"
        }
        i++
    }
    //console.log("url retourné pour " + uri + " " + direction + " " + jump +  " : " + page)
    return page
}


document.getElementById("selecteur_filtre_C").selectedIndex = 0;
afficherPages("https://rickandmortyapi.com/api/character/?page=1")