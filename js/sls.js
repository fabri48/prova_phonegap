


$(document).ready(function(){
        //function showElem(){
            var data = {action: "sls"};
            var i;
            $.ajax({
                method: "GET",
                url: "http://provaphonegapfabri.altervista.org/php/sls.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                        var immagini = JSON.parse(data);
                    var el="";
                        console.log(immagini.length);
                                    for(var i=0 ; i<immagini.length; i++){
                            el+='<a href="'+immagini[i].INDIRIZZO+'"><img src="'+immagini[i].IMMAGINE+'" class="container-fluid centrato corpo imm" alt="Placeholder image"></a>';
                        }
                    console.log(el);
                    $("#immagini").html(el);
                    },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            });
   // }
   // showElem();
});