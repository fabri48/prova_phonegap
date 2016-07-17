$(document).ready(function(){
            var data = {action: "sls"};
            var i;
            $.ajax({
                method: "GET",
                url: "http://provaphonegapfabri.altervista.org/php/sls_intrattenimento.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                        var immagini = JSON.parse(data);
                    var el="";
                    for(var i=0 ; i<immagini.length; i++){
                        
                        el+='<a href="slsUnico.html?codice='+immagini[i].CODICE+'"><img src="'+immagini[i].FOTOGRUPPO+'" class="container-fluid centrato corpo imm"></a>';
                        
                        
                    }
                    console.log(el);
                    $("#immagini").html(el);
                    },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            });
   
});