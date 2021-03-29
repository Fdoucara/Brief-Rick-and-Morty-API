// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/personnagesPages.js":[function(require,module,exports) {
function affichagePersonnages(personnages) {
  //console.log("affichagePersonnages()")
  var mainContainer = document.querySelector("body .results_C");
  mainContainer.innerHTML += "<h2>".concat(personnages.id, " : ").concat(personnages.name, "</h2>\n    <div class=\"info_personnages_C hide_C\">\n        <img src=\"").concat(personnages.image, "\" alt=\"image de ").concat(personnages.name, "\">\n        <div class=\"info_perso_C\">\n            <p>").concat(personnages.name, "</p>\n            <p>").concat(personnages.gender, "</p>\n            <p>").concat(personnages.species, "</p>\n            <p>").concat(personnages.type, "</p>\n            <p>").concat(personnages.origin.name, "</p>\n            <p>").concat(personnages.status, "</p>\n            <p>").concat(personnages.location.name, "</p>\n        </div>\n        <div class=\"episodes\">\n            <h4>Episodes :</h4>\n            <ul id=\"").concat(personnages.id, "\">");
  personnages.episode.forEach(function (element) {
    fetch(element).then(function (responseAPI) {
      return responseAPI.json();
    }).then(function (reponseEnJson) {
      var containerBuild = document.getElementById(personnages.id);
      containerBuild.innerHTML += "<li>".concat(reponseEnJson.name, "</li>");
    }).catch(function (error) {
      console.error(error);
    });
  });
  mainContainer.innerHTML += "</ul>\n        </div>\n    </div>\n    ";
}

function showOrHide(elem) {
  //console.log("showOrHide()")
  var cliquable = document.querySelectorAll(elem);
  cliquable.forEach(function (cliquable) {
    cliquable.addEventListener("click", function () {
      console.log("clicked");

      if (this.nextElementSibling.classList.contains("hide_C")) {
        this.nextElementSibling.classList.remove("hide_C");
        this.nextElementSibling.classList.add("show_C");
      } else {
        this.nextElementSibling.classList.remove("show_C");
        this.nextElementSibling.classList.add("hide_C");
      }
    });
  });
}

function pageActuelle(uri) {
  //console.log("pageActuelle()")
  //currentPage = (firstElemList-1) / nbElemPage + 1
  //console.log("page actuelle : " + currentPage)
  uri2Part = uri.split("?"); //separation parametres entre eux

  parametres = uri2Part[1].split("&"); //parametresEtCible contient spearé 

  parametresEtCible = [];
  parametres.forEach(function (element) {
    //separation parametres et value
    tempo = element.split("=");
    parametresEtCible.push(tempo[0]);
    parametresEtCible.push(tempo[1]);
  }); // identification de l'idex du parametre "page"

  indexParamPage = parametresEtCible.findIndex(function (element) {
    return element == "page";
  });
  currentPage = parseInt(parametresEtCible[indexParamPage + 1]);
  return currentPage;
}

function affichageButtonNavPages(prev, x, next, uri) {
  //console.log("affichageButtonNavPages()")
  var Container = document.querySelector("body .page_nav_C .button_container");

  if (prev == null) {
    Container.innerHTML = "\n        <button disabled>Page pr\xE9c\xE9dante</button>\n        <button disabled>".concat(x - 2, "</button>\n        <button disabled>").concat(x - 1, "</button>\n        <button disabled>").concat(x, "</button>\n        <button>").concat(x + 1, "</button>\n        <button>").concat(x + 2, "</button>\n        <button class=\"nextPage\">Page suivante</button>\n        ");
    Container = Container.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "next"));
    });
    Container = Container.nextElementSibling;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "next", 2));
    });
    Container = Container.nextElementSibling;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "next"));
    });
  } else if (next == null) {
    Container.innerHTML = "<button class=\"previousPage\">Page pr\xE9c\xE9dante</button>\n        <button>".concat(x - 2, "</button>\n        <button>").concat(x - 1, "</button>\n        <button disabled>").concat(x, "</button>\n        <button disabled>").concat(x + 1, "</button>\n        <button disabled>").concat(x + 2, "</button>\n        <button disabled>Page suivante</button>\n        ");
    Container = Container.firstElementChild;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "prev"));
    });
    Container = Container.nextElementSibling;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "prev", 2));
    });
    Container = Container.nextElementSibling;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "prev"));
    });
  } else {
    Container.innerHTML = "\n        <button class=\"previousPage\">Page pr\xE9c\xE9dante</button>\n        <button>".concat(x - 2, "</button>\n        <button>").concat(x - 1, "</button>\n        <button disabled>").concat(x, "</button>\n        <button>").concat(x + 1, "</button>\n        <button>").concat(x + 2, "</button>\n        <button class=\"nextPage\">Page suivante</button>\n        ");
    Container = Container.firstElementChild;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "prev"));
    });
    Container = Container.nextElementSibling;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "prev", 2));
    });
    Container = Container.nextElementSibling;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "prev"));
    });
    Container = Container.nextElementSibling.nextElementSibling;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "next"));
    });
    Container = Container.nextElementSibling;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "next", 2));
    });
    Container = Container.nextElementSibling;
    Container.addEventListener("click", function () {
      afficherPages(prevNextUri(uri, "next"));
    });
  }
}

