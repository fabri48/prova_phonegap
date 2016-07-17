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
                url: "http://provaphonegapfabri.altervista.org/php/categoria_tar.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                    var tariffe = JSON.parse(data);
                    var el="";
                    var titolo="";
                    var space=/\s/g;
                    if(tariffe){
                        titolo+=tariffe[0].CATEGORIA;
                        var action="";
                        for(var i=0 ; i<tariffe.length; i++){
                            var n=i+1;
                            var k=n.toString();
                            if(el==''){
                                el+='<div class="container-fluid elenco"><p>'+tariffe[i].SUBCAT+'</p><ul>';
                            }
                            else if(i-1>=0 && (tariffe[i-1].SUBCAT!=tariffe[i].SUBCAT)){
                                el+='</ul></div><div class="container-fluid elenco"><p>'+tariffe[i].SUBCAT+'</p><ul>';
                            }
                            action=tariffe[i].GRUPPO;
                            action=action.toLowerCase();
                            action=action.replace(space, "_");
                            if(action=="tim_special"){
                                el+='<el><li> <a href="tariffaUnica.html?id=0">'+tariffe[i].GRUPPO+'</a></li></el>';
                            }
                            else{
                                el+='<el><li> <a href="tariffaUnica.html?id='+k+'">'+tariffe[i].GRUPPO+'</a></li></el>';
                            }
                        }
                        //console.log(el);
                        $("#titolo").html(titolo);
                        $("#contenitore").html(el);
                    }
                    else {
                        el+="INFORMAZIONI NON DISPONIBILI";
                        $("#titolo").html(el);
                    }
                    
                },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            });
   
});





/*<div class="container-fluid elenco">
         <p>Smartphone e Tablet</p>
           	<ul>
               	<el href="#"><li>CONFIGURA ONLINE</li></el>
				<el href="#"><li>Servizi per e dal tuo smartphone</li></el>
				<el href="#"><li>Configurare la posta</li></el>
				<el href="#"><li>Configurazioni e manuali</li></el>
			</ul>
       </div>*/