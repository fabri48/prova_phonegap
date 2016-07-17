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
    
    $.ajax({
                method: "GET",
                url: "http://provaphonegapfabri.altervista.org/php/tariffe_consigliate.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                        console.log(data);
                        var tariffe=JSON.parse(data);
                        var el="";
                                                
                        var imgchiamate="images/chiamate.png";
                        var imgsms="images/sms.png";
                        var imgchiamatesms="images/chiamate_sms.png";
                        var imgestero=imgchiamate;
                        var imginternet="images/internet.png";
                        var imgaltro="images/tim_entertainment.png";
                    
                        if(tariffe){
                            
                            for(var i=0; i<tariffe.length; i++){
                                var index=i.toString();
                                
                                el+='<div class="container centrato contenitore" id="contenitore'+index+'"><p href="tariffaUnica.html?id='+tariffe[i].ID+'">'+tariffe[i].NOME+'</p>';
                                
                                if(tariffe[i].CHIAMATE){
                                    el+='<div class="container-fluid centrato corpo spazio"><table><tbody><tr><td><img src="'+imgchiamate+'" alt=""></td></tr><tr><td>'+tariffe[i].CHIAMATE+'</td></tr></tbody></table></div>';
                                    }
                                
                                    if(tariffe[i].SMS){
                                        el+='<div class="container-fluid centrato corpo spazio"><table><tbody><tr><td><img src="'+imgsms+'" alt=""></td></tr><tr><td>'+tariffe[i].SMS+'</td></tr></tbody></table></div>';
                                    }
                                    if(tariffe[i].CHIAMSMS){
                                        el+='<div class="container-fluid centrato corpo spazio"><table><tbody><tr><td><img src="'+imgchiamatesms+'" alt=""></td></tr><tr><td>'+tariffe[i].CHIAMSMS+'</td></tr></tbody></table></div>';
                                    }
                                    if(tariffe[i].ESTERO){
                                        el+='<div class="container-fluid centrato corpo spazio"><table><tbody><tr><td><img src="'+imgestero+'" alt=""></td></tr><tr><td>'+tariffe[i].ESTERO+'</td></tr></tbody></table></div>';
                                    }
                                    if(tariffe[i].INTERNET){
                                        el+='<div class="container-fluid centrato corpo spazio"><table><tbody><tr><td><img src="'+imginternet+'" alt=""></td></tr><tr><td>'+tariffe[i].INTERNET+'</td></tr></tbody></table></div>';
                                    }
                                    if(tariffe[i].ALTRO){
                                        el+='<div class="container-fluid centrato corpo spazio"><table><tbody><tr><td><img     src="'+imgaltro+'" alt=""></td></tr><tr><td>'+tariffe[i].ALTRO+'</td></tr></tbody></table></div>';
                                    }
                                
                                    el+='<div class="container-fluid centrato corpo spazio prezzo"><table><tbody><tr><td>'+tariffe[i].PREZZO+'</td></tr></tbody></table></div></div><br>';
                                
                                
                                
                                
                                
                                
                                
                            }
                            $("#contengoTariffe").html(el);
                            
                        }
                        else{
                            el+="<br><br><p>INFORMAZIONI NON DISPONIBILI</p>";
                            $("#contengoTariffe").html(el);
                        }
                    
                        
                    },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            });






});