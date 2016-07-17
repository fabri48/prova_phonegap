$(document).ready(function(){
            var data = {action: "tariffe"};
            var i;
            $.ajax({
                method: "GET",
                url: "http://provaphonegapfabri.altervista.org/php/tariffe.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                        var immagini = JSON.parse(data);
                    var el="";
                    for(var i=0 ; i<immagini.length; i++){
                        if(i%2 == 0){
                            el+='<div class="row">';
                        }
                        el+='<div class="col-md-3"><img src="'+immagini[i].IMMAGINE+'" class="container-fluid centrato corpo imm" alt="Placeholder image"></div><div class="col-md-3"><a href="categoria_tar.html?codice='+immagini[i].CODICE+'" class="textlinear">'+immagini[i].SUBCAT+'</a></div>';
                        if(i%2 != 0){
                            el+='</div>';
                        }
                        
                    }
                    $("#immagini").html(el);
                },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            });
   
});