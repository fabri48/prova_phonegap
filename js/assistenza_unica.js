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
                url: "http://provaphonegapfabri.altervista.org/php/assistenza_unica.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                        var assistenze = JSON.parse(data);
                    var el="";
                    var titolo="";
                    var n;
                    if(assistenze){
                        titolo+=assistenze[0].CATEGORIA;
                        for(i=0; i<assistenze.length; i++){
                            k=i+1;
                            n=k.toString();
                            if(i==0){
                                el+='<div class="accordion-section"><a class="accordion-section-title" href="#accordion-'+n+'">'+assistenze[i].DOMANDA+'</a><div id="accordion-'+n+'" class="accordion-section-content"><p>'+assistenze[i].RISPOSTA+'</p></div></div>';
                                
                            }
                            else{
                                el+='<div class="accordion-section"><a class="accordion-section-title" href="#accordion-'+n+'">'+assistenze[i].DOMANDA+'</a><div id="accordion-'+n+'" class="accordion-section-content"><p>'+assistenze[i].RISPOSTA+'</p></div></div>';
                            }
                        }
                        
                        
                        
                        //console.log(el);
                        $("#titolo").html(titolo);
                        $("#contenitore_domande").html(el);
                    }
                    else {
                        el+="INFORMAZIONI NON DISPONIBILI";
                        $("#titolo").html(el);
                    }
                    
                },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            }).done(function(){
                function close_accordion_section() {
		              jQuery('.accordion .accordion-section-title').removeClass('active');
		              jQuery('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	               }

	           jQuery('.accordion-section-title').click(function(e) {
		      // Grab current anchor value
		      var currentAttrValue = jQuery(this).attr('href');

		      if(jQuery(e.target).is('.active')) {
                  close_accordion_section();
		      }else {
			     close_accordion_section();

			     // Add active class to section title
			     jQuery(this).addClass('active');
			     // Open up the hidden content panel
			     jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		      }

		      e.preventDefault();
	           });
        });
   
});

