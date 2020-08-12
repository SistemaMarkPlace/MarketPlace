import { Component, OnInit } from '@angular/core';
import { Path} from '../../../config.js';
import {CategoriesService} from '../../../services/categories.service';
@Component({
  selector: 'app-home-top-categories',
  templateUrl: './home-top-categories.component.html',
  styleUrls: ['./home-top-categories.component.css']
})
export class HomeTopCategoriesComponent implements OnInit {

	path:String = Path.url;
  categories:Array<any>=[];
  cargando:Boolean=false;

  constructor(private categoriesService:CategoriesService) { }

  ngOnInit(): void {

    this.cargando=true;

    /*traemos data de categoprias */
    let getSales=[];
    let getcategories=[];
    this.categoriesService.getData()
    .subscribe(resp=>{
      // console.log('resp',resp)

      let i;
      for(i in resp){
  
        getcategories.push(resp[i])

      }
      /*ordenar de mayor visitas a menor visitas al arreglo de objetos */
      getcategories.sort(function(a,b){
        return(b.view-a.view)
      })
      // console.log(getcategories)
      /**filtramos 8 categorias vista */

      getcategories.forEach((category,index)=>{
        
        if (index<6) {
          this.categories[index]=getcategories[index];
          this.cargando=false;
        }
      })

      })
  }

}
