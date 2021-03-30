let linksPage = [];

for (let i = 1; i <= 41; i++) {
    linksPage.push("https://rickandmortyapi.com/api/episode/" + [i]);  
}
    
Promise.all(linksPage.map(uri => fetch(uri)))
    .then(res1 => Promise.all(res1.map(res2 => res2.json())))
    .then( jsonResponseAll => {
        console.log(`Contenu de l\'attribut results :`, jsonResponseAll);

        let tabResults = jsonResponseAll;
        for (let i = 0; i < 11; i++) {
          quelEpisodeS1(tabResults[i]);
      }
  
      for (let i = 11; i < 21; i++) {
          quelEpisodeS2(tabResults[i]);
      }

      for (let i = 21; i < 31; i++) {
        quelEpisodeS3(tabResults[i]);
      }

      for (let i = 31; i < 41; i++) {
        quelEpisodeS4(tabResults[i]);
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
      fond2.classList.remove("newPic4");
      fond2.classList.remove("newPic3");
      fond2.classList.add("newPic1");
      fond2.classList.remove("newPic2")
  
      titreQuatre.style.backgroundColor = "";
      titreQuatre.style.color = "";
      titreTrois.style.backgroundColor = "";
      titreTrois.style.color = "";
      titreUn.style.backgroundColor = "#C4E538";
      titreUn.style.color = "#0fb9b1";
      titreDeux.style.backgroundColor = "";
      titreDeux.style.color = "";
  
      if (prochain.style.display === "block"){
        prochain.style.display = "block";
        prochain2.style.display = "none";
        prochain3.style.display = "none";
        prochain4.style.display = "none";
      }
      else {
        prochain.style.display = "block";
        prochain2.style.display = "none";
        prochain3.style.display = "none";
        prochain4.style.display = "none";
      }
    })
  
    let titreDeux = document.querySelector("#titre2");
    console.log("Mon titreDeux : ", titreDeux);
  
    let prochain2 = document.querySelector(".listeEpS2");
    console.log("Mon prochain2 : ", prochain2);
  
    titreDeux.addEventListener('click', function() {
      fond2.classList.remove("newPic4");
      fond2.classList.remove("newPic3");
      fond2.classList.add("newPic2");
      fond2.classList.remove("newPic1");
  
      titreQuatre.style.backgroundColor = "";
      titreQuatre.style.color = "";
      titreTrois.style.backgroundColor = "";
      titreTrois.style.color = "";
      titreDeux.style.backgroundColor = "#C4E538";
      titreDeux.style.color = "#0fb9b1";
      titreUn.style.backgroundColor = "";
      titreUn.style.color = "";
  
      if (prochain2.style.display === "block"){
        prochain.style.display = "none";
        prochain2.style.display = "block";
        prochain3.style.display = "none";
        prochain4.style.display = "none";
      }
      else {
        prochain.style.display = "none";
        prochain2.style.display = "block";
        prochain3.style.display = "none";
        prochain4.style.display = "none";
      }
    })

    let titreTrois = document.querySelector("#titre3");
    console.log("Mon titreTrois : ", titreTrois);
  
    let prochain3 = document.querySelector(".listeEpS3");
    console.log("Mon prochain3 : ", prochain3);
  
    titreTrois.addEventListener('click', function() {
      fond2.classList.remove("newPic4");
      fond2.classList.add("newPic3");
      fond2.classList.remove("newPic2");
      fond2.classList.remove("newPic1");
  
      titreQuatre.style.backgroundColor = "";
      titreQuatre.style.color = "";
      titreTrois.style.backgroundColor = "#C4E538";
      titreTrois.style.color = "#0fb9b1";
      titreDeux.style.backgroundColor = "";
      titreDeux.style.color = "";
      titreUn.style.backgroundColor = "";
      titreUn.style.color = "";
  
      if (prochain3.style.display === "block"){
        prochain.style.display = "none";
        prochain2.style.display = "none";
        prochain3.style.display = "block";
        prochain4.style.display = "none";
      }
      else {
        prochain.style.display = "none";
        prochain2.style.display = "none";
        prochain3.style.display = "block";
        prochain4.style.display = "none";
      }
    })

    let titreQuatre = document.querySelector("#titre4");
    console.log("Mon titreQuatre : ", titreQuatre);
  
    let prochain4 = document.querySelector(".listeEpS4");
    console.log("Mon prochain4 : ", prochain4);
    
    titreQuatre.addEventListener('click', function() {
      fond2.classList.add("newPic4");
      fond2.classList.remove("newPic3");
      fond2.classList.remove("newPic2");
      fond2.classList.remove("newPic1");
  
      titreQuatre.style.backgroundColor = "#C4E538";
      titreQuatre.style.color = "#0fb9b1";
      titreTrois.style.backgroundColor = "";
      titreTrois.style.color = "";
      titreDeux.style.backgroundColor = "";
      titreDeux.style.color = "";
      titreUn.style.backgroundColor = "";
      titreUn.style.color = "";
  
      if (prochain4.style.display === "block"){
        prochain.style.display = "none";
        prochain2.style.display = "none";
        prochain3.style.display = "none";
        prochain4.style.display = "block";
      }
      else {
        prochain.style.display = "none";
        prochain2.style.display = "none";
        prochain3.style.display = "none";
        prochain4.style.display = "block";
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
            lEp[i].classList.toggle("vert");
            console.log(cpt)
            if (cpt % 2 == 0) {
                  sousListe[i].style.display = "flex"
                  sousListe[i].style.transition = "all 0.2s"
                  sousListe[i].style.flexWrap = "wrap"
                  sousListe[i].style.position = "absolute"
                  sousListe[i].style.width = "59.05%"
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

  function quelEpisodeS3(info) {
    const maListe3 = document.querySelector(".listeEpS3");
    maListe3.innerHTML += 
    `
     <li id="lEp">
        ${info.id} : ${info.name}
      <li id="souslEp"></li>
     </li>
    `   
  }

  function quelEpisodeS4(info) {
    const maListe4 = document.querySelector(".listeEpS4");
    maListe4.innerHTML += 
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