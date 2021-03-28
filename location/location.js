//------------locations-------------------//

fetch ("https://rickandmortyapi.com/api/location/")
.then(function(responseAPI) {
console.log("Just after reception of our response:", responseAPI);
return responseAPI.json();
})
.then(function(dataInJson) {
console.log("Response in JSON", dataInJson);
console.log("Content of attribute results", dataInJson.results);
// data du tableau => ["id", "name", "type", "dimension"]
console.log("Content of attribute info.count", dataInJson.info.count);
// data de l'objet info => 108 location au total
  for (let i = 1; i <= dataInJson.info.count; i++) {
// on incremente et on concatène pour obtenir un objet pour chaque lieu
    fetch ("https://rickandmortyapi.com/api/location/" + i)   
    .then(function(responseAPI) {return responseAPI.json();})
    .then(function(dataInJson) {addLocation(dataInJson); showOrHide(".container-location-m");
    })}    
 })

  function addLocation(location) {
  const mainContainerLocation = document.querySelector(".container-m");
  mainContainerLocation.innerHTML +=
//affichage du "id", "name", "type" et "dimension" de l'API "location" dans ma div de gauche (class="container-m")

  `<section>
  <div class="container-location-m">
      <span>${location.id} / </span>
      <span>${location.name} / </span>
      <span>${location.type} / </span>
      <span>${location.dimension}</span>
  </div>
      <div class="residents-m hide-m">
      <ul id="${location.residents}">`     

//conversion des string uri "residents" (api location) en "name" (api character)
//pour cela appel à une boucle forEach (pour chaque élément) "residents" -> "name"

  location.residents.forEach(element => {
    fetch (element)
    .then(function(responseAPI) {return responseAPI.json();})
    .then(function(dataInJson) {
      const mainLink = document.getElementById(location.residents);
      mainLink.innerHTML +=
      `<li class="bloc-li-m"><i class="fas fa-star">${dataInJson.name}</i></li>`
      //affichage "name" de tous les residents de toutes les planètes dans ma div de droite (class="container-li-m")
      //const containerLi = document.querySelector(".container-li-m");
      //containerLi.innerHTML += `<li class="show-m li-m">${dataInJson.name}</li>`
      //update: jai enlever ma deuxieme div, parce que je trouve que cela faisait pas trop jolie, j ai mis un scroll a la place
    })
  })
  mainContainerLocation.innerHTML += 
    `</ul>
    </div> 
  </br>
  </section>`
}

//fonction montrer ou cacher les li au click sur le ul

function showOrHide(elem){
  console.log("showOrHide()")
  var cliquable = document.querySelectorAll(elem)
  cliquable.forEach(cliquable =>{
      cliquable.addEventListener("click", function(){
          console.log("clicked")
          if (this.nextElementSibling.classList.contains("hide-m")){
              this.nextElementSibling.classList.remove("hide-m")
              this.nextElementSibling.classList.add("show-m")
          } else {
              this.nextElementSibling.classList.remove("show-m")
              this.nextElementSibling.classList.add("hide-m")
          }
          
      })
  })
}

  /*
   fetch ("https://rickandmortyapi.com/api/character/")
  .then(function(responseAPI) {
  console.log("Just after reception of our response:", responseAPI);
  return responseAPI.json();
  })
  
  .then(function(dataInJson) {
  console.log("Response in JSON", dataInJson);
  console.log("Content of attribute results", dataInJson.results.name);
  // data du tableau juste pour element "name"=> ["name"]
  console.log("Content of attribute info.count", dataInJson.info.count);
      for (let i = 1; i < dataInJson.info.count ; i++) {
        fetch ("https://rickandmortyapi.com/api/character/" + i)   
        .then(function(responseAPI) {return responseAPI.json();})
        .then(function(dataInJson) {addResidents(dataInJson);})}
        
  })

  function addResidents(habitants) {
  const containerTableau = document.getElementById("residents-m");
  containerTableau.innerHTML +=
  `<section> 
  <div class="habitants-m">
    <span>${habitants.name}</span>
  </div>
  </br>
  </section>`
  }   
  */
  