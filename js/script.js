const { updateLocale } = require("moment");

fetch("https://rickandmortyapi.com/api/episode")

.then(function(responseAPI){
  console.log(`Juste après réception de ma réponse :`, responseAPI);
  return responseAPI.json();
  })
  
  .then(function(dataEp){
    console.log(`Contenu de l\'attribut results :`, dataEp.results);
    let tabResults = dataEp.results;

    for (let i = 0; i < 11; i++) {
      // console.log(`Liste perso dans un episode :`, tabResults[i].characters);
        quelEpisodeS1(tabResults[i]);
    }

    for (let i = 11; i < tabResults.length; i++) {
      // console.log(`Liste perso dans un episode :`, tabResults[i].characters);
        quelEpisodeS2(tabResults[i]);
  }

  let titreUn = document.querySelector(".titreS1");

  titreUn.addEventListener('click', function() {
    let prochain = this.nextElementSibling;
    if (prochain.style.display === "block"){
      prochain.style.display = "none";
    }
    else {
      prochain.style.display = "block";
    }
  })

  let titreDeux = document.querySelector(".titreS2");

  titreDeux.addEventListener('click', function() {
    let prochain = this.nextElementSibling;
    if (prochain.style.display === "block"){
      prochain.style.display = "none";
    }
    else {
      prochain.style.display = "block";
    }
  })
})

  function quelEpisodeS1(info) {
    const maListe1 = document.querySelector(".listeEpS1");
    maListe1.innerHTML += 
    `
      <li>
       ${info.id} : ${info.name}
      </li>
    `                                     
  }

  function quelEpisodeS2(info) {
    const maListe2 = document.querySelector(".listeEpS2");
    maListe2.innerHTML += 
    `
     <li>
      ${info.id} : ${info.name} 
     </li>
    `   
  }