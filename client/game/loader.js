Loader = function (ressources, ready) {
  console.log("Chargement des images...");
  var nbRess = ressources.length;
  var nbReady = 0;
  
  var callBack = function(){
    nbReady++;
    if (nbReady == nbRess){
      for (var call in ready){
        ready[call]();
      }
    }
  }
  
  for (var ress in ressources){
    ressources[ress].img.src = ressources[ress].src;
    console.log("Chargement: " + ressources[ress].src);
    ressources[ress].img.onload = callBack;
  }
}