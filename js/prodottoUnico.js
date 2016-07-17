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


    var nameProd="";
    var priceProd="";
    var dati=recuperaVariabili();
    var data=dati;
    
            console.log(data);
            var i;
            $.ajax({
                method: "GET",
                url: "http://provaphonegapfabri.altervista.org/php/prodottoUnico.php",
                crossDomain: true,
                cache: false,
                data: data,
                //dataType: 'json',
                success: function (data){
                        var prodotto = JSON.parse(data);
                        var scheda="<tbody>";
                        var titolo="";
                        var descbreve="";
                        var tariffacons='<desc> Tariffa consigliata:</desc><br><table width="100%" border="1" cellpadding="1" id="tarconsigliata"><tbody>';
                        var slscons="";
                        var imgbig='';
                        var imgsmall='<ul id="tab-container-1-nav">';
                        var colore='';
                        var prezzo='';
                        if(prodotto){
                        titolo+=prodotto[0].PRODOTTO;
                        prezzo+='<desc>'+prodotto[0].PREZZO+'</desc>';
                        var descbreve2=prodotto[0].DPR.split("\n");
                        for (var j=0; j<descbreve2.length; j++){
                            descbreve+='<el><li>'+descbreve2[j]+'</li></el>';
                        }
                        priceProd+=prodotto[0].PREZZO.replace(" €", "");
                        nameProd+= prodotto[0].PRODOTTO;
                        $(".product-description").attr("prezzo", priceProd);
                        $(".product-description").attr("nome", prodotto[0].PRODOTTO);
                        
                        
                        tariffacons+='<tr><th id="titolotab" scope="col">'+prodotto[0].NOME+'</th><br></tr>';
                        var tariffacons2=prodotto[0].DESBR.split("\n");
                            
                        for (var l=0; l<tariffacons2.length; l++){
                            tariffacons+='<tr><td class="lista">'+tariffacons2[l]+'</td></tr>';
                            
                        }
                            
                        tariffacons+='</table></tbody><br><a href="tariffe_consigliate.html?codice='+prodotto[0].CODICE+'">Altre tariffe consigliate</a>';
                            
                        slscons+='<desc>Servizio SmartLife consigliato:</desc><img class="container-fluid span-5" id="slsconsigliato" src="'+prodotto[0].FOTOGRUPPO+'" alt="TIM MUSIC"><a href="sls_consigliati.html?codice='+prodotto[0].CODICE+'">Altri servizi consigliati </a>';
   					    
                        
                        var foto=new Array();
                        var coloriTutti=new Array();
                            
                        for(var k=0; k<prodotto.length; k++){
                            if($.inArray(prodotto[k].FOTO, foto)<0){
                                foto.push(prodotto[k].FOTO);
                            }
                            if($.inArray(prodotto[k].COLORE, coloriTutti)<0){
                                coloriTutti.push(prodotto[k].COLORE);
                            }
                        }
                        console.log(coloriTutti);
                            
                        for(var i=0 ; i<foto.length; i++){
                            var n= i+1;
                            var str=n.toString();
                            if(i==0){
                                imgbig+='<div class="tab" id="tab'+str+'" style="display: block;"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="'+foto[i]+'" alt="" /></a></div>';
                                imgsmall+='<li class="active"><a href="#tab'+str+'" class="active"><img class="thumbs" src="'+foto[i]+'" alt=""/></a></li>';
                            }
                            else{
                                imgbig+='<div class="tab" id="tab'+str+'" style="display: none;"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="'+foto[i]+'" alt="" /></a></div>';
                                imgsmall+='<li class><a href="#tab'+str+'" class><img class="thumbs" src="'+foto[i]+'" alt=""/></a></li>';
                            }
                        }
                        for(i=0; i<coloriTutti.length; i++){
                            if(i==0){
                                colore+='<a id="colore" class="container-fluid">Colore:</a><div id="colore1" class="container-fluid circle" style="background-color:'+coloriTutti[i]+'"></div>';
                            }
                            else{
                                colore+='<div id="colore2" class="container-fluid circle" style="background-color:'+coloriTutti[i]+'"></div><a id="linkscheda" href="#scheda" class="container-fluid" > Scheda tecnica</a>';
                            }  
                        }
                        
                        
                        imgsmall+='</ul>';
                        imgbig+=imgsmall;
                        
                        //console.log(el);
                            
                        if(prodotto[0].CONNETTIVITA){
                            scheda+='<tr><td class="tabfont">Connettività</td><td class="divide">'+prodotto[0].CONNETTIVITA+'</td></tr>';
                        }
                        if(prodotto[0].SISTEMA){
                            scheda+='<tr><td class="tabfont">Sistema</td><td class="divide">'+prodotto[0].SISTEMA+'</td></tr>';
                        }
                        if(prodotto[0].GPS){
                            scheda+='<tr><td class="tabfont">GPS</td><td class="divide">'+prodotto[0].GPS+'</td></tr>';
                        }
                        if(prodotto[0].DISPLAY){
                            scheda+='<tr><td class="tabfont">Display</td><td class="divide">'+prodotto[0].DISPLAY+'</td></tr>';
                        }
                        if(prodotto[0].FOTOCAMERA){
                            scheda+='<tr><td class="tabfont">Fotocamera</td><td class="divide">'+prodotto[0].FOTOCAMERA+'</td></tr>';
                        }
                        if(prodotto[0].MEMINTERNA){
                            scheda+='<tr><td class="tabfont">Memoria Interna</td><td class="divide">'+prodotto[0].MEMINTERNA+'</td></tr>';
                        }
                        if(prodotto[0].PROCESSORE){
                            scheda+='<tr><td class="tabfont">Processore</td><td class="divide">'+prodotto[0].PROCESSORE+'</td></tr>';
                        }
                        if(prodotto[0].SIM){
                            scheda+='<tr><td class="tabfont">SIM</td><td class="divide">'+prodotto[0].SIM+'</td></tr>';
                        }
                        if(prodotto[0].FORMSUPP){
                            scheda+='<tr><td class="tabfont">Formati supportati</td><td class="divide">'+prodotto[0].FORMSUPP+'</td></tr>';
                        }
                        if(prodotto[0].VIDEO){
                            scheda+='<tr><td class="tabfont">Video</td><td class="divide">'+prodotto[0].VIDEO+'</td></tr>';
                        }
                        if(prodotto[0].MUSICA){
                            scheda+='<tr><td class="tabfont">Musica</td><td class="divide">'+prodotto[0].MUSICA+'</td></tr>';
                        }
                        if(prodotto[0].DOTAZIONE){
                            scheda+='<tr><td class="tabfont">Dotazione</td><td class="divide">'+prodotto[0].DOTAZIONE+'</td></tr>';
                        }
                        if(prodotto[0].DIMENSIONI){
                            scheda+='<tr><td class="tabfont">Dimensioni</td><td class="divide">'+prodotto[0].DIMENSIONI+'</td></tr>';
                        }
                        if(prodotto[0].PESO){
                            scheda+='<tr><td class="tabfont">Peso</td><td class="divide">'+prodotto[0].PESO+'</td></tr>';
                        }
                        if(prodotto[0].AUTONOMIA){
                            scheda+='<tr><td class="tabfont">Autonomia</td><td class="divide">'+prodotto[0].AUTONOMIA+'</td></tr>';
                        }
                        if(prodotto[0].CONFEZIONE){
                            scheda+='<tr><td class="tabfont">Confezione</td><td class="divide">'+prodotto[0].CONFEZIONE+'</td></tr>';
                        }
                        if(prodotto[0].APPLICAZIONI){
                            scheda+='<tr><td class="tabfont">Applicazioni</td><td class="divide">'+prodotto[0].APPLICAZIONI+'</td></tr>';
                        }
                        if(prodotto[0].NOTE){
                            scheda+='<tr><td class="tabfont">Note</td><td class="divide">'+prodotto[0].NOTE+'</td></tr>';
                        }
                        scheda+='</tbody>';
                            
                        $("#galleria").html(imgbig);
                        $("#prezzo").html(prezzo);
                        $("#tariffacons").html(tariffacons);
                        $("#desbreve").html(descbreve);
                        $("#titolo").html(titolo);
                        $("#slscons").html(slscons);
                        $("#scheda").html(scheda);
                        $("#coloretutto").html(colore);
                        
                        
                        
                    }
                    else {
                        titolo+="INFORMAZIONI NON DISPONIBILI";
                        $("#titolo").html(titolo);
                    }
                    
                },
                error: function(){
                    alert("Si e' verificato un errore");
                }
            }).done(function(){
                console.log(nameProd);
                var tabber1 = new Yetii({
                    id: 'tab-container-1'
                });
                
                
	$.Shop = function( element ) {
		this.$element = $( element );
		this.init();
	};
	
	$.Shop.prototype = {
		init: function(name, price) {
		
		    // Properties
		
			this.cartPrefix = "winery-"; // Prefix string to be prepended to the cart's name in the session storage
			this.cartName = this.cartPrefix + "cart"; // Cart name in the session storage
			this.shippingRates = this.cartPrefix + "shipping-rates"; // Shipping rates key in the session storage
			this.total = this.cartPrefix + "total"; // Total key in the session storage
			this.storage = sessionStorage; // shortcut to the sessionStorage object
			
			
			this.$formAddToCart = this.$element.find( "form.add-to-cart" ); // Forms for adding items to the cart
			this.$formCart = this.$element.find( "#shopping-cart" ); // Shopping cart form
			this.$checkoutCart = this.$element.find( "#checkout-cart" ); // Checkout form cart
			this.$checkoutOrderForm = this.$element.find( "#checkout-order-form" ); // Checkout user details form
			this.$shipping = this.$element.find( "#sshipping" ); // Element that displays the shipping rates
			this.$subTotal = this.$element.find( "#stotal" ); // Element that displays the subtotal charges
			this.$shoppingCartActions = this.$element.find( "#shopping-cart-actions" ); // Cart actions links
			this.$updateCartBtn = this.$shoppingCartActions.find( "#update-cart" ); // Update cart button
			this.$emptyCartBtn = this.$shoppingCartActions.find( "#empty-cart" ); // Empty cart button
			this.$userDetails = this.$element.find( "#user-details-content" ); // Element that displays the user information
			//this.$paypalForm = this.$element.find( "#paypal-form" ); // PayPal form
			
			
			this.currency = "&euro;"; // HTML entity of the currency to be displayed in the layout
			this.currencyString = "€"; // Currency symbol as textual string
			//this.paypalCurrency = "EUR"; // PayPal's currency code
			//this.paypalBusinessEmail = "yourbusiness@email.com"; // Your Business PayPal's account email address
			//this.paypalURL = "https://www.sandbox.paypal.com/cgi-bin/webscr"; // The URL of the PayPal's form
			
			// Object containing patterns for form validation
			this.requiredFields = {
				expression: {
					value: /^([\w-\.]+)@((?:[\w]+\.)+)([a-z]){2,4}$/
				},
				
				str: {
					value: ""
				}
				
			};
			
			// Method invocation
			
			this.createCart();
			this.handleAddToCartForm();
			this.handleCheckoutOrderForm();
			this.emptyCart();
			this.updateCart();
			this.displayCart();
			this.deleteProduct();
			this.displayUserDetails();
			//this.populatePayPalForm();
			
			
		},
		
		// Public methods
		
		// Creates the cart keys in the session storage
		
		createCart: function() {
			if( this.storage.getItem( this.cartName ) == null ) {
			
				var cart = {};
				cart.items = [];
			
				this.storage.setItem( this.cartName, this._toJSONString( cart ) );
				this.storage.setItem( this.shippingRates, "0" );
				this.storage.setItem( this.total, "0" );
			}
		},
		
		// Appends the required hidden values to the PayPal's form before submitting
		
		/*populatePayPalForm: function() {
			var self = this;
			if( self.$paypalForm.length ) {
				var $form = self.$paypalForm;
				var cart = self._toJSONObject( self.storage.getItem( self.cartName ) );
				var shipping = self.storage.getItem( self.shippingRates );
				var numShipping = self._convertString( shipping );
				var cartItems = cart.items; 
				var singShipping = Math.floor( numShipping / cartItems.length );
				
				$form.attr( "action", self.paypalURL );
				$form.find( "input[name='business']" ).val( self.paypalBusinessEmail );
				$form.find( "input[name='currency_code']" ).val( self.paypalCurrency );
				
				for( var i = 0; i < cartItems.length; ++i ) {
					var cartItem = cartItems[i];
					var n = i + 1;
					var name = cartItem.product;
					var price = cartItem.price;
					var qty = cartItem.qty;
					
					$( "<div/>" ).html( "<input type='hidden' name='quantity_" + n + "' value='" + qty + "'/>" ).
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='item_name_" + n + "' value='" + name + "'/>" ).
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='item_number_" + n + "' value='SKU " + name + "'/>" ).
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='amount_" + n + "' value='" + self._formatNumber( price, 2 ) + "'/>" ).
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='shipping_" + n + "' value='" + self._formatNumber( singShipping, 2 ) + "'/>" ).
					insertBefore( "#paypal-btn" );
					
				}
				
				
				
			}
		},*/
		
		// Displays the user's information
		
		displayUserDetails: function() {
			if( this.$userDetails.length ) {
				if( this.storage.getItem( "shipping-name" ) == null ) {
					var name = this.storage.getItem( "billing-name" );
					var email = this.storage.getItem( "billing-email" );
					var city = this.storage.getItem( "billing-city" );
					var address = this.storage.getItem( "billing-address" );
					var zip = this.storage.getItem( "billing-zip" );
					var country = this.storage.getItem( "billing-country" );
					
					var html = "<div class='detail'>";
						html += "<h2>Billing and Shipping</h2>";
						html += "<ul>";
						html += "<li>" + name + "</li>";
						html += "<li>" + email + "</li>";
						html += "<li>" + city + "</li>";
						html += "<li>" + address + "</li>";
						html += "<li>" + zip + "</li>";
						html += "<li>" + country + "</li>";
						html += "</ul></div>";
						
					this.$userDetails[0].innerHTML = html;
				} else {
					var name = this.storage.getItem( "billing-name" );
					var email = this.storage.getItem( "billing-email" );
					var city = this.storage.getItem( "billing-city" );
					var address = this.storage.getItem( "billing-address" );
					var zip = this.storage.getItem( "billing-zip" );
					var country = this.storage.getItem( "billing-country" );
					
					var sName = this.storage.getItem( "shipping-name" );
					var sEmail = this.storage.getItem( "shipping-email" );
					var sCity = this.storage.getItem( "shipping-city" );
					var sAddress = this.storage.getItem( "shipping-address" );
					var sZip = this.storage.getItem( "shipping-zip" );
					var sCountry = this.storage.getItem( "shipping-country" );
					
					var html = "<div class='detail'>";
						html += "<h2>Billing</h2>";
						html += "<ul>";
						html += "<li>" + name + "</li>";
						html += "<li>" + email + "</li>";
						html += "<li>" + city + "</li>";
						html += "<li>" + address + "</li>";
						html += "<li>" + zip + "</li>";
						html += "<li>" + country + "</li>";
						html += "</ul></div>";
						
						html += "<div class='detail right'>";
						html += "<h2>Shipping</h2>";
						html += "<ul>";
						html += "<li>" + sName + "</li>";
						html += "<li>" + sEmail + "</li>";
						html += "<li>" + sCity + "</li>";
						html += "<li>" + sAddress + "</li>";
						html += "<li>" + sZip + "</li>";
						html += "<li>" + sCountry + "</li>";
						html += "</ul></div>";
						
					this.$userDetails[0].innerHTML = html;	
				
				}
			}
		},

		// Delete a product from the shopping cart

		deleteProduct: function() {
			var self = this;
			if( self.$formCart.length ) {
				var cart = this._toJSONObject( this.storage.getItem( this.cartName ) );
				var items = cart.items;

				$( document ).on( "click", ".pdelete a", function( e ) {
					e.preventDefault();
					var productName = $( this ).data( "product" );
					var newItems = [];
					for( var i = 0; i < items.length; ++i ) {
						var item = items[i];
						var product = item.product;	
						if( product == productName ) {
							items.splice( i, 1 );
						}
					}
					newItems = items;
					var updatedCart = {};
					updatedCart.items = newItems;

					var updatedTotal = 0;
					var totalQty = 0;
					if( newItems.length == 0 ) {
						updatedTotal = 0;
						totalQty = 0;
					} else {
						for( var j = 0; j < newItems.length; ++j ) {
							var prod = newItems[j];
							var sub = prod.price * prod.qty;
							updatedTotal += sub;
							totalQty += prod.qty;
						}
					}

					self.storage.setItem( self.total, self._convertNumber( updatedTotal ) );
					self.storage.setItem( self.shippingRates, self._convertNumber( self._calculateShipping( totalQty ) ) );

					self.storage.setItem( self.cartName, self._toJSONString( updatedCart ) );
					$( this ).parents( "tr" ).remove();
					self.$subTotal[0].innerHTML = self.currency + " " + self.storage.getItem( self.total );
				});
			}
		},
		
		// Displays the shopping cart
		
		displayCart: function() {
			if( this.$formCart.length ) {
				var cart = this._toJSONObject( this.storage.getItem( this.cartName ) );
				var items = cart.items;
				var $tableCart = this.$formCart.find( ".shopping-cart" );
				var $tableCartBody = $tableCart.find( "tbody" );

				if( items.length == 0 ) {
					$tableCartBody.html( "" );	
				} else {
				
				
					for( var i = 0; i < items.length; ++i ) {
						var item = items[i];
						var product = item.product;
						var price = this.currency + " " + item.price;
						var qty = item.qty;
						var html = "<tr><td class='pname'>" + product + "</td>" + "<td class='pqty'><input type='text' value='" + qty + "' class='qty'/></td>";
					    	html += "<td class='pprice'>" + price + "</td><td class='pdelete'><a href='' data-product='" + product + "'>&times;</a></td></tr>";
					
						$tableCartBody.html( $tableCartBody.html() + html );
					}

				}

				if( items.length == 0 ) {
					this.$subTotal[0].innerHTML = this.currency + " " + 0.00;
				} else {	
				
					var total = this.storage.getItem( this.total );
					this.$subTotal[0].innerHTML = this.currency + " " + total;
				}
			} else if( this.$checkoutCart.length ) {
				var checkoutCart = this._toJSONObject( this.storage.getItem( this.cartName ) );
				var cartItems = checkoutCart.items;
				var $cartBody = this.$checkoutCart.find( "tbody" );

				if( cartItems.length > 0 ) {
				
					for( var j = 0; j < cartItems.length; ++j ) {
						var cartItem = cartItems[j];
						var cartProduct = cartItem.product;
						var cartPrice = this.currency + " " + cartItem.price;
						var cartQty = cartItem.qty;
						var cartHTML = "<tr><td class='pname'>" + cartProduct + "</td>" + "<td class='pqty'>" + cartQty + "</td>" + "<td class='pprice'>" + cartPrice + "</td></tr>";
					
						$cartBody.html( $cartBody.html() + cartHTML );
					}
				} else {
					$cartBody.html( "" );	
				}

				if( cartItems.length > 0 ) {
				
					var cartTotal = this.storage.getItem( this.total );
					var cartShipping = this.storage.getItem( this.shippingRates );
					var subTot = this._convertString( cartTotal ) + this._convertString( cartShipping );
				
					this.$subTotal[0].innerHTML = this.currency + " " + this._convertNumber( subTot );
					this.$shipping[0].innerHTML = this.currency + " " + cartShipping;
				} else {
					this.$subTotal[0].innerHTML = this.currency + " " + 0.00;
					this.$shipping[0].innerHTML = this.currency + " " + 0.00;	
				}
			
			}
		},
		
		// Empties the cart by calling the _emptyCart() method
		// @see $.Shop._emptyCart()
		
		emptyCart: function() {
			var self = this;
			if( self.$emptyCartBtn.length ) {
				self.$emptyCartBtn.on( "click", function() {
					self._emptyCart();
				});
			}
		},
		
		// Updates the cart
		
		updateCart: function() {
			var self = this;
		  if( self.$updateCartBtn.length ) {
			self.$updateCartBtn.on( "click", function() {
				var $rows = self.$formCart.find( "tbody tr" );
				var cart = self.storage.getItem( self.cartName );
				var shippingRates = self.storage.getItem( self.shippingRates );
				var total = self.storage.getItem( self.total );
				
				var updatedTotal = 0;
				var totalQty = 0;
				var updatedCart = {};
				updatedCart.items = [];
				
				$rows.each(function() {
					var $row = $( this );
					var pname = $.trim( $row.find( ".pname" ).text() );
					var pqty = self._convertString( $row.find( ".pqty > .qty" ).val() );
					var pprice = self._convertString( self._extractPrice( $row.find( ".pprice" ) ) );
					
					var cartObj = {
						product: pname,
						price: pprice,
						qty: pqty
					};
					
					updatedCart.items.push( cartObj );
					
					var subTotal = pqty * pprice;
					updatedTotal += subTotal;
					totalQty += pqty;
				});
				
				self.storage.setItem( self.total, self._convertNumber( updatedTotal ) );
				self.storage.setItem( self.shippingRates, self._convertNumber( self._calculateShipping( totalQty ) ) );
				self.storage.setItem( self.cartName, self._toJSONString( updatedCart ) );
				
			});
		  }
		},
		
		// Adds items to the shopping cart
		
		handleAddToCartForm: function() {
			var self = this;
			self.$formAddToCart.each(function() {
				var $form = $( this );
				var $product = $form.parent();
                console.log($product);
				var price = priceProd;
				var name =  nameProd;
                console.log(name);
				
				$form.on( "submit", function() {
					var qty = self._convertString( $form.find( ".qty" ).val() );
					var subTotal = qty * price;
					var total = self._convertString( self.storage.getItem( self.total ) );
					var sTotal = total + subTotal;
					self.storage.setItem( self.total, sTotal );
					self._addToCart({
						product: nameProd,
						price: priceProd,
						qty: qty
					});
					var shipping = self._convertString( self.storage.getItem( self.shippingRates ) );
					var shippingRates = self._calculateShipping( qty );
					var totalShipping = shipping + shippingRates;
					
					self.storage.setItem( self.shippingRates, totalShipping );
				});
			});
		},
		
		// Handles the checkout form by adding a validation routine and saving user's info into the session storage
		
		handleCheckoutOrderForm: function() {
			var self = this;
			if( self.$checkoutOrderForm.length ) {
				var $sameAsBilling = $( "#same-as-billing" );
				$sameAsBilling.on( "change", function() {
					var $check = $( this );
					if( $check.prop( "checked" ) ) {
						$( "#fieldset-shipping" ).slideUp( "normal" );
					} else {
						$( "#fieldset-shipping" ).slideDown( "normal" );
					}
				});
				
				self.$checkoutOrderForm.on( "submit", function() {
					var $form = $( this );
					var valid = self._validateForm( $form );
					
					if( !valid ) {
						return valid;
					} else {
						self._saveFormData( $form );
					}
				});
			}
		},
		
		// Private methods
		
		
		// Empties the session storage
		
		_emptyCart: function() {
			this.storage.clear();
		},
		
		/* Format a number by decimal places
		 * @param num Number the number to be formatted
		 * @param places Number the decimal places
		 * @returns n Number the formatted number
		 */
		 
		 
		
		_formatNumber: function( num, places ) {
			var n = num.toFixed( places );
			return n;
		},
		
		/* Extract the numeric portion from a string
		 * @param element Object the jQuery element that contains the relevant string
		 * @returns price String the numeric string
		 */
		
		
		_extractPrice: function( element ) {
			var self = this;
			var text = element.text();
			var price = text.replace( self.currencyString, "" ).replace( " ", "" );
			return price;
		},
		
		/* Converts a numeric string into a number
		 * @param numStr String the numeric string to be converted
		 * @returns num Number the number
		 */
		
		_convertString: function( numStr ) {
			var num;
			if( /^[-+]?[0-9]+\.[0-9]+$/.test( numStr ) ) {
				num = parseFloat( numStr );
			} else if( /^\d+$/.test( numStr ) ) {
				num = parseInt( numStr, 10 );
			} else {
				num = Number( numStr );
			}
			
			if( !isNaN( num ) ) {
				return num;
			} else {
				console.warn( numStr + " cannot be converted into a number" );
				return false;
			}
		},
		
		/* Converts a number to a string
		 * @param n Number the number to be converted
		 * @returns str String the string returned
		 */
		
		_convertNumber: function( n ) {
			var str = n.toString();
			return str;
		},
		
		/* Converts a JSON string to a JavaScript object
		 * @param str String the JSON string
		 * @returns obj Object the JavaScript object
		 */
		
		_toJSONObject: function( str ) {
			var obj = JSON.parse( str );
			return obj;
		},
		
		/* Converts a JavaScript object to a JSON string
		 * @param obj Object the JavaScript object
		 * @returns str String the JSON string
		 */
		
		
		_toJSONString: function( obj ) {
			var str = JSON.stringify( obj );
			return str;
		},
		
		
		/* Add an object to the cart as a JSON string
		 * @param values Object the object to be added to the cart
		 * @returns void
		 */
		
		
		_addToCart: function( values ) {
			var cart = this.storage.getItem( this.cartName );
			
			var cartObject = this._toJSONObject( cart );
			var cartCopy = cartObject;
			var items = cartCopy.items;
			items.push( values );
			
			this.storage.setItem( this.cartName, this._toJSONString( cartCopy ) );
		},
		
		/* Custom shipping rates calculation based on the total quantity of items in the cart
		 * @param qty Number the total quantity of items
		 * @returns shipping Number the shipping rates
		 */
		
		_calculateShipping: function( qty ) {
			var shipping = 0;
			if( qty >= 6 ) {
				shipping = 10;
			}
			if( qty >= 12 && qty <= 30 ) {
				shipping = 20;	
			}
			
			if( qty >= 30 && qty <= 60 ) {
				shipping = 30;	
			}
			
			if( qty > 60 ) {
				shipping = 0;
			}
			
			return shipping;
		
		},
		
		/* Validates the checkout form
		 * @param form Object the jQuery element of the checkout form
		 * @returns valid Boolean true for success, false for failure
		 */
		 
		 
		
		_validateForm: function( form ) {
			var self = this;
			var fields = self.requiredFields;
			var $visibleSet = form.find( "fieldset:visible" );
			var valid = true;
			
			form.find( ".message" ).remove();
			
		  $visibleSet.each(function() {
			
			$( this ).find( ":input" ).each(function() {
				var $input = $( this );
				var type = $input.data( "type" );
				var msg = $input.data( "message" );
				
				if( type == "string" ) {
					if( $input.val() == fields.str.value ) {
						$( "<span class='message'/>" ).text( msg ).
						insertBefore( $input );
						
						valid = false;
					}
				} else {
					if( !fields.expression.value.test( $input.val() ) ) {
						$( "<span class='message'/>" ).text( msg ).
						insertBefore( $input );
						
						valid = false;
					}
				}
				
			});
		  });
			
			return valid;
		
		},
		
		/* Save the data entered by the user in the ckeckout form
		 * @param form Object the jQuery element of the checkout form
		 * @returns void
		 */
		
		
		_saveFormData: function( form ) {
			var self = this;
			var $visibleSet = form.find( "fieldset:visible" );
			
			$visibleSet.each(function() {
				var $set = $( this );
				if( $set.is( "#fieldset-billing" ) ) {
					var name = $( "#name", $set ).val();
					var email = $( "#email", $set ).val();
					var city = $( "#city", $set ).val();
					var address = $( "#address", $set ).val();
					var zip = $( "#zip", $set ).val();
					var country = $( "#country", $set ).val();
					
					self.storage.setItem( "billing-name", name );
					self.storage.setItem( "billing-email", email );
					self.storage.setItem( "billing-city", city );
					self.storage.setItem( "billing-address", address );
					self.storage.setItem( "billing-zip", zip );
					self.storage.setItem( "billing-country", country );
				} else {
					var sName = $( "#sname", $set ).val();
					var sEmail = $( "#semail", $set ).val();
					var sCity = $( "#scity", $set ).val();
					var sAddress = $( "#saddress", $set ).val();
					var sZip = $( "#szip", $set ).val();
					var sCountry = $( "#scountry", $set ).val();
					
					self.storage.setItem( "shipping-name", sName );
					self.storage.setItem( "shipping-email", sEmail );
					self.storage.setItem( "shipping-city", sCity );
					self.storage.setItem( "shipping-address", sAddress );
					self.storage.setItem( "shipping-zip", sZip );
					self.storage.setItem( "shipping-country", sCountry );
				
				}
			});
		}
	};
	
	$(function() {
		var shop = new $.Shop( "#site" );
	});

});

            });
   





