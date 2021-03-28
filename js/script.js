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
        quelEpisodeS1(tabResults[i]);
    }

    for (let i = 11; i < tabResults.length; i++) {
        quelEpisodeS2(tabResults[i]);
    }

    const sousListe = document.querySelectorAll("#souslEp");
    console.log(sousListe)

    for(i = 0; i < sousListe.length; i++) { 
          let listeUriPerso = tabResults[i].characters;
          listePerso(listeUriPerso, sousListe[i]);
    }


  let titreUn = document.querySelector("#titre1");
  console.log("Mon titreUn : ", titreUn);

  let prochain = document.querySelector(".listeEpS1");
  console.log("Mon prochain1 : ", prochain);

  let fond2 = document.querySelector(".main");

  titreUn.addEventListener('click', function() {
    fond2.classList.add("newPic1");
    fond2.classList.remove("newPic2")

    titreUn.style.backgroundColor = "#C4E538";
    titreUn.style.color = "#0fb9b1";
    titreDeux.style.backgroundColor = "";
    titreDeux.style.color = "";

    if (prochain.style.display === "block"){
      prochain.style.display = "block";
      prochain2.style.display = "none";
    }
    else {
      prochain.style.display = "block";
      prochain2.style.display = "none";
    }
  })

  let titreDeux = document.querySelector("#titre2");
  console.log("Mon titreDeux : ", titreDeux);

  let prochain2 = document.querySelector(".listeEpS2");
  console.log("Mon prochain2 : ", prochain2);

  titreDeux.addEventListener('click', function() {
    fond2.classList.add("newPic2");
    fond2.classList.remove("newPic1");

    titreDeux.style.backgroundColor = "#C4E538";
    titreDeux.style.color = "#0fb9b1";
    titreUn.style.backgroundColor = "";
    titreUn.style.color = "";

    if (prochain2.style.display === "block"){
      prochain.style.display = "none";
      prochain2.style.display = "block";
    }
    else {
      prochain.style.display = "none";
      prochain2.style.display = "block";
    }
  })

  const lEp = document.querySelectorAll("#lEp");
  console.log("Voici :", lEp)

  console.log("et bah :", sousListe);
  for(let i = 0; i < sousListe.length; i++) { 
    for(let i = 0; i < lEp.length; i++) { 
      let cpt = 1;
        lEp[i].addEventListener('click', function() {
          cpt++;
          console.log(cpt)
          if (cpt % 2 == 0) {
                sousListe[i].style.display = "flex"
                sousListe[i].style.flexWrap = "wrap"
          }else {
                sousListe[i].style.display = "none"
          }
        })
    }
  }
})

.catch(function(error) {
  console.error(error);
})

  function quelEpisodeS1(info) {
    const maListe1 = document.querySelector(".listeEpS1");
    maListe1.innerHTML += 
    `
      <li id="lEp">
        ${info.id} : ${info.name}
        <li id="souslEp"></li>
      </li>
    `                                     
  }

  function quelEpisodeS2(info) {
    const maListe2 = document.querySelector(".listeEpS2");
    maListe2.innerHTML += 
    `
     <li id="lEp">
        ${info.id} : ${info.name}
      <li id="souslEp"></li>
     </li>
    `   
  }

  function listePerso(perso, ok) {
    for(const uri of perso) {
      fetch(uri)
      .then(function(reponse){
      return reponse.json()
      })
      .then(function(listePerso) {

        ok.innerHTML += 
        `
        <div class="sousListe">
          <p class="prenom">
            ${listePerso.name},
          </p>
        </div>
        `
      })
    }
  }