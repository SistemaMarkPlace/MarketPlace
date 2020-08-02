import { Component, OnInit } from '@angular/core';
import {Path}   from '../../../config';
import { OwlCarouselConfig, CarouselNavigation, SlickConfig, ProductLightbox, CountDown, Rating, ProgressBar } from '../../../functions';

import { ProductsService } from '../../../services/products.service';
import { SalesService } from '../../../services/sales.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-home-hot-today',
  templateUrl: './home-hot-today.component.html',
  styleUrls: ['./home-hot-today.component.css']
})
export class HomeHotTodayComponent implements OnInit {

 	 path:String = Path.url;	
	indexes:Array<any> = [];
	products:Array<any> = [];
	render:Boolean = true;
	cargando:Boolean = false;
	topSales:Array<any> = [];
	topSalesBlock:Array<any> = [];
	renderBestSeller:Boolean = true;
  

   	constructor(private productsService: ProductsService,
  		        private salesService: SalesService) { }

  	ngOnInit(): void {
		this.cargando=true;

		let getProducts=[];
		let hoy=new Date();
		let fechaOferta=null;
		/*Tomamos data de los productos */

		this.productsService.getData()
		.subscribe(resp=>{

			// console.log("resp",resp)
	
			/* recorremos cada producto para separar las ofertas y el stock*/	

			let i;
			for(i in resp){
				getProducts.push({
					"offer":JSON.parse(resp[i].offer),
					"stock":JSON.parse(resp[i].stock),
				})
				// console.log(getProducts);
				this.products.push(resp[i]);
			}
			/*Recorremos cada oferta y stock para clasificar las ofertas actuales y los productos que si tengan stock */

			for(i in getProducts){
				fechaOferta=new Date(
					
					parseInt(getProducts[i]["offer"][2].split("-")[0]),
					parseInt(getProducts[i]["offer"][2].split("-")[1])-1,
					parseInt(getProducts[i]["offer"][2].split("-")[2])

				);
				// console.log(Date());
				// console.log(fechaOferta)
				// getProducts[i]["offer"][2]

				if (hoy<fechaOferta && getProducts[i]["stock"]>0) {
					this.indexes.push(i);
					// console.log(this.indexes)
					/*Cargar el preloat */
					this.cargando=false;
				}


			}


		})

	}
	/**creamos el renderisado de angular */

	callback(){

		if(this.render){

			this.render = false;
				/*Seleccionamos los elementos de la galeria mix */
				let galleryMix_1 = $(".galleryMix_1");
				let galleryMix_2 = $(".galleryMix_2");
				let galleryMix_3 = $(".galleryMix_3");
				/*elementos de pferta */
				let offer_1 = $(".offer_1");
				let offer_2 = $(".offer_2");
				let offer_3 = $(".offer_3");
				/*elementos de reseñlas */
				let review_1 = $(".review_1");
				let review_2 = $(".review_2");
				let review_3 = $(".review_3");
				
				/*recorremos todos los indices de producto */
				
				for(let i=0;i<galleryMix_1.length;i++){

						/*recorremos todos las fotografias de la galeria de cada producto */
						for (let f= 0 ; f < JSON.parse($(galleryMix_1[i]).attr("gallery")).length ; f++) {

							/*Imagenes grandes */
							$(galleryMix_2[i]).append(
							`
								<div class="item">
									<a href="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
										<img src="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}" >
									</a>
								</div>
							`)
							$(galleryMix_3[i]).append(
							`
								<div class="item">
									<img src="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}" >
								</div>
							`)
								
							
						}
							/*Capturamos el array de ofertas de cada prodcuto */
				
				             let offer= JSON.parse($(offer_1[i]).attr("offer"));
				             /*capturamos el precio de cada prodcuto */
             
				             let price=Number($(offer_1[i]).attr("price"));
				             /*Preguntar si hay descuento */
				             if(offer[0]=="Disccount"){
			             
				             	$(offer_1[i]).html(
             
				             		`<span>Save <br> S/.${(price * offer[1]/100).toFixed(2) }</span>`
             
				             	)
             
				             	$(offer_2[i]).html(`S/.${(price-(price * offer[1]/100)).toFixed(2)}`)	
             
				             }
				             /*preguntamos si es precio fijo */
				             if(offer[0] == "Fixed"){
             
				             	$(offer_1[i]).html(
             
				             		`<span>Save <br> S/.${(price-offer[1]).toFixed(2) }</span>`
             
				             	)
             
				             	$(offer_2[i]).html(`S/.${offer[1]}`)	
             
				             }
				             /*DESCONTANDO FECHA AL CONTADOR */
             
				             $(offer_3[i]).attr("data-time",
				             	
				                      new Date(
				                      	
				                      	     parseInt(offer[2].split("-")[0]),
				                      	     parseInt(offer[2].split("-")[1])-1,
				                      	     parseInt(offer[2].split("-")[2])
                      
				                      		)
				                      	
									  )
							/**calculamos las reseñas */
							let totalReview=0;

							for (let f= 0 ; f < JSON.parse($(review_1[i]).attr("reviews")).length ; f++) {

								totalReview+=Number(JSON.parse($(review_1[i]).attr("reviews"))[f]["review"])
							}
								/*Imprimimos el total de las calificaciones por cada producto */
								let rating=Math.round(totalReview/JSON.parse($(review_1[i]).attr("reviews")).length);
								// console.log(rating)

							$(review_3[i]).html(rating);

							for(let f=1;f<=5;f++){

								$(review_2[i]).append(
									`<option value="2">${f}</option>`

								)
								if (rating==f) {
									$(review_2[i]).children('option').val(1)
									
								}


							}

							// if (rating==0) {
								
							// 	$(review_2[i]).html(
	
							// 		`  <option value="2">1</option>
							// 		   <option value="2">2</option>
							// 		   <option value="2">3</option>
							// 		   <option value="2">4</option>                                                            
							// 		   <option value="2">5</option> `
							// 	);

							// }
							// if (rating==1) {
								
							// 	$(review_2[i]).html(
	
							// 		`  <option value="1">1</option>
							// 		   <option value="2">2</option>
							// 		   <option value="2">3</option>
							// 		   <option value="2">4</option>                                                            
							// 		   <option value="2">5</option> `
							// 	);

							// }



             
				}


				/*Ejecutando las variables globales de las galerias */
			OwlCarouselConfig.fnc();
			CarouselNavigation.fnc();
			SlickConfig.fnc();
			ProductLightbox.fnc();
			

			/*Selecciona del dom de los elementos de oferta */
			// let offer_1 = $(".offer_1");
			// let offer_2 = $(".offer_2");
			// let offer_3 = $(".offer_3");
			/*recorremos todos los indices de prodcuto */

			// for (let i = 0 ; i < offer_1.length ; i++) {

			
			CountDown.fnc();
			Rating.fnc();
			ProgressBar.fnc();
					/*Seleccionamos los elementos de la reseña */
					// let review_1 = $(".review_1");
					// let review_2 = $(".review_2");
					// let review_3 = $(".review_3");
					/*recorremos los indices */


				
			// }
		}

	}


}

