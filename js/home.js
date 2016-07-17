$(document).ready(function(){
            var data = {action: "promozione"};
            var i;
            $.ajax({
                type: "GET",
                url: "http://provaphonegapfabri.altervista.org/php/home.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                    console.log(data);
                    var dati = JSON.parse(data);
                    
                    var el="";
                    for(var i=0; i<dati.length; i++){
                        if(dati[i].TIPO=="TARIFFE"){
                            el+='<div class="portfolio tariffe" data-cat="tariffe"><div class="portfolio-wrapper" ><img src="'+dati[i].FOTO+'"><div class="label"><div class="label-text"><a class="text-title" href="tariffaUnica.html?id=0" >'+dati[i].NOME+' </a><span class="text-category">'+dati[i].PREZZO+' </span></div><div class="label-bg"></div></div></div></div>';
                        }
                        if(dati[i].TIPO=="PRODOTTI"){
                            el+='<div class="portfolio prodotti" data-cat="prodotti"><div class="portfolio-wrapper"><img src="'+dati[i].FOTO+'"><div class="label"><div class="label-text"><a class="text-title" href="prodottoUnico.html?codice='+dati[i].CODICE+'">'+dati[i].NOME+'</a><span class="text-category">'+dati[i].PREZZO+'</span></div><div class="label-bg"></div></div></div></div>';
                        }
                        if(dati[i].TIPO=="SLS"){
                            el+='<div class="portfolio sls" data-cat="sls"><div class="portfolio-wrapper"><img src="'+dati[i].FOTO+'"><div class="label"><div class="label-text"><a class="text-title" href="slsUnico.html?codice='+dati[i].CODICE+'">'+dati[i].NOME+'</a><span class="text-category">'+dati[i].PREZZO+'</span></div><div class="label-bg"></div></div></div></div>';
                        }
                    }
                    $("#portfoliolist").html(el);
                    
                        
                    },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            });
            $("#tutto").trigger("click");
            $("#tutto").trigger("click");
});