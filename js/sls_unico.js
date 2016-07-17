$(document).ready(function(){
    
            function recuperaVariabili(){
  // creo l'array che conterrà tutte le variabili con i rispettivi valori
  var variabili = {};
  // recupero tutta la querystring nell'url
  var stringUrl = window.location.search;
  // pulisco la stringa dal "?" iniziale
  stringUrl = stringUrl.substring(1);
  // suddivido in un array le varie coppie di variabile e valore
  var listaVariabili = stringUrl.split('&');
   // ciclo su tutte le coppie di variabile e valore e creo l'array finale delle variabili in url
  for(var a=0; a < listaVariabili.length; a++){
   // divido la coppia variabile e valore attraverso il simbolo "="
   var partiVariabile = listaVariabili[a].split('=');
   // inserisco nell'array finale i valori, come chiave dell'array il nome della variabile e come valore chiaramente il valore
   variabili[unescape(partiVariabile[0])] = unescape(partiVariabile[1]);
  }
  return variabili;
}



    var dati=recuperaVariabili();
    var data=dati;
    
            console.log(data);
            var i;
            $.ajax({
                method: "GET",
                url: "http://provaphonegapfabri.altervista.org/php/sls_unico.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                        var sls = JSON.parse(data);
                        var titolo="";
                        var prodotticonsigliati="";
                        if(sls){
                            titolo+='<h1><u>'+sls[0].NOME+'</u></h1><div class="container-fluid centrato corpo" id="centro"><img src="'+sls[0].FOTOGRUPPO+'" alt="" class="container-fluid centrato immagine">';
                            titolo+='<p class="container-fluid centrato immagine">'+sls[0].DESCRIZIONE+'</p><div class="container-fluid centrato immagine" style="display:inline-block"><div class="container-fluid centrato" style="display:inline-block;color:red;font-size:40px;font-weight:bold; margin:15px;"> '+sls[0].PREZZO+'/'+sls[0].RINNOVO+'</div><button>Aggiungi al carrello</button></div></div>';
                            for(i=0; i<sls.length; i++){
                                prodotticonsigliati+='<div class="container-fluid centrato corpo imm" ><img class="container-fluid centrato corpo imm" src="'+sls[i].FOTO+'" alt=""><br> <a>'+sls[i].NOMEPR+'</a></div>';
                            }
                    
                            $("#titoloSls").html(titolo);
                            $("#prodconsigliati").html(prodotticonsigliati);
                        }
                        else {
                            titolo+="<h1><u>INFORMAZIONI NON DISPONIBILI</u></h1>";
                            $("#titoloSls").html(titolo);
                        }
                },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            });
   
});




