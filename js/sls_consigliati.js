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
            var i;
            $.ajax({
                method: "GET",
                url: "http://provaphonegapfabri.altervista.org/php/sls_consigliati.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                    console.log(data);
                    var immagini=JSON.parse(data);
                    var el="";
                    var titolo="";
                    if(immagini){
                        titolo+="Smart Life Consigliati";
                        for(var i=0 ; i<immagini.length; i++){
                        
                            el+='<a href="slsUnico.html?codice='+immagini[i].SERVIZIO+'"><img src="'+immagini[i].FOTOGRUPPO+'" class="container-fluid centrato corpo imm"></a>';
                        }
                        $("#immagini").html(el);
                        
                    }
                    else{
                        titolo+="INFORMAZIONI NON DISPONIBILI";
                    }
                    $("#titolo").html(titolo);
                },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            });
   
});