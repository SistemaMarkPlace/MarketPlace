import { Component, OnInit } from '@angular/core';
import{Path} from '../../config.js';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {

  path:String=Path.url;
  top_banner:object=null;
  preload:Boolean=false;

  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {

    this.preload=true;

    this.productsService.getData().subscribe(resp=>{
      
      // console.log("resp",resp[Object.keys(resp)[1]]);

      /*Tomar la longitud del objeto */

      let i;
      let size=0;
      for (i in resp) {        
        size++        
      }

      /*Generar numero aleatorio */

      let index=Math.floor(Math.random()*size);

      // console.log("index",index);
      // console.log("size",size);
      
      /*Devolvemos la vistaa */

      this.top_banner=JSON.parse(resp[Object.keys(resp)[index]].top_banner);;

      // console.log(this.top_banner)
      this.preload=false;

    })

  }


}