function majValueSelecteur(categ) {
  //console.log("majValueSelecteur()")
  var selecteur_filtre = document.getElementById("selecteur_filtre_C");

  if (categ == '') {
    selecteur_filtre.parentNode.lastElementChild.innerHTML = "<option value=''>--------------Choisir une valeur--------------</option>";
    document.getElementById("selecteur_value_C").setAttribute("disabled", false); //return afficherPages("https://rickandmortyapi.com/api/character/?page=1")
  } else {
    switch (categ) {
      case 'species':
        document.getElementById("selecteur_value_C").removeAttribute("disabled");
        selecteur_filtre.parentNode.lastElementChild.innerHTML = "\n                <option value=''>--------------Choisir une esp\xE8ce--------------</option>\n                <option value='Human'>Humain</option>\n                <option value='Humanoid'>Humanoid</option>\n                <option value='Alien'>Alien</option>\n                <option value='Poopybutthole'>Poopybutthole</option>\n                <option value='Mythological Creature'>Cr\xE9ature mythologique</option>\n                <option value='Animal'>Animal</option>\n                <option value='Robot'>Robot</option>\n                <option value='Cronenberg'>Cronenberg</option>\n                <option value='Planet'>Planete</option>\n                <option value='Disease'>maladie</option>\n                <option value='unknown'>unknown</option>\n                ";
        break;

      case 'gender':
        document.getElementById("selecteur_value_C").removeAttribute("disabled");
        selecteur_filtre.parentNode.lastElementChild.innerHTML = "\n                <option value=''>--------------Choisir un genre--------------</option>\n                <option value='female'>Femelle</option>\n                <option value='male'>M\xE2le</option>\n                <option value='genderless'>Sans genre</option>\n                <option value='unknown'>Inconnu</option>\n                ";
        break;

      case 'status':
        document.getElementById("selecteur_value_C").removeAttribute("disabled");
        selecteur_filtre.parentNode.lastElementChild.innerHTML = "\n                <option value=''>--------------Choisir un status--------------</option>\n                <option value='alive'>Vivant</option>\n                <option value='dead'>Mort</option>\n                <option value='unknown'>Inconnu</option>\n                ";
        break;

      default:
        break;
    }
  }

  categ2 = categ;
  document.getElementById("selecteur_value_C").addEventListener("change", function () {
    afficherPages("https://rickandmortyapi.com/api/character/?" + categ2 + "=" + document.getElementById("selecteur_value_C").value + "&page=1");
  });
}

function afficherPages(uri) {
  //console.log("afficherPages()")
  fetch(uri).then(function (responseAPI) {
    return responseAPI.json();
  }).then(function (listePersonnages) {
    document.querySelector("body .results_C").innerHTML = "";
    listePersonnages.results.forEach(function (element) {
      affichagePersonnages(element);
    });
    showOrHide("h2");
    affichageButtonNavPages(listePersonnages.info.prev, pageActuelle(uri), listePersonnages.info.next, uri);
    document.getElementById("selecteur_filtre_C").addEventListener("change", function () {
      majValueSelecteur(selecteur_filtre_C.value);
    });
  }).catch(function (error) {
    console.error(error);
  });
}

function prevNextUri(uri, direction, jump) {
  //console.log("prevNextUri()")
  if (jump == null) {
    jump = 1;
  } //separation uri et parametres


  uri2Part = uri.split("?"); //separation parametres entre eux

  parametres = uri2Part[1].split("&"); //parametresEtCible contient spearé 

  parametresEtCible = [];
  parametres.forEach(function (element) {
    //separation parametres et value
    tempo = element.split("=");
    parametresEtCible.push(tempo[0]);
    parametresEtCible.push(tempo[1]);
  }); // identification de l'idex du parametre "page"

  indexParamPage = parametresEtCible.findIndex(function (element) {
    return element == "page";
  });

  if (direction == "next") {
    parametresEtCible[indexParamPage + 1] = parseInt(parametresEtCible[indexParamPage + 1]) + jump;
  } else if (direction == "prev") {
    parametresEtCible[indexParamPage + 1] = parseInt(parametresEtCible[indexParamPage + 1]) - jump;
  }

  page = uri2Part[0] + "?";

  for (var i = 0; i < parametresEtCible.length; i++) {
    page += parametresEtCible[i];
    page += "=";
    page += parametresEtCible[i + 1];

    if (i + 2 != parametresEtCible.length) {
      page += "&";
    }

    i++;
  } //console.log("url retourné pour " + uri + " " + direction + " " + jump +  " : " + page)


  return page;
}

document.getElementById("selecteur_filtre_C").selectedIndex = 0;
afficherPages("https://rickandmortyapi.com/api/character/?page=1");
},{}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52044" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/personnagesPages.js"], null)
//# sourceMappingURL=/personnagesPages.861ab988.js.map