/*<div class="container-fluid content" id="gallery">
  <div class="container-fluid" id="tab-container-1" >
    <div class="container-fluid span-10" id="galleria">
      <div class="tab" id="tab1"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="images/fullsize/Agave.jpg" alt="" /></a>
      </div>
      <div class="tab" id="tab2"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="images/fullsize/Clown Fish.jpg" alt="" /></a>
      </div>
      <div class="tab" id="tab3"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="images/fullsize/Daisies.jpg" alt="" /></a>
      </div>
      <div class="tab" id="tab4"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="images/fullsize/Dandelion Seeds.jpg" alt="" /></a>
      </div>
      <div class="tab" id="tab5"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="images/fullsize/Dew Drop.jpg" alt="" /></a>
      </div>
      <div class="tab" id="tab6"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="images/fullsize/Flowing Rock.jpg" alt="" /></a>
      </div>
      <div class="tab" id="tab7"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="images/fullsize/Ladybug.jpg" alt="" /></a>
      </div>
      <div class="tab" id="tab8"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="images/fullsize/Leaf Curl.jpg" alt="" /></a>
      </div>
      <div class="tab" id="tab9"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="images/fullsize/Lotus.jpg" alt="" /></a>
      </div>
      <div class="tab" id="tab10"> <a href="javascript:tabber1.next()" title="Click to view next image"><img class="span-10" src="images/fullsize/Petals.jpg" alt="" /></a>
       
      </div>
      <!--immagini da scorrere-->
      <ul id="tab-container-1-nav">
        <li><a href="#tab1"><img class="thumbs" src="images/thumbs/Agave.jpg" alt="" /></a></li>
        <li><a href="#tab2"><img class="thumbs" src="images/thumbs/Clown Fish.jpg" alt="" /></a></li>
        <li><a href="#tab3"><img class="thumbs" src="images/thumbs/Daisies.jpg" alt="" /></a></li>
        <li><a href="#tab4"><img class="thumbs"src="images/thumbs/Dandelion Seeds.jpg" alt="" /></a></li>
        <li><a href="#tab5"><img class="thumbs" src="images/thumbs/Dew Drop.jpg" alt="" /></a></li>
        <li><a href="#tab6"><img class="thumbs"src="images/thumbs/Flowing Rock.jpg" alt="" /></a></li>
        <li><a href="#tab7"><img class="thumbs"src="images/thumbs/LadyBug.jpg" alt="" /></a></li>
        <li><a href="#tab8"><img class="thumbs"src="images/thumbs/Leaf Curl.jpg" alt="" /></a></li>
        <li><a href="#tab9"><img class="thumbs"src="images/thumbs/Lotus.jpg" alt="" /></a></li>
        <li><a href="#tab10"><img class="thumbs"src="images/thumbs/Petals.jpg" alt="" /></a></li>
      </ul>
      
    </div>
    
    <!--destra-->
    <div class="container-fluid elenco span-11 ">
         <p>Smartphone e Tablet</p>
           	<ul class="container-fluid span-9" >
               	<el ><li>CONFIGURA ONLINE</li></el>
				<el ><li>Servizi per e dal tuo smartphone</li></el>
				<el ><li>Configurare la posta</li></el>
				<el ><li>Configurazioni e manuali</li></el>
			</ul><!--si può eliminare 'li' se il data bese restituisce gli a capo, l'importante è lasciare 'el'-->
         <div class="container-fluid" style="display:inline-block; padding-bottom:5px"> 
         	<a id="colore" class="container-fluid">Colore:</a> 
            <div id="colore1" class="container-fluid circle" style="background-color:#D3C299"></div> <!--ILCOLOREDELDB--> 
            <div id="colore2" class="container-fluid circle" style="background-color:#707070"></div>
            <a id="linkscheda" href="#scheda" class="container-fluid" > Scheda tecnica</a>
        </div>
        <br>
        <br>
        <div id="centro">
        	<div class="container-fluid span-5 inline" id="prezzo">
            	<desc>PREZZO,00 &#8364;</desc>
             </div>
             <div class="container-fluid span-5 inline" id="shopbutton">
             	<button img="#" id="addtocart" class="container-fluid">Aggiungi al carrello</button>
             </div>
             <br>
             <br>
        <div id="consigli">
        	<div class="container-fluid span-5" id="tariffacons">
            <desc> Tariffa consigliata:</desc>
            <br>
            <table width="100%" border="1" cellpadding="1">
  				<tbody>
   					 <tr>
     					 <th id="titolotab" scope="col">Nome tariffa</th><br>
   					 </tr>
   					 <tr>
     				 <td>riga1</td>
    				</tr>
                    <tr>
                      <td>riga 2</td>
                    </tr>
                    <tr>
                      <td>riga 3</td>
                    </tr>
                  </tbody>
                </table>
                <br>
				<a href="#">Altre tariffe consigliati </a>
            </div>
            <div class="container-fluid span-5" id="slscons" >
            <desc>Servizio SmartLife consigliato:</desc>
            <img class="container-fluid span-5" src="images/sls/intrattenimento/logo_tim_music.jpg" alt="TIM MUSIC">
            <a href="#">Altri servizi consigliati </a>
            </div>
        </div>    
       </div>
  </div>
     </div><br><br>
  <table id="scheda" width="100%" border="0" cellspacing="10px" cellpadding="0">
  <tbody>
    <tr >
      <td class="tabfont">Caratteristica</td>
      <td class="divide">testo</td>
    </tr>
     <tr >
      <td class="tabfont">Caratteristica</td>
      <td class="divide">testo</td>
    </tr>
     <tr >
      <td class="tabfont">Caratteristica</td>
      <td class="divide">testo</td>
    </tr>
     <tr>
      <td class="tabfont">Caratteristica</td>
      <td class="divide">testo</td>
    </tr>
  </tbody>
</table>


</div>*/