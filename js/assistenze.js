$(document).ready(function(){
            var data = {action: "assistenze"};
            var i;
            $.ajax({
                method: "GET",
                url: "http://provaphonegapfabri.altervista.org/php/assistenze.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                        var assistenze = JSON.parse(data);
                    var el="";
                    for(var i=0 ; i<assistenze.length; i++){
                        el+='<div class="container-fluid elenco"><a href="categoria.html?codice='+assistenze[i].CODICE+'"><p>'+assistenze[i].CATEGORIA+'</p><a/></div>';
                        if(assistenze[i].CATEGORIA == "Supporto tecnico e configurazione"){
                            el+='<br>';
                        }
                    }
                    console.log(el);
                    $("#contenitore").html(el);
                    },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            });
   
});