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
				}


				/*Ejecutando las variables globales de las galerias */
			OwlCarouselConfig.fnc();
			CarouselNavigation.fnc();
			SlickConfig.fnc();
			ProductLightbox.fnc();
			

			/*Selecciona del dom de los elementos de oferta */
			let offer_1 = $(".offer_1");
			let offer_2 = $(".offer_2");
			let offer_3 = $(".offer_3");
			/*recorremos todos los indices de prodcuto */

			for (let i = 0 ; i < offer_1.length ; i++) {

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

				CountDown.fnc();

				
			}
		}

	}

}
