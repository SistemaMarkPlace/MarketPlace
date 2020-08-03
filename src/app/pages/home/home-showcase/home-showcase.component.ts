import { Component, OnInit } from '@angular/core';
import { Path} from '../../../config.js';

import  { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-home-showcase',
  templateUrl: './home-showcase.component.html',
  styleUrls: ['./home-showcase.component.css']
})
export class HomeShowcaseComponent implements OnInit {
  
  path:String = Path.url;
  categories:Array<any>=[];
  cargando:Boolean=false;
  render:Boolean=true;

  constructor(private categoriesService:CategoriesService,
              private subCategoriesService:SubCategoriesService
    ) { }

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

  /*cuncion del renderisado callback*/
  
  callback(){
    if (this.render) {
        this.render=false;
        let arraySubcategories=[];
        /**separar categorias */
        this.categories.forEach(category => {
          /*tomamos la categoria filtrado */

          this.subCategoriesService.getFilterData("category",category.name).subscribe(resp=>{
            // console.log("resp",resp)
  
            let i;
            for(i in resp){
  
              arraySubcategories.push({
                "category":resp[i].category,
                "subcategory":resp[i].name,
                "url":resp[i].url,
              })
            }
            // console.log("resp",arraySubcategories)
            /**hacemos el recorrido del nuevo buscar coindidencia con los nombres de categories */
            for(i in arraySubcategories){
              if (category.name == arraySubcategories[i].category) {

                $(`[category-showcase='${category.name}']`).append(`
                  <li><a href="products/${arraySubcategories[i].url}">${arraySubcategories[i].subcategory}</a></li>
                `)
                
                
              }
            }
          })
          
        });
    }

  }



}